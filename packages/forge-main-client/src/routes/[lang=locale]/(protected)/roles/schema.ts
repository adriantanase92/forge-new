import type { TranslationFunctions } from '$i18n/i18n-types';
import { z } from 'zod';
import { UserRole } from '$lib/shared';

export const roleSchema = (t: TranslationFunctions) =>
	z
		.object({
			name: z.nativeEnum(UserRole, {
				required_error: t.errors.requiredSelect()
			})
		})
		.strict();

export type RoleSchema = typeof roleSchema;
