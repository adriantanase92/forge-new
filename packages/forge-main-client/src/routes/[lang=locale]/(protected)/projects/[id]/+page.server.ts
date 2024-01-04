import { PUBLIC_MAIN_SERVER_URL } from '$env/static/public';
import { Modules, getOne } from '$lib/shared/index.js';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async ({ fetch, locals: { t }, params: { id } }) => {
	const project = await getOne({
		fetch,
		apiUrl: `${PUBLIC_MAIN_SERVER_URL}/api/${Modules.PROJECTS}`,
		id,
		errorKey: t.errors.errorFetchingSomethingFromServer({
			something: t.modules.projects.entity.multiple()
		}),
		populate: [
			{ field: 'clients', collectionName: Modules.USERS },
			{ field: 'workers', collectionName: Modules.USERS },
			{ field: 'manager', collectionName: Modules.USERS },
			{ field: 'tasks', collectionName: Modules.TASKS }
		]
	});

	return {
		project: project.data ?? null
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
