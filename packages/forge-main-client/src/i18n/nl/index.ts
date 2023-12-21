import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('nl'),
	menus: {
		sidebar: {
			dashboard: 'Dashboard',
			users: 'Gebruikers',
			permissions: 'Rechten',
			roles: 'Rollen',
			projects: 'Projecten',
			tasks: 'Taken',
			noItemsFoundMessage: 'Geen zijbalkmenu-items gevonden!'
		}
	},
	pages: {
		dashboard: {
			title: 'Mijn Dashboard'
		}
	},
	warnings: {},
	errors: {
		required: 'Je bent vergeten om { field } in te vullen.',
		requiredSelect: 'Je bent vergeten een optie te selecteren.',
		requiredDate: 'Selecteer een datum.',
		invalidDate: 'Voer een correcte datum in.',
		invalidForm: 'Ongeldig formulier.',
		invalidEmail: 'Oeps, fout format (juist: naam@forge.be).',
		invalidPassword:
			'Je paswoord moet minimaal 8 tekens bevatten, één hoofdletter, één cijfer en één van deze symbolen (!@#$%^&*).',
		invalidCombination: 'Oeps, deze combinatie herkennen we niet.',
		minCharacters: 'Minimaal { number } tekens vereist.',
		maxCharacters: 'Maximum van { number } tekens overschreden.',
		minValue: 'Waarde mag niet lager zijn dan { number }.',
		maxValue: 'Waarde mag niet hoger zijn dan { number }.',
		noSomethingFound: '{ something } niet gevonden.',
		internalServerError: 'Oeps, er is een interne serverfout.',
		emailNotFound: 'Oeps, we kunnen dit e-mailadres niet vinden.',
		emailAddressAlreadyInUse: 'Dit e-mailadres bestaat al.',
		noDataFound: 'Geen data gevonden!',
		noInformation: 'Geen informatie.'
	},
	fields: {
		fullName: {
			text: 'volledige naam'
		},
		firstName: {
			text: 'voornaam'
		},
		lastName: {
			text: 'familienaam'
		},
		password: {
			text: 'paswoord',
			hidePassword: 'Verberg paswoord',
			showPassword: 'Laat paswoord zien',
			forgotYourPassword: 'Je paswoord vergeten?'
		},
		email: {
			text: 'e-mailadres'
		},
		search: {
			text: 'zoekopdracht'
		},
		phone: {
			text: 'telefoon'
		}
	},
	buttonsOrLinks: {
		addSomething: '{ something } toevoegen',
		editSomething: '{ something } bewerken'
	},
	components: {
		footer: {
			copyright: 'Alle rechten voorbehouden.',
			slogan: 'forge - Uw onmisbare assistent'
		},
		modal: {
			edit: 'Bewerk { something }',
			add: 'Voeg { something } toe'
		},
		table: {
			actions: 'acties'
		}
	},
	modules: {
		roles: {
			entity: {
				single: 'rol',
				multiple: 'rollen'
			}
		},
		permissions: {
			entity: {
				single: 'toestemming',
				multiple: 'rechten'
			}
		},
		users: {
			entity: {
				single: 'gebruiker',
				multiple: 'gebruikers'
			}
		},
		projects: {
			entity: {
				single: 'project',
				multiple: 'projecten'
			}
		},
		tasks: {
			entity: {
				single: 'taak',
				multiple: 'taken'
			}
		}
	}
} satisfies BaseTranslation;
