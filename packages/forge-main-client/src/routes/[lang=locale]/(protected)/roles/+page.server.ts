import type { PageServerLoad } from './$types.js';
import { Modules, getAll } from '$lib/shared/index.js';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';

export const load: PageServerLoad = (async ({ fetch, locals: { t } }) => {
	const roles = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.ROLES}`,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.roles.entity.multiple()
		})
	});

	return {
		roles: roles.data ?? { items: [], pagination: { totalItems: 0, page: 1 } }
	};
}) satisfies PageServerLoad;
