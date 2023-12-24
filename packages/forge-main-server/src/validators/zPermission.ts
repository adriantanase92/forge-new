import { z } from 'zod';

export const zPermission = z.object({
    name: z.string().trim().toLowerCase().min(2).max(60)
});
