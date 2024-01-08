import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('fr'),
	app: {
		versionInfo: 'Version { version }'
	},
	menus: {
		sidebar: {
			dashboard: 'Tableau de bord',
			users: 'Utilisateurs',
			permissions: 'Autorisations',
			roles: 'Les rôles',
			projects: 'Projets',
			noItemsFoundMessage: 'Aucun élément de menu de la barre latérale trouvé!'
		}
	},
	pages: {
		dashboard: {
			title: 'Mon tableau de bord'
		}
	},
	warnings: {},
	errors: {
		required: 'Vous avez oublié de renseigner votre { field }.',
		requiredSelect: 'Vous avez oublié de sélectionner une option.',
		requiredDate: 'Veuillez sélectionner une date.',
		invalidDate: 'Veuillez entrer une date valide.',
		invalidForm: 'Forme non valide.',
		invalidEmail: 'Adresse email invalide - exemple: name@forge.com.',
		invalidPassword:
			'Votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un de ces symboles (!@#$%^&*).',
		invalidCombination: 'Une combinaison invalide.',
		minCharacters: 'Minimum de { number } caractères requis.',
		maxCharacters: 'Nombre maximal de { number } caractères dépassé.',
		minValue: 'La valeur ne doit pas être inférieure à { number }.',
		maxValue: 'La valeur ne doit pas être supérieure à { number }.',
		noSomethingFound: 'Aucun { something } trouvé.',
		internalServerError: 'Erreur interne du serveur.',
		emailNotFound: "Cette adresse e-mail n'a pas été trouvée.",
		emailAddressAlreadyInUse: "L'adresse email existe déjà.",
		noDataFound: 'Aucune donnée disponible!',
		noInformation: 'Aucune information.',
		errorFetchingSomethingFromServer:
			'Erreur lors de la récupération de { something } depuis le serveur.'
	},
	fields: {
		name: {
			text: 'nom'
		},
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
		},
		role: {
			text: 'rôle'
		},
		title: {
			text: 'titre'
		},
		description: {
			text: 'description'
		}
	},
	buttonsOrLinks: {
		cancel: 'Annuler',
		confirm: 'Confirmer',
		addSomething: 'Ajoute { something }',
		editSomething: 'Modifier { something }',
		deleteSomething: 'Supprimer { something }',
		saveSomething: 'Enregistrer { something }',
		logOut: 'Se déconnecter'
	},
	components: {
		footer: {
			copyright: 'Tous droits réservés.',
			slogan: 'forge - Votre assistant indispensable'
		},
		modal: {
			placeholders: {
				title: 'Titre modal',
				body: 'Contenu modal'
			},
			deleteMessage: "Êtes-vous d'accord pour supprimer ceci { entity }?"
		},
		table: {
			actions: 'actions'
		},
		form: {
			placeholders: {
				selectEmptyOptionText: 'Choisir une option'
			}
		}
	},
	modules: {
		roles: {
			entity: {
				single: 'rôle',
				multiple: 'les rôles'
			}
		},
		permissions: {
			entity: {
				single: 'autorisation',
				multiple: 'autorisations'
			}
		},
		users: {
			entity: {
				single: 'utilisateur',
				multiple: 'utilisateurs'
			},
			types: {
				admin: {
					single: 'administrateur',
					multiple: 'administrateurs'
				},
				manager: {
					single: 'directeur',
					multiple: 'gestionnaires'
				},
				client: {
					single: 'client',
					multiple: 'clients'
				},
				worker: {
					single: 'ouvrier',
					multiple: 'ouvriers'
				}
			}
		},
		projects: {
			entity: {
				single: 'projet',
				multiple: 'projets'
			}
		},
		tasks: {
			entity: {
				single: 'tâche',
				multiple: 'tâches'
			}
		}
	}
} satisfies BaseTranslation;
