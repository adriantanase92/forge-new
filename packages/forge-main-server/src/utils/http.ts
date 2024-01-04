import { Collection, ObjectId, Document, WithId, Filter, OptionalUnlessRequiredId } from 'mongodb';
import { formErrorObject, type Error } from './error-handling';
import { ChangeLog, Db } from '../models';
import { z } from 'zod';
import { escapeString } from './helpers';
import { Modules } from '../enums';

export type ResponseData<T> = {
    data:
        | WithId<T>
        | WithId<T>[]
        | { messageKey: string }
        | {
              items: WithId<T>[];
              pagination: {
                  totalItems: number;
                  page: number;
              };
          };
};
export type ResponseError = { error: Error };
export type Response<T> = ResponseData<T> | ResponseError;

export type RouteParams = { id: string };

export type PopulateInfo = {
    field: string;
    collectionName: Modules;
};

export type QueryString = {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: { field: string; value: string }[];
    page?: string;
    limit?: string;
    excludeFields?: string[];
    populate?: PopulateInfo[];
};

const QueryStringSchema = z.object({
    search: z.string().trim().transform(escapeString).optional(),
    sortBy: z.string().default('changeLog.createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    filters: z
        .array(
            z.object({
                field: z.string(),
                value: z.any()
            })
        )
        .optional(),
    page: z.string().default('1'),
    limit: z.string().default('10'),
    excludeFields: z.array(z.string()).default([]),
    populate: z
        .array(
            z.object({
                field: z.string().trim(),
                collectionName: z.nativeEnum(Modules)
            })
        )
        .optional()
});

type WithChangeLog = {
    changeLog: ChangeLog;
};

export const getAll = async <T extends Document>({
    db,
    collection,
    requestQuery
}: {
    db: Db;
    collection: Collection<T>;
    requestQuery: QueryString;
}): Promise<Response<T>> => {
    try {
        const {
            search,
            sortBy = 'changeLog.createdAt',
            sortOrder = 'desc',
            page = '1',
            limit = '10',
            excludeFields = []
        } = QueryStringSchema.parse(requestQuery);

        // Convert page and limit to numbers
        const currentPage: number = parseInt(page) || 1;
        const limitItems: number = parseInt(limit) || 10;

        // Calculate the number of items to skip
        const skipItems: number = (currentPage - 1) * limitItems;

        // Initialize query for MongoDB
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const query: any = {};
        const populateInstructions: PopulateInfo[] = [];
        let shouldCount = false;

        // Iterate over the requestQuery to separate filters and populate instructions
        for (const [key, value] of Object.entries(requestQuery)) {
            if (key.startsWith('filter_')) {
                shouldCount = true;
                const field = key.replace('filter_', '');
                query[field] = value;
            } else if (key.startsWith('populate_')) {
                const field = key.replace('populate_', '');
                populateInstructions.push({ field, collectionName: value as Modules });
            }
        }

        // Handling text search
        if (search) {
            shouldCount = true;
            query.$text = { $search: search };
        }

        // Determine the sorting order
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sort: Record<string, any> = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        // Create a projection object to exclude fields
        const projection = Array.isArray(excludeFields)
            ? excludeFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {})
            : {};

        // Count total matching documents
        const totalItems = shouldCount
            ? await collection.countDocuments(query)
            : await collection.estimatedDocumentCount();

        // Fetch the users from the database with pagination
        let items: WithId<T>[] = await collection
            .find(query, { projection, collation: { locale: 'en', strength: 2 } })
            .sort(sort)
            .skip(skipItems)
            .limit(limitItems)
            .toArray();

        // Populate fields
        if (populateInstructions.length > 0) {
            for (const { field, collectionName } of populateInstructions) {
                const populateCollection = db[collectionName];

                items = await Promise.all(
                    items.map(async (item) => {
                        // If the field is a single ObjectId
                        if (item[field] && ObjectId.isValid(item[field])) {
                            const relatedDoc = await populateCollection.findOne({
                                _id: item[field] as ObjectId
                            });
                            return { ...item, [field]: relatedDoc || null }; // Replace the ID with the actual document
                        }
                        // If the field is an array of ObjectId
                        else if (item[field] && Array.isArray(item[field])) {
                            // Fetch each related document from the dynamic collection
                            const relatedDocs = await Promise.all(
                                (item[field] as ObjectId[]).map(async (id: ObjectId) =>
                                    populateCollection.findOne({ _id: id })
                                )
                            );
                            return { ...item, [field]: relatedDocs.filter((doc) => doc !== null) }; // Replace ID array with actual documents
                        }
                        return item; // Return the item unmodified if the field doesn't meet the criteria
                    })
                );
            }
        }

        return {
            data: {
                items,
                pagination: {
                    totalItems,
                    page: currentPage
                }
            }
        };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const getOne = async <T extends Document>({
    db,
    collection,
    id,
    requestQuery
}: {
    db: Db;
    collection: Collection<T>;
    id: string;
    requestQuery: QueryString;
}): Promise<Response<T>> => {
    try {
        const item = await collection.findOne({ _id: new ObjectId(id) } as Filter<T>);

        if (!item) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
        }

        const populateInstructions: PopulateInfo[] = [];

        // Iterate over the requestQuery to separate filters and populate instructions
        for (const [key, value] of Object.entries(requestQuery)) {
            if (key.startsWith('populate_')) {
                const field = key.replace('populate_', '');
                populateInstructions.push({ field, collectionName: value as Modules });
            }
        }

        // If populate parameter is provided and not empty, perform population
        if (populateInstructions.length > 0) {
            // Iterate through each populate instruction
            for (const { field, collectionName } of populateInstructions) {
                // Dynamically get the collection to populate from
                const populateCollection = db[collectionName];

                // If the field exists and is an ObjectId or an array of ObjectId
                if (item[field]) {
                    // Handle the case where the field is a single ObjectId
                    if (ObjectId.isValid(item[field])) {
                        const relatedDoc = await populateCollection.findOne({
                            _id: item[field] as ObjectId
                        });
                        item[field] = relatedDoc; // Replace single ID with the actual document
                    }
                    // Handle the case where the field is an array of ObjectId
                    else if (Array.isArray(item[field])) {
                        const relatedDocs = await Promise.all(
                            (item[field] as ObjectId[]).map(async (id: ObjectId) =>
                                populateCollection.findOne({ _id: id })
                            )
                        );
                        // Replace ID array with actual documents, filtering out any null results
                        item[field] = relatedDocs.filter((doc) => doc !== null);
                    }
                }
            }
        }

        return { data: item };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const createOne = async <T extends Document, B extends WithChangeLog>({
    collection,
    newItemData
}: {
    collection: Collection<T>;
    newItemData: B;
}): Promise<Response<T>> => {
    try {
        // Check if 'changeLog' exists and has a 'createdAt' property
        if (!newItemData.changeLog) {
            // If 'changeLog' doesn't exist, create it with the current date
            newItemData.changeLog = { createdAt: new Date() };
        } else if (!newItemData.changeLog.createdAt) {
            // If 'changeLog' exists but doesn't have 'createdAt', add it
            newItemData.changeLog.createdAt = new Date();
        }

        const result = await collection.insertOne(
            newItemData as unknown as OptionalUnlessRequiredId<T>
        );

        if (!result.acknowledged) {
            return { error: formErrorObject({ errorKey: 'insert_operation_failed' }) };
        }

        const insertedItem = await collection.findOne({ _id: result.insertedId } as Filter<T>);

        if (!insertedItem) {
            return {
                error: formErrorObject({ errorKey: 'failed_to_retrieve_the_inserted_document' })
            };
        }

        return { data: insertedItem };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const updateOne = async <T extends Document>({
    collection,
    id,
    dataToUpdate
}: {
    collection: Collection<T>;
    id: string;
    dataToUpdate: Partial<T>;
}): Promise<Response<T>> => {
    try {
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) } as Filter<T>,
            { $set: dataToUpdate },
            { returnDocument: 'after' }
        );

        if (result === null) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
        }

        return { data: result };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const deleteOne = async <T extends Document>({
    collection,
    id
}: {
    collection: Collection<T>;
    id: string;
}): Promise<Response<T>> => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>);

        if (result.deletedCount === 0) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
        }

        return { data: { messageKey: 'item_deleted_successfully' } };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};
