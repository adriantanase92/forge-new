import { z } from 'zod';
import { Language, UserRole } from '../enums';
import { ObjectId } from 'mongodb';
import { emailRegex } from '../utils';
import { zAddress } from './zAddress';

export const zUserPermissions = z.object({
    // Vezi cum faci aici sa le iei dynamic
    roles: z.object({
        read: z.boolean(),
        write: z.boolean()
    })
});

export const zUser = z.object({
    firstName: z.string().trim().min(2).max(100),
    lastName: z.string().trim().min(2).max(100),
    email: z.string().trim().toLowerCase().regex(emailRegex),
    phone: z.string().min(1).max(50).optional(),
    role: z.nativeEnum(UserRole),
    preferredLanguage: z.nativeEnum(Language),
    projects: z.instanceof(ObjectId).array().optional(),
    // permissions: z.instanceof(ObjectId).array().optional(),
    address: zAddress.optional(),
    createdAt: z.date()
});
