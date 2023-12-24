import { z } from 'zod';

export const zAddress = z.object({
    country: z.string().trim().min(2).max(100).optional(),
    county: z.string().trim().min(2).max(100).optional(),
    city: z.string().trim().min(2).max(100).optional(),
    street: z.string().trim().min(2).max(100).optional(),
    locationNumber: z.string().trim().min(2).max(100).optional(),
    zipCode: z.string().trim().min(2).max(100).optional()
});
