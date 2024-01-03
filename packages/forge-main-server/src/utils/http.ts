import { Collection, ObjectId, Document, WithId, Filter, OptionalUnlessRequiredId } from 'mongodb';
import { formErrorObject, type Error } from './error-handling';
import { ChangeLog } from '../models';
import { z } from 'zod';
import { escapeString } from './helpers';

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

export type QueryString = {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    filters?: { field: string; value: string }[];
    page?: string;
    limit?: string;
    excludeFields?: string[];
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
    excludeFields: z.array(z.string()).default([])
});

type WithChangeLog = {
    changeLog: ChangeLog;
};

export const getAll = async <T extends Document>({
    collection,
    requestQuery
}: {
    collection: Collection<T>;
    requestQuery: QueryString;
}): Promise<Response<T>> => {
    try {
        const {
            search,
            sortBy = 'changeLog.createdAt',
            sortOrder = 'desc',
            filters,
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

        // Handling text search
        if (search) {
            query.$text = { $search: search };
        }

        // Handling multiple filters
        const hasFilters = filters && Array.isArray(filters) && filters.length > 0;
        if (filters && Array.isArray(filters)) {
            // Assume filters are passed as an array of objects
            filters.forEach((filter) => {
                if (filter && filter.field && filter.value) {
                    query[filter.field] = filter.value;
                }
            });
        }

        // Determine the sorting order
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sort: Record<string, any> = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        // Create a projection object to exclude fields
        const projection = excludeFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {});

        // Count total matching documents
        const shouldCount = search || hasFilters;
        const totalItems = shouldCount
            ? await collection.countDocuments(query)
            : await collection.estimatedDocumentCount();

        // Fetch the users from the database with pagination
        const items: WithId<T>[] = await collection
            .find(query, { projection, collation: { locale: 'en', strength: 2 } })
            .sort(sort)
            .skip(skipItems)
            .limit(limitItems)
            .toArray();

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
    collection,
    id
}: {
    collection: Collection<T>;
    id: string;
}): Promise<Response<T>> => {
    try {
        const item = await collection.findOne({ _id: new ObjectId(id) } as Filter<T>);

        if (!item) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
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
