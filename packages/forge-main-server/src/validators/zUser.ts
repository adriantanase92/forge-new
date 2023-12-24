import { z } from 'zod';

export const zUser = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().min(1).max(100).email(),
    emailVerified: z.boolean(),
    phoneNo: z.string().min(1).max(50).optional(),
    consentTC: z.boolean(),
    consentIntake: z.boolean(),
    passwordRecoveryCode: z.string().min(1).max(50).optional(),
    passwordRecoveryCodeExpireAt: z.date().optional(),
    createdAt: z.date(),
    deleted: z.string().min(1).optional()
});
