import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	return {
		projects: {}
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
