// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales;
			t: TranslationFunctions;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
