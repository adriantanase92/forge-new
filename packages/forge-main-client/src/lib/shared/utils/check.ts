import type { HttpError, Redirect } from '@sveltejs/kit';

export function isRedirect(e: any): e is Redirect {
	if (e == null) {
		return false;
	} else {
		return typeof e.status === 'number' && typeof e.location === 'string';
	}
}

export function isHttpError(e: any): e is HttpError {
	if (e == null) {
		return false;
	} else {
		return typeof e.status === 'number' && typeof e?.body.message === 'string';
	}
}

export function isAsset(routeId: string | null, url: URL) {
	return (
		routeId === null &&
		(url.pathname.startsWith('/@fs') || url.pathname.endsWith('/favicon.ico'))
	);
}

export function isApiRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/api/');
}

export function isOAuthRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/(oauth)/');
}

export function isHealthRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/(health)/');
}

export function isLocalizedRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/');
}

export function isPublicRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(public)/');
}

export function isProtectedRoute(routeId: string | null) {
	return routeId !== null && routeId.startsWith('/[lang=locale]/(protected)/');
}
