import type { TranslationFunctions } from '$i18n/i18n-types';
import { z } from 'zod';

export const roleSchema = (t: TranslationFunctions) =>
	z
		.object({
			name: z
				.string()
				.trim()
				.toLowerCase()
				.min(2, t.errors.minCharacters({ number: 2 }))
				.max(60, t.errors.maxCharacters({ number: 60 }))
		})
		.strict();

export type RoleSchema = typeof roleSchema;
