import { FastifyInstance } from 'fastify';
import type { Db, Task, TaskDocument } from '../models';
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

async function taskRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>('/tasks', async (request, reply) => {
        try {
            const query = request.query;
            const response = await getAll<TaskDocument>({
                collection: db.tasks,
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

    app.get<{ Params: RouteParams }>('/task/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await getOne<TaskDocument>({ collection: db.tasks, id });

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

    app.post<{ Body: Task }>('/tasks', async (request, reply) => {
        try {
            const newTask = request.body;
            const response = await createOne<TaskDocument, Task>({
                collection: db.tasks,
                newItemData: newTask
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

    app.put<{ Params: RouteParams; Body: Partial<Task> }>('/tasks/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const updatedTask = request.body;
            const response = await updateOne<TaskDocument>({
                collection: db.tasks,
                id,
                dataToUpdate: updatedTask
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

    app.delete<{ Params: RouteParams }>('/tasks/:id', async (request, reply) => {
        try {
            const { id } = request.params;
            const response = await deleteOne<TaskDocument>({
                collection: db.tasks,
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

export default taskRoutes;
