import { generateRoles } from '$lib/shared';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	return {
		roles: generateRoles()
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
