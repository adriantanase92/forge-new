import { FastifyInstance } from 'fastify';
import { User } from '../models/User';
import type { Db } from '../models';
import { QueryString, createOne, deleteOne, getAll, getOne } from '../utils';

async function userRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>('/users', async (request, reply) => {
        try {
            const response = await getAll<User>({
                request,
                collection: db.users
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(200).send({ data: response.data });
            }
        } catch (error) {
            reply.code(500).send({ error: 'Internal server error.' });
        }
    });

    app.get('/user/:id', async (request, reply) => {
        try {
            const response = await getOne<User>({
                request,
                collection: db.users
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(200).send({ data: response.data });
            }
        } catch (error) {
            reply.code(500).send({ error: 'Internal server error.' });
        }
    });

    app.post('/users', async (request, reply) => {
        try {
            const response = await createOne<User>({
                request,
                collection: db.users
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(201).send({ data: response.data });
            }
        } catch (error) {
            reply.code(500).send({ error: 'Internal server error.' });
        }
    });

    app.put('/users/:id', async (request, reply) => {
        try {
            const response = await createOne<User>({
                request,
                collection: db.users
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(201).send({ data: response.data });
            }
        } catch (error) {
            reply.code(500).send({ error: 'Internal server error.' });
        }
    });

    app.delete('/users/:id', async (request, reply) => {
        try {
            const response = await deleteOne<User>({
                request,
                collection: db.users
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(204).send({ data: response.data });
            }
        } catch (error) {
            reply.code(500).send({ error: 'Internal server error.' });
        }
    });
}

export default userRoutes;
