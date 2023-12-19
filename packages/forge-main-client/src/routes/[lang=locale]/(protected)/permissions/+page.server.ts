import { generatePermissions } from '$lib/shared';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
	return {
		permissions: generatePermissions()
	};
}) satisfies PageServerLoad;

export const actions = {} satisfies Actions;
