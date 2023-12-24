/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyInstance } from 'fastify';
import { User } from '../models/User';
import type { Db } from '../models';
import { ObjectId } from 'mongodb';

async function userRoutes(app: FastifyInstance, db: Db) {
    app.get('/users', async (request, reply) => {
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            const users: User[] = await db.users
                .find(query)
                .sort(sort)
                .skip(skipItems)
                .limit(limitItems)
                .toArray();

            // Send the users as a response
            reply.code(200).send(users);
        } catch (error) {
            reply.code(500).send({ error: 'An error occurred.' });
        }
    });

    app.get('/user/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const user = await db.users.findOne({ _id: new ObjectId(id) });

            if (!user) {
                return reply.code(404).send({ message: 'User not found' });
            }

            return reply.code(200).send(user);
        } catch (error) {
            // Handle errors, e.g., invalid ObjectId format
            reply.code(500).send({ error: 'An error occurred' });
        }
    });

    app.post('/users', async (request, reply) => {
        try {
            const newUser = request.body as User; // Assume User is your TypeScript interface for user data

            // Validate newUser data here (important for security and data integrity)

            const result = await db.users.insertOne(newUser);

            reply.code(201).send(result.ops[0]);
        } catch (error) {
            reply.code(500).send({ error: 'An error occurred.' });
        }
    });

    app.put('/users/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const updateData = request.body as Partial<User>; // Partial allows for updating only a subset of the User fields

            // Validate updateData here

            const result = await db.users.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateData },
                { returnDocument: 'after' }
            );

            if (!result.value) {
                return reply.code(404).send({ error: 'User not found.' });
            }

            reply.code(200).send(result.value);
        } catch (error) {
            reply.code(500).send({ error: 'An error occurred.' });
        }
    });

    app.delete('/users/:id', async (request, reply) => {
        try {
            const { id } = request.params;

            const result = await db.users.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                return reply.code(404).send({ error: 'User not found.' });
            }

            reply.code(204).send();
        } catch (error) {
            reply.code(500).send({ error: 'An error occurred.' });
        }
    });
}

export default userRoutes;
