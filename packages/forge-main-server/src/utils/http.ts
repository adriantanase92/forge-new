import { FastifyRequest } from 'fastify';
import { Collection, ObjectId } from 'mongodb';

export type ResponseData<T> = { data: T | T[] | {message: string} };
export type ResponseError = { error: string };
export type Response<T> = ResponseData<T> | ResponseError;

export type QueryString = {
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    filters?: { field: string; value: string }[];
    page?: string;
    limit?: string;
};

export type HttpParams<T> = {
    request: FastifyRequest<{ Querystring: QueryString }> | FastifyRequest;
    collection: Collection<T>;
};

export const getAll = async <T>({ request, collection }: HttpParams<T>): Promise<Response<T>> => {
    try {
        // Extract query parameters
        const {
            search,
            sortBy,
            sortOrder = 'asc',
            filters,
            page = 1,
            limit = 10
        } = request.query as any;

        // Convert page and limit to numbers
        const currentPage: number = parseInt(page);
        const limitItems: number = parseInt(limit);

        // Calculate the number of items to skip
        const skipItems: number = (currentPage - 1) * limitItems;

        // Initialize query for MongoDB
        const query: any = {};

        // Handling text search
        if (search) {
            query.$text = { $search: search };
        }

        // Handling multiple filters
        if (filters) {
            // Assume filters are passed as an array of objects
            filters.forEach((filter: { field: string; value: any }) => {
                query[filter.field] = filter.value;
            });
        }

        // Determine the sorting order
        const sort: any = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }

        // Fetch the users from the database with pagination
        const items: T[] = await collection
            .find(query)
            .sort(sort)
            .skip(skipItems)
            .limit(limitItems)
            .toArray();

        return { data: items };
    } catch (error) {
        return { error: 'An error occurred.' };
    }
};

export const getOne = async <T>({ request, collection }: HttpParams<T>): Promise<Response<T>> => {
    try {
        const { id } = request.params;
        const item = await collection.findOne({ _id: new ObjectId(id) });

        if (!item) {
            return { error: 'Item not found' };
        }

        return { data: item };
    } catch (error) {
        return { error: 'An error occurred.' };
    }
};

export const createOne = async <T>({
    request,
    collection
}: HttpParams<T>): Promise<Response<T>> => {
    try {
        const newUser = request.body as T;
        const result = await collection.insertOne(newUser);

        if (!result.acknowledged) {
            return { error: 'Insert operation failed' };
        }

        // Retrieve the inserted document using the insertedId
        const insertedUser = await collection.findOne({ _id: result.insertedId });

        // If the insertedUser is null, handle the error appropriately
        if (!insertedUser) {
            return { error: 'Failed to retrieve the inserted document' };
        }

        return { data: insertedUser };
    } catch (error) {
        return { error: 'An error occurred.' };
    }
};

// export const createMany = async <T>({request, collection}: HttpParams<T>): Promise<Response<T> => {}

export const updateOne = async <T>({
    request,
    collection
}: HttpParams<T>): Promise<Response<T>> => {
    try {
        const { id } = request.params;
        const updateData = request.body as Partial<T>;

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return { error: 'Item not found.' };
        }

        return { data: result.value };
    } catch (error) {
        return { error: 'An error occurred.' };
    }
};

export const deleteOne = async <T>({request, collection}: HttpParams<T>): Promise<Response<T> => {
    try {
		const { id } = request.params;

		const result = await collection.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 0) {
			return { error: 'Item not found.' };
		}

		return { data: { message: 'Item deleted successfully' } };
    } catch (error) {
        return { error: 'An error occurred.' };
    }
}
