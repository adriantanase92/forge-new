import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { TaskStatus } from '../enums/Task';

export const zTask = z.object({
    title: z.string().trim().min(6).max(100),
    description: z.string().trim().min(6).max(500).optional(),
    project: z.instanceof(ObjectId),
    responsible: z.instanceof(ObjectId).array().optional(),
    status: z.nativeEnum(TaskStatus)
});
