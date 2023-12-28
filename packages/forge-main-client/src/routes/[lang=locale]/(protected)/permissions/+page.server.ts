import { message, superValidate } from 'sveltekit-superforms/client';
import type { Actions, PageServerLoad } from './$types.js';
import { permissionSchema } from './schema.js';
import type { ZodValidation } from 'sveltekit-superforms';
import type { AnyZodObject } from 'zod';
import type { Message } from '$lib/shared/components/general/form/types.js';
import { Modules, getAll } from '$lib/shared/index.js';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';

export const load: PageServerLoad = (async ({ fetch, locals: { t } }) => {
	const form = await superValidate(permissionSchema(t));

	const permissions = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PERMISSIONS}`,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.permissions.entity.multiple()
		})
	});

	return {
		form,
		permissions: permissions.data ?? { items: [], totalItems: 0 }
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals: { t } }) => {
		const formData = await request.formData();
		const form = await superValidate<ZodValidation<AnyZodObject>, Message>(
			formData,
			permissionSchema(t)
		);

		if (!form.valid) {
			return message(form, t.errors.invalid_form());
		} else {
			console.log('----------totul e bine');
			console.log('----------formData: ', formData);
		}
	}
} satisfies Actions;
