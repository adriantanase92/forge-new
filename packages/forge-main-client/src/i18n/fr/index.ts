import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('fr'),
	menus: {
		sidebar: {
			dashboard: 'Tableau de bord',
			users: 'Utilisateurs',
			permissions: 'Autorisations',
			roles: 'Les rôles',
			projects: 'Projets',
			tasks: 'Tâches',
			noItemsFoundMessage: 'Aucun élément de menu de la barre latérale trouvé!'
		}
	},
	pages: {
		dashboard: {
			title: 'Mon tableau de bord'
		},
		roles: {
			entity: 'rôles'
		},
		permissions: {
			entity: 'autorisations'
		},
		users: {
			entity: 'utilisateurs'
		},
		projects: {
			entity: 'projets'
		},
		tasks: {
			entity: 'tâches'
		}
	},
	warnings: {},
	errors: {
		required: 'Vous avez oublié de renseigner votre { field }.',
		required_select: 'Vous avez oublié de sélectionner une option.',
		required_date: 'Veuillez sélectionner une date.',
		invalid_date: 'Veuillez entrer une date valide.',
		invalid_form: 'Forme non valide.',
		invalid_email: 'Adresse email invalide - exemple: name@forge.com.',
		invalid_password:
			'Votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un de ces symboles (!@#$%^&*).',
		invalid_combination: 'Une combinaison invalide.',
		min_characters: 'Minimum de { number } caractères requis.',
		max_characters: 'Nombre maximal de { number } caractères dépassé.',
		min_value: 'La valeur ne doit pas être inférieure à { number }.',
		max_value: 'La valeur ne doit pas être supérieure à { number }.',
		no_something_found: 'Aucun { something } trouvé.',
		internal_server_error: 'Erreur interne du serveur.',
		email_not_found: "Cette adresse e-mail n'a pas été trouvée.",
		email_address_already_in_use: "L'adresse email existe déjà.",
		no_data_found: 'Aucune donnée disponible!',
		no_entity_found: 'Aucune { entity } trouvée!',
		no_information: 'Aucune information.'
	},
	fields: {
		fullName: {
			text: 'nom et prénom'
		},
		firstName: {
			text: 'prénom'
		},
		lastName: {
			text: 'nom de famille'
		},
		password: {
			text: 'mot de passe',
			hidePassword: 'Masquer le mot de passe',
			showPassword: 'Montrer le mot de passe',
			forgotYourPassword: 'Mot de passe oublié?'
		},
		email: {
			text: 'adresse e-mail'
		},
		search: {
			text: 'recherche'
		},
		phone: {
			text: 'téléphone'
		}
	},
	buttonsOrLinks: {
		add_something: 'Ajoute { something }'
	},
	components: {
		modal: {
			edit: 'Modifier { something }',
			add: 'Ajouter { something }'
		},
		table: {
			actions: 'actions'
		}
	}
} satisfies BaseTranslation;
