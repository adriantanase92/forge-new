import { superValidate } from 'sveltekit-superforms/client';
import type { Actions, PageServerLoad } from './$types.js';
import { loginSchema } from './schema.js';

export const load: PageServerLoad = (async ({ locals: { t } }) => {
	const form = await superValidate(loginSchema(t));

	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	// default: async (event) => {
	//     const {
	//         request,
	//         locals: { t }
	//     } = event;
	//     const formData = await request.formData();
	//     const form = await superValidate(formData, loginSchema(t));
	//     if (!form.valid) {
	//         return message(form, t.errors.invalid_form());
	//     } else {
	//         const response = await handleAuthorization({
	//             userData: { email: form.data.email, password: form.data.password },
	//             event
	//         });
	//         if (response.redirectUrl !== undefined) {
	//             throw redirect(302, response.redirectUrl);
	//         } else {
	//             return message(form, response.error);
	//         }
	//     }
	// }
} satisfies Actions;
