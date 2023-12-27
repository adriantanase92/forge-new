import { ObjectId } from 'mongodb';
import { z } from 'zod';

export const zProject = z.object({
    name: z.string().trim().min(6).max(100),
    description: z.string().trim().min(6).max(500).optional(),
    clients: z.instanceof(ObjectId).array().optional(),
    workers: z.instanceof(ObjectId).array().optional(),
    manager: z.instanceof(ObjectId),
    tasks: z.instanceof(ObjectId).array().optional()
});
