import type { MongoClient } from 'mongodb';
import type { Db } from '../models';

export const createCollections = async (dbClient: MongoClient, db: Db) => {
    // list all collections from database
    const collections = await dbClient.db().listCollections({}, { nameOnly: true }).toArray();

    // 'roles'
    if (!collections.some((e) => e.name === 'roles')) await dbClient.db().createCollection('roles');
    await db.roles.createIndex(
        { email: 1, deleted: 1 },
        { unique: true, collation: { locale: 'en', strength: 2 } }
    );
    await db.roles.createIndex({ name: 'text', email: 'text' });

    // 'permissions'
    if (!collections.some((e) => e.name === 'permissions'))
        await dbClient.db().createCollection('permissions');
    await db.permissions.createIndex(
        { email: 1, deleted: 1 },
        { unique: true, collation: { locale: 'en', strength: 2 } }
    );
    await db.permissions.createIndex({ name: 'text', email: 'text' });

    // 'users'
    if (!collections.some((e) => e.name === 'users')) await dbClient.db().createCollection('users');
    await db.users.createIndex(
        { email: 1, deleted: 1 },
        { unique: true, collation: { locale: 'en', strength: 2 } }
    );
    await db.users.createIndex({ passwordRecoveryCode: 1 });
    await db.users.createIndex({ name: 'text', email: 'text' });

    // 'projects'
    if (!collections.some((e) => e.name === 'projects'))
        await dbClient.db().createCollection('projects');
    await db.projects.createIndex(
        { email: 1, deleted: 1 },
        { unique: true, collation: { locale: 'en', strength: 2 } }
    );
    await db.projects.createIndex({ name: 'text', email: 'text' });

    // 'tasks'
    if (!collections.some((e) => e.name === 'tasks')) await dbClient.db().createCollection('tasks');
    await db.tasks.createIndex(
        { email: 1, deleted: 1 },
        { unique: true, collation: { locale: 'en', strength: 2 } }
    );
    await db.tasks.createIndex({ name: 'text', email: 'text' });
};
