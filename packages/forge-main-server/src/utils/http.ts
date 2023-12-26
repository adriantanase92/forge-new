import { FastifyRequest, RouteGenericInterface } from 'fastify';
import { Collection, ObjectId, Document, WithId, Filter, OptionalUnlessRequiredId } from 'mongodb';
import { formErrorObject, type Error } from './error-handling';

export type ResponseData<T> = { data: WithId<T> | WithId<T>[] | { messageKey: string } };
export type ResponseError = { error: Error };
export type Response<T> = ResponseData<T> | ResponseError;

export type RouteParams = { id: string };

export type QueryString = {
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    filters?: { field: string; value: string }[];
    page?: string;
    limit?: string;
};

export type HttpParams<
    T extends Document,
    R = RouteGenericInterface,
    Q = undefined,
    B = unknown
> = {
    request: FastifyRequest<{ Params: R; Querystring: Q; Body: B }>;
    collection: Collection<T>;
};

export const getAll = async <T extends Document>({
    request,
    collection
}: HttpParams<T, undefined, QueryString>): Promise<Response<T>> => {
    try {
        // Extract query parameters
        const {
            search,
            sortBy,
            sortOrder = 'asc',
            filters,
            page = '1',
            limit = '10'
        } = request.query;

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
        const sort: any = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }

        // Fetch the users from the database with pagination
        const items: WithId<T>[] = await collection
            .find(query)
            .sort(sort)
            .skip(skipItems)
            .limit(limitItems)
            .toArray();

        return { data: items };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const getOne = async <T extends Document>({
    request,
    collection
}: HttpParams<T, RouteParams>): Promise<Response<T>> => {
    try {
        const { id } = request.params;
        const item = await collection.findOne({ _id: new ObjectId(id) } as Filter<T>);

        if (!item) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
        }

        return { data: item };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const createOne = async <T extends Document, B>({
    request,
    collection
}: HttpParams<T, undefined, undefined, B>): Promise<Response<T>> => {
    try {
        const newItem = request.body as B;
        const result = await collection.insertOne(newItem as OptionalUnlessRequiredId<T>);

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

// export const createMany = async <T>({request, collection}: HttpParams<T>): Promise<Response<T> => {}

export const updateOne = async <T extends Document>({
    request,
    collection
}: HttpParams<T, RouteParams>): Promise<Response<T>> => {
    try {
        const { id } = request.params;
        const updateData = request.body as Partial<T>;

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) } as Filter<T>,
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (result && !('value' in result)) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
        }

        return { data: result?.value };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};

export const deleteOne = async <T extends Document>({
    request,
    collection
}: HttpParams<T, RouteParams>): Promise<Response<T>> => {
    try {
        const { id } = request.params;

        const result = await collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>);

        if (result.deletedCount === 0) {
            return { error: formErrorObject({ errorKey: 'item_not_found' }) };
        }

        return { data: { messageKey: 'item_deleted_successfully' } };
    } catch (e) {
        return { error: formErrorObject({ errorKey: 'server_http_error_occured', error: e }) };
    }
};
