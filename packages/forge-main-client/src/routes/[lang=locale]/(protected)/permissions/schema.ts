import type { TranslationFunctions } from '$i18n/i18n-types';
import { z } from 'zod';

export const permissionSchema = (t: TranslationFunctions) =>
	z
		.object({
			name: z
				.string({
					required_error: t.errors.required({ field: t.fields.name.text() })
				})
				.trim()
				.toLowerCase()
				.min(2, t.errors.minCharacters({ number: 2 }))
				.max(60, t.errors.maxCharacters({ number: 60 }))
		})
		.strict();

export type PermissionSchema = typeof permissionSchema;
