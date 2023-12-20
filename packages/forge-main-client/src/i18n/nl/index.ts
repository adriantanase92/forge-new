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
		},
		roles: {
			entity: 'rollen'
		},
		permissions: {
			entity: 'rechten'
		},
		users: {
			entity: 'gebruikers'
		},
		projects: {
			entity: 'projecten'
		},
		tasks: {
			entity: 'taken'
		}
	},
	warnings: {},
	errors: {
		required: 'Je bent vergeten om { field } in te vullen.',
		required_select: 'Je bent vergeten een optie te selecteren.',
		required_date: 'Selecteer een datum.',
		invalid_date: 'Voer een correcte datum in.',
		invalid_form: 'Ongeldig formulier.',
		invalid_email: 'Oeps, fout format (juist: naam@forge.be).',
		invalid_password:
			'Je paswoord moet minimaal 8 tekens bevatten, één hoofdletter, één cijfer en één van deze symbolen (!@#$%^&*).',
		invalid_combination: 'Oeps, deze combinatie herkennen we niet.',
		min_characters: 'Minimaal { number } tekens vereist.',
		max_characters: 'Maximum van { number } tekens overschreden.',
		min_value: 'Waarde mag niet lager zijn dan { number }.',
		max_value: 'Waarde mag niet hoger zijn dan { number }.',
		no_something_found: '{ something } niet gevonden.',
		internal_server_error: 'Oeps, er is een interne serverfout.',
		email_not_found: 'Oeps, we kunnen dit e-mailadres niet vinden.',
		email_address_already_in_use: 'Dit e-mailadres bestaat al.',
		no_data_found: 'Geen data gevonden!',
		no_entity_found: 'Geen { entity } gevonden!',
		no_information: 'Geen informatie.'
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
		add_something: '{ something } toevoegen'
	},
	components: {
		modal: {
			edit: 'Bewerk { something }',
			add: 'Voeg { something } toe'
		},
		table: {
			actions: 'acties'
		}
	}
} satisfies BaseTranslation;
