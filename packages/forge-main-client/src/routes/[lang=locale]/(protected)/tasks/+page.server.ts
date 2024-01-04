import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { Modules, getAll } from '$lib/shared/index.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, locals: { t } }) => {
	const tasks = await getAll({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.TASKS}`,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.tasks.entity.multiple()
		})
	});

	return {
		tasks: tasks.data ?? { items: [], pagination: { totalItems: 0, page: 1 } }
	};
}) satisfies PageServerLoad;
