import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('en'),
	app: {
		versionInfo: 'Version { version }'
	},
	menus: {
		sidebar: {
			dashboard: 'Dashboard',
			users: 'Users',
			permissions: 'Permissions',
			roles: 'Roles',
			projects: 'Projects',
			tasks: 'Tasks',
			noItemsFoundMessage: 'No sidebar menu items found!'
		}
	},
	pages: {
		dashboard: {
			title: 'My Dashboard'
		}
	},
	warnings: {},
	errors: {
		required: 'You forgot to fill in { field }.',
		requiredSelect: 'You forgot to select an option.',
		requiredDate: 'Please select a date.',
		invalidDate: 'Please enter a valid date.',
		invalidForm: 'Invalid form.',
		invalidEmail: 'Oops, wrong format (try "name@forge.com").',
		invalidPassword:
			'Your password must contain at least 8 characters, one uppercase letter, one number and one of these symbols (!@#$%^&*).',
		invalidCombination: 'Oops, this combination is not correct.',
		minCharacters: 'Minimum of { number } characters required',
		maxCharacters: 'Maximum { number } characters exceeded.',
		minValue: 'Value must not be less than { number }.',
		maxValue: 'Value must not be more than { number }.',
		noSomethingFound: 'No { something } found.',
		internalServerError: 'There was an internal server error. Please try again.',
		emailNotFound: 'This email address was not found.',
		emailAddressAlreadyInUse: 'This email address already exists.',
		noDataFound: 'No data found!',
		noInformation: 'No information'
	},
	fields: {
		fullName: {
			text: 'full name'
		},
		firstName: {
			text: 'first name'
		},
		lastName: {
			text: 'last name'
		},
		password: {
			text: 'password',
			hidePassword: 'Hide password',
			showPassword: 'Show password',
			forgotYourPassword: 'Forgot your password?'
		},
		email: {
			text: 'email address'
		},
		search: {
			text: 'search'
		},
		phone: {
			text: 'phone'
		}
	},
	buttonsOrLinks: {
		cancel: 'Cancel',
		confirm: 'Confirm',
		addSomething: 'Add { something }',
		editSomething: 'Edit { something }',
		deleteSomething: 'Delete { something }',
		logOut: 'Log out'
	},
	components: {
		footer: {
			copyright: 'All rights reserved.',
			slogan: 'forge - Your indispensable assistant'
		},
		modal: {
			placeholders: {
				title: 'Modal Title',
				body: 'Modal content'
			},
			deleteMessage: 'Are you ok with deleting this { entity }?'
		},
		table: {
			actions: 'actions'
		},
		form: {
			placeholders: {
				selectEmptyOptionText: 'Select an option'
			}
		}
	},
	modules: {
		roles: {
			entity: {
				single: 'role',
				multiple: 'roles'
			}
		},
		permissions: {
			entity: {
				single: 'permission',
				multiple: 'permissions'
			}
		},
		users: {
			entity: {
				single: 'user',
				multiple: 'users'
			}
		},
		projects: {
			entity: {
				single: 'project',
				multiple: 'projects'
			}
		},
		tasks: {
			entity: {
				single: 'task',
				multiple: 'tasks'
			}
		}
	}
} satisfies BaseTranslation;
