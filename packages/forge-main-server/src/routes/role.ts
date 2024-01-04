import { FastifyInstance } from 'fastify';
import type { Db, Role, RoleDocument } from '../models';
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

async function roleRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>('/roles', async (request, reply) => {
        try {
            const query = request.query;
            const response = await getAll<RoleDocument>({
                db,
                collection: db.roles,
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

    app.get<{ Params: RouteParams; Querystring: QueryString }>(
        '/roles/:id',
        async (request, reply) => {
            try {
                const query = request.query;
                const { id } = request.params;
                const response = await getOne<RoleDocument>({
                    db,
                    collection: db.roles,
                    id,
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
        }
    );

    app.post<{ Body: Role }>('/roles', async (request, reply) => {
        try {
            const newRole = request.body;
            const response = await createOne<RoleDocument, Role>({
                collection: db.roles,
                newItemData: newRole
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

    app.patch<{ Params: RouteParams; Body: Partial<Role> }>(
        '/roles/:id',
        async (request, reply) => {
            try {
                const { id } = request.params;
                const updatedRole = request.body;
                const response = await updateOne<RoleDocument>({
                    collection: db.roles,
                    id,
                    dataToUpdate: updatedRole
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

    app.delete<{ Params: RouteParams }>('/roles/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await deleteOne<RoleDocument>({
                collection: db.roles,
                id
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
}

export default roleRoutes;
