import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { Modules, getAll } from '$lib/shared/index.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, locals: { t } }) => {
	const projects = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.projects.entity.multiple()
		}),
		requestQuery: {
			populate: [
				{ field: 'clients', collectionName: Modules.USERS },
				{ field: 'workers', collectionName: Modules.USERS },
				{ field: 'manager', collectionName: Modules.USERS }
			]
		}
	});

	return {
		projects: projects.data ?? { items: [], pagination: { totalItems: 0, page: 1 } }
	};
}) satisfies PageServerLoad;
