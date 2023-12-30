import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { Modules, getOne } from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, locals: { t }, params: { id } }) => {
	const user = await getOne({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
		id,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.users.entity.multiple()
		})
	});

	return {
		user: user.data ?? null
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
