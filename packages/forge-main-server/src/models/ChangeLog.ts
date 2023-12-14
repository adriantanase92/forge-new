import type { ObjectId } from 'mongodb';

export type ChangeLog = {
    createdAt: Date;
    createdByName: string;
    createdById: ObjectId;
    updatedAt?: Date;
    updatedByName?: string;
    updatedById?: ObjectId;
    deletedAt?: Date;
    deletedByName?: string;
    deletedById?: ObjectId;
    statusAt?: Date;
    statusByName?: string;
    statusById?: ObjectId;
};
