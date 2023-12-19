import { generateTasks } from '$lib/shared';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	return {
		tasks: generateTasks(25)
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
