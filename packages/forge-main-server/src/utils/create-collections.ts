import type { MongoClient } from 'mongodb';
import type { Db } from '../models';

export const createCollections = async (dbClient: MongoClient, db: Db) => {
    // list all collections from database
    const collections = await dbClient.db().listCollections({}, { nameOnly: true }).toArray();

    // 'projects'
    if (!collections.some((e) => e.name === 'projects')) await dbClient.db().createCollection('projects');
    await db.projects.createIndex({ email: 1, deleted: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
    await db.projects.createIndex({ passwordRecoveryCode: 1 });

    // 'tasks'
    if (!collections.some((e) => e.name === 'tasks')) await dbClient.db().createCollection('tasks');
    await db.projects.createIndex({ email: 1, deleted: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });
    await db.projects.createIndex({ passwordRecoveryCode: 1 });
};
