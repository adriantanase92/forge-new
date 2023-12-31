import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('en'),
	menus: {
		sidebar: {
			dashboard: 'Dashboard',
			users: 'Users',
			permissions: 'Permissions',
			roles: 'Roles',
			projects: 'Projects',
			tasks: 'Tasks'
		}
	},
	pages: {},
	warnings: {},
	errors: {
		required: 'You forgot to fill in { field }.',
		required_select: 'You forgot to select an option.',
		required_date: 'Please select a date.',
		invalid_date: 'Please enter a valid date.',
		invalid_form: 'Invalid form.',
		invalid_email: 'Oops, wrong format (try "name@forge.com").',
		invalid_password:
			'Your password must contain at least 8 characters, one uppercase letter, one number and one of these symbols (!@#$%^&*).',
		invalid_combination: 'Oops, this combination is not correct.',
		min_characters: 'Minimum of { number } characters required',
		max_characters: 'Maximum { number } characters exceeded.',
		min_value: 'Value must not be less than { number }.',
		max_value: 'Value must not be more than { number }.',
		no_something_found: 'No { something } found.',
		internal_server_error: 'There was an internal server error. Please try again.',
		email_not_found: 'This email address was not found.',
		email_address_already_in_use: 'This email address already exists.',
		no_data_found: 'No data found!',
		no_entity_found: 'No { entity } found!',
		no_information: 'No information'
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
	buttonsOrLinks: {},
	components: {
		modal: {
			edit: 'Edit { something }',
			add: 'Add { something }'
		},
		table: {
			actions: 'actions'
		}
	}
} satisfies BaseTranslation;
