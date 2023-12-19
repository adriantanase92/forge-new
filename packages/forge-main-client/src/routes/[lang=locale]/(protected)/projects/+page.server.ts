import { generateProjects } from '$lib/shared';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	return {
		projects: generateProjects(25)
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
