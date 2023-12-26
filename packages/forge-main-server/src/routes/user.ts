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
    app.get<{ Querystring: QueryString; Params: undefined; Body: undefined }>(
        '/users',
        async (request, reply) => {
            try {
                const response = await getAll<UserDocument>({
                    request,
                    collection: db.users
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
        }
    );

    app.get<{ Querystring: undefined; Params: RouteParams; Body: undefined }>(
        '/user/:id',
        async (request, reply) => {
            try {
                const response = await getOne<UserDocument>({
                    request,
                    collection: db.users
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
        }
    );

    app.post<{ Querystring: undefined; Params: undefined; Body: User }>(
        '/users',
        async (request, reply) => {
            try {
                const response = await createOne<UserDocument, User>({
                    request,
                    collection: db.users
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
        }
    );

    app.put<{ Querystring: undefined; Params: RouteParams; Body: User }>(
        '/users/:id',
        async (request, reply) => {
            try {
                const response = await updateOne<UserDocument>({
                    request,
                    collection: db.users
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
        }
    );

    app.delete<{ Querystring: undefined; Params: RouteParams; Body: undefined }>(
        '/users/:id',
        async (request, reply) => {
            try {
                const response = await deleteOne<UserDocument>({
                    request,
                    collection: db.users
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
        }
    );
}

export default userRoutes;
