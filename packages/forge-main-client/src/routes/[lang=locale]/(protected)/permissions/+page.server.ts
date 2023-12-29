import type { PageServerLoad } from './$types.js';
import { Modules, getAll } from '$lib/shared/index.js';
import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';

export const load: PageServerLoad = (async ({ fetch, locals: { t } }) => {
	const permissions = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PERMISSIONS}`,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.permissions.entity.multiple()
		})
	});

	return {
		permissions: permissions.data ?? { items: [], totalItems: 0 }
	};
}) satisfies PageServerLoad;
