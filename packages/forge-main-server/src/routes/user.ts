import { FastifyInstance } from 'fastify';
import type { Db, User, UserDocument } from '../models';
import {
    QueryString,
    RouteParams,
    createOne,
    deleteOne,
    formErrorObject,
    getAll,
    getOne,
    updateOne
} from '../utils';

async function userRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>('/users', async (request, reply) => {
        try {
            const query = request.query;
            const response = await getAll<UserDocument>({
                collection: db.users,
                requestQuery: query
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(200).send({ data: response.data });
            }
        } catch (e) {
            reply.code(500).send({
                error: formErrorObject({ errorKey: 'internal_server_error', error: e })
            });
        }
    });

    app.get<{ Params: RouteParams }>('/user/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await getOne<UserDocument>({ collection: db.users, id });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(200).send({ data: response.data });
            }
        } catch (e) {
            reply.code(500).send({
                error: formErrorObject({ errorKey: 'internal_server_error', error: e })
            });
        }
    });

    app.post<{ Body: User }>('/users', async (request, reply) => {
        try {
            const newUser = request.body;
            const response = await createOne<UserDocument, User>({
                collection: db.users,
                newItemData: newUser
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(201).send({ data: response.data });
            }
        } catch (e) {
            reply.code(500).send({
                error: formErrorObject({ errorKey: 'internal_server_error', error: e })
            });
        }
    });

    app.put<{ Params: RouteParams; Body: Partial<User> }>('/users/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const updatedUser = request.body;
            const response = await updateOne<UserDocument>({
                collection: db.users,
                id,
                dataToUpdate: updatedUser
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(201).send({ data: response.data });
            }
        } catch (e) {
            reply.code(500).send({
                error: formErrorObject({ errorKey: 'internal_server_error', error: e })
            });
        }
    });

    app.delete<{ Params: RouteParams }>('/users/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await deleteOne<UserDocument>({
                collection: db.users,
                id
            });

            if ('error' in response) {
                reply.code(500).send({ error: response.error });
            } else {
                reply.code(204).send({ data: response.data });
            }
        } catch (e) {
            reply.code(500).send({
                error: formErrorObject({ errorKey: 'internal_server_error', error: e })
            });
        }
    });
}

export default userRoutes;
