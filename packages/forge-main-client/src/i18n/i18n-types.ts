// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n';
import type { GenericNumberParameter, GenericStringParameter } from './types';

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = 'en';

export type Locales = 'en' | 'fr' | 'nl';

export type Translation = RootTranslation;

export type Translations = RootTranslation;

export type RoutesTranslations = {
    href: RequiredParams<'0'>;
    public: {
        logIn: string;
    };
    protected: {
		logOut: string;
		dashboard: string;
		users: string;
		roles: string;
		permissions: string;
		projects: string;
		tasks: string;
		profile: string;
	}
};

export type AppTranslations = {
	versionInfo: string;
}

export type MenusTranslations = {
	sidebar: {
		dashboard: string;
		users: string;
		permissions: string;
		roles: string;
		projects: string;
		tasks: string;
		noItemsFoundMessage: string;
	}
};

export type PagesTranslations = {
	dashboard: {
		title: string;
	}
};

export type WarningsTranslations = {};

export type ErrorsTranslations = {
    required: string;
    requiredSelect: string;
    requiredDate: string;
    invalidDate: string;
    invalidForm: string;
    invalidEmail: string;
    invalidPassword: string;
    invalidCombination: string;
    minCharacters: string;
    maxCharacters: string;
    minValue: string;
    maxValue: string;
    noSomethingFound: string;
    internalServerError: string;
    emailNotFound: string;
    emailAddressAlreadyInUse: string;
    noDataFound: string;
    noInformation: string;
};

export type FieldsTranslations = {
    fullName: {
        text: string;
    };
	firstName: {
		text: string;
	};
	lastName: {
		text: string;
	};
	password: {
		text: string;
		hidePassword: string;
		showPassword: string;
		forgotYourPassword: string;
	};
	email: {
		text: string;
	};
	search: {
		text: string;
	};
	phone: {
		text: string;
	};
};

export type ButtonsOrLinksTranslations = {
	cancel: string;
	confirm: string;
	addSomething: string;
	editSomething: string;
	deleteSomething: string;
	logOut: string;
};

export type ComponentsTranslations = {
	footer: {
		copyright: string;
		slogan: string;
	};
    modal: {
		placeholders: {
			title: string;
			body: string;
		};
		deleteMessage: string;
    };
    table: {
        actions: string;
    };
	form: {
		placeholders: {
			selectEmptyOptionText: string;
		}
	};
};

export type ModulesTranslations = {
	modules: {
		roles: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		permissions: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		users: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		projects: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		tasks: {
			entity: {
				single: string;
				multiple: string;
			}
		};
	}
}

type RootTranslation = {
    routes: RoutesTranslations;
	app: AppTranslations;
    menus: MenusTranslations;
    pages: PagesTranslations;
    warnings: WarningsTranslations;
    errors: ErrorsTranslations;
    fields: FieldsTranslations;
    buttonsOrLinks: ButtonsOrLinksTranslations;
    components: ComponentsTranslations;
    modules: ModulesTranslations;
};

export type TranslationFunctions = {
    routes: {
        href: (arg0: unknown) => LocalizedString;
        public: {
            logIn: () => LocalizedString;
        };
        protected: {
            logOut: () => LocalizedString;
			dashboard: () => LocalizedString;
			users: () => LocalizedString;
			roles: () => LocalizedString;
			permissions: () => LocalizedString;
			projects: () => LocalizedString;
			tasks: () => LocalizedString;
			profile: () => LocalizedString;
        };
    };
	app: {
		versionInfo: ({ version }: GenericStringParameter) => LocalizedString;
	};
	menus: {
		sidebar: {
			dashboard: () => LocalizedString;
			users: () => LocalizedString;
			permissions: () => LocalizedString;
			roles: () => LocalizedString;
			projects: () => LocalizedString;
			tasks: () => LocalizedString;
			noItemsFoundMessage: () => LocalizedString;
		};
	};
	pages: {
		dashboard: {
			title: () => LocalizedString;
		};
	};
	warnings: {};
	errors: {
		required: ({ field }: GenericStringParameter) => LocalizedString;
        requiredSelect: () => LocalizedString;
        requiredDate: () => LocalizedString;
        invalidDate: () => LocalizedString;
        invalidForm: () => LocalizedString;
        invalidEmail: () => LocalizedString;
        invalidPassword: () => LocalizedString;
        invalidCombination: () => LocalizedString;
        minCharacters: ({ number }: GenericNumberParameter) => LocalizedString;
        maxCharacters: ({ number }: GenericNumberParameter) => LocalizedString;
        minValue: ({ number }: GenericNumberParameter) => LocalizedString;
        maxValue: ({ number }: GenericNumberParameter) => LocalizedString;
        noSomethingFound: ({ something }: GenericStringParameter) => LocalizedString;
        internalServerError: () => LocalizedString;
        emailNotFound: () => LocalizedString;
        security_code_not_found: () => LocalizedString;
        security_code_expired: () => LocalizedString;
        emailAddressAlreadyInUse: () => LocalizedString;
        noDataFound: () => LocalizedString;
        noInformation: () => LocalizedString;
    };
    fields: {
        fullName: {
            text: () => LocalizedString;
        };
		firstName: {
			text: () => LocalizedString;
		};
		lastName: {
			text: () => LocalizedString;
		};
		password: {
			text: () => LocalizedString;
			hidePassword: () => LocalizedString;
			showPassword: () => LocalizedString;
			forgotYourPassword: () => LocalizedString;
		};
		email: {
			text: () => LocalizedString;
		};
		search: {
			text: () => LocalizedString;
		};
		phone: {
			text: () => LocalizedString;
		};
    };
    buttonsOrLinks: {
		cancel: () => LocalizedString;
		confirm: () => LocalizedString;
		addSomething: ({ something }: GenericStringParameter) => LocalizedString;
		editSomething: ({ something }: GenericStringParameter) => LocalizedString;
		deleteSomething: ({ something }: GenericStringParameter) => LocalizedString;
		logOut: () => LocalizedString;
	};
    components: {
		footer: {
			copyright: () => LocalizedString;
			slogan: () => LocalizedString;
		};
        modal: {
			placeholders: {
				title: () => LocalizedString;
				body: () => LocalizedString;
			};
			deleteMessage: ({ entity }: GenericStringParameter) => LocalizedString;
        };
        table: {
            actions: () => LocalizedString;
        };
		form: {
			placeholders: {
				selectEmptyOptionText: () => LocalizedString;
			}
		};
    };
	modules: {
		roles: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		permissions: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		users: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		projects: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		tasks: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
	}
};
export type Formatters = {};
