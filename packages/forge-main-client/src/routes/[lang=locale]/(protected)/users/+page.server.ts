import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { Modules, getAll } from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, locals: { t } }) => {
	const users = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.USERS}`,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.users.entity.multiple()
		})
	});

	return {
		users: users.data ?? { items: [], pagination: { totalItems: 0, page: 1 } }
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
