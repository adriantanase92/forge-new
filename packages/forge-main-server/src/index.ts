import path from 'node:path';
import { MongoClient } from 'mongodb';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { Db } from './models';
import { createCollections } from './utils';
import dotenv from 'dotenv';
import userRoutes from './routes/user';

// --------- dotenv ------------
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// --------- fastify ------------
const fastify = Fastify({ bodyLimit: 1 * 1024 * 1024, logger: true });

// ----------- mongodb -------------
const dbClient = new MongoClient(process.env.DATABASE_URL! || 'mongodb://mongo:27017/forge');
const db: Db = {
    roles: dbClient.db().collection('roles'),
    permissions: dbClient.db().collection('permissions'),
    users: dbClient.db().collection('users'),
    projects: dbClient.db().collection('projects'),
    tasks: dbClient.db().collection('tasks')
};

// ----------- boot ---------------
const boot = async () => {
    await dbClient.connect();
    await createCollections(dbClient, db);

    await fastify.register(cors);
    await fastify.register(rateLimit, { max: 100, timeWindow: '1 minute' });
    fastify.register(helmet);

    fastify.register(userRoutes);

    fastify.listen({
        port: parseInt(process.env.PORT_MAIN_SERVER!, 10),
        host: process.env.NODE_ENV === 'dev' ? '0.0.0.0' : '0.0.0.0'
    });

    console.log(
        `[FORGE-MAIN-SERVER] --> HTTP server listening on port: ${
            process.env.PORT_MAIN_SERVER
        } [env: ${process.env.NODE_ENV!.toUpperCase()}]`
    );
};

boot().catch((error) => {
    console.log(`[FORGE-MAIN-SERVER] --> !!! boot failed !!! [${error}]`);
    process.exit(1);
});
