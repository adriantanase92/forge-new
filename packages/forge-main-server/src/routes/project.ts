import { FastifyInstance } from 'fastify';
import type { Db, Project, ProjectDocument } from '../models';
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

async function projectRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>('/projects', async (request, reply) => {
        try {
            const query = request.query;
            const response = await getAll<ProjectDocument>({
                collection: db.projects,
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

    app.get<{ Params: RouteParams }>('/project/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await getOne<ProjectDocument>({ collection: db.projects, id });

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

    app.post<{ Body: Project }>('/projects', async (request, reply) => {
        try {
            const newProject = request.body;
            const response = await createOne<ProjectDocument, Project>({
                collection: db.projects,
                newItemData: newProject
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

    app.put<{ Params: RouteParams; Body: Partial<Project> }>(
        '/projects/:id',
        async (request, reply) => {
            try {
                const { id } = request.params;
                const updatedProject = request.body;
                const response = await updateOne<ProjectDocument>({
                    collection: db.projects,
                    id,
                    dataToUpdate: updatedProject
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

    app.delete<{ Params: RouteParams }>('/projects/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await deleteOne<ProjectDocument>({
                collection: db.projects,
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

export default projectRoutes;
