import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	return {
		tasks: {}
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
