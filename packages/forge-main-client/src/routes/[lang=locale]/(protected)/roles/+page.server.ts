import { message, superValidate } from 'sveltekit-superforms/client';
import type { Actions, PageServerLoad } from './$types.js';
import { roleSchema } from './schema.js';
import type { ZodValidation } from 'sveltekit-superforms';
import type { AnyZodObject } from 'zod';
import type { Message } from '$lib/shared/components/general/form/types.js';
import { api } from '$lib/shared/utils/http.js';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';

export const load: PageServerLoad = (async ({ locals: { t } }) => {
	const form = await superValidate(roleSchema(t));

	try {
		const roles = await api({
			fetch,
			url: `${PUBLIC_MAIN_SERVER_URL}/api/roles`
		});

		if ('error' in roles) {
			console.error({ error: roles.error });
		}

		return {
			form,
			roles: roles.data ?? { items: [], totalItems: 0 }
		};
	} catch (e) {
		return {
			form,
			roles: { items: [], totalItems: 0 }
		};
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { t } }) => {
		const formData = await request.formData();
		const form = await superValidate<ZodValidation<AnyZodObject>, Message>(
			formData,
			roleSchema(t)
		);

		if (!form.valid) {
			return message(form, t.errors.invalid_form());
		} else {
			console.log('----------totul e bine');
		}
	}
} satisfies Actions;
