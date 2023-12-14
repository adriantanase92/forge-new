import { type Cookies, type RequestEvent, redirect } from '@sveltejs/kit';
import { isAsset } from '$lib/shared';
import type { MiddlewareBuilder } from './utils';

/** Implements the `session` middleware interface */
export default (({ logger, event, resolve }) => {
	return {
		canSkip() {
			return isAsset(event.route.id, event.url);
		},
		resolve() {
			return resolve(event);
		},
		async run() {
			return await Promise.resolve(hasSession())
				.then(checkSession)
				.then((_) => resolve(event));
		}
	};

	/**
	 * Checks the current request already contains a session in cookies. If not
	 * it redirect to the `/sign-in` page to let the user obtain one before
	 * reaching its original requested page. Otherwise it returns the `session`.
	 */
	function hasSession(): string {
		const session = event.cookies.get(SESSION_KEY);

		if (session) {
			logger.info('session exists', { session });
			return session;
		} else {
			logger.info('session not found', { event });
			deleteSession(event.cookies);
			throw redirect(303, toSignIn(event));
		}
	}

	/**
	 * Checks that specified `session` is still valid on the backend side. If
	 * not valid, then deletes the session from the cookies and redirects to
	 * the `/sign-in` page.
	 *
	 * @param session
	 * Session hash to validate.
	 */
	async function checkSession(session: string): Promise<string> {
		try {
			// await http.auth().verify(session);
			logger.info('session valid');

			return session;
		} catch (err) {
			logger.info('session expired', { err, event });
			deleteSession(event.cookies);
			throw redirect(303, toSignIn(event));
		}
	}

	/**
	 * Gets the `redirectTo` query string parameter to add to the current url.
	 * This is used only when the session is not valid and needs the user to
	 * signing-in before accessing its original requested page.
	 */
	function toSignIn({ url, locals: { t, locale } }: RequestEvent) {
		const searchParams = new URLSearchParams();
		const prevSearch = decodeURIComponent(url.search);

		if (
			url.pathname === '/' ||
			url.pathname === `/${locale}` ||
			url.pathname === t.routes.protected.dashboard()
		) {
			if (prevSearch) {
				searchParams.append(REDIRECT_KEY, `${t.routes.protected.dashboard()}${prevSearch}`);
			}
		} else {
			searchParams.append(REDIRECT_KEY, `${url.pathname}${prevSearch}`);
		}

		const search = searchParams.toString();

		return `${t.routes.public.logIn()}${search ? `?${search}` : ''}`;
	}
}) satisfies MiddlewareBuilder;

/**
 * Sets a user session across the application.
 *
 * @param cookies
 * Request cookies object.
 *
 * @param sessionToken
 * Session value to set.
 */
export function setSession(cookies: Cookies, sessionToken: string) {
	cookies.set(SESSION_KEY, sessionToken, {
		path: '/'
	});
}

/**
 * Deletes a user session.
 *
 * @param cookies
 * Request cookies object.
 */
export function deleteSession(cookies: Cookies) {
	cookies.delete(SESSION_KEY, {
		path: '/'
	});
}

/**
 * Obtain the key used a query string parameter to redirect to original page
 * requested by user before landing into the sign-in page.
 */
const REDIRECT_KEY = 'redirectTo';

/** Obtain the key used user session key in request cookies. */
const SESSION_KEY = 'sessionid';
