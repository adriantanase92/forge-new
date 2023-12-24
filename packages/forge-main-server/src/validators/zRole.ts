import { z } from 'zod';

export const zRole = z.object({
    name: z.string().trim().toLowerCase().min(2).max(60)
});
