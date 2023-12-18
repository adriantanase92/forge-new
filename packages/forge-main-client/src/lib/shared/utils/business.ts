export type UserRole = 'admin' | 'client' | 'manager' | 'worker';
export type PreferredLanguage = 'en' | 'fr' | 'nl';

export type User = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	role: UserRole;
	preferredLanguage: PreferredLanguage;
	projects: string[];
	address: {
		country: string;
		county: string;
		city: string;
		street: string;
		locationNumber: string;
		zipCode: string;
	};
	createdAt: string;
};

export type Project = {
	name: string;
	clients: string[];
	workers: string[];
	manager: string;
	tasks: string[];
	description: string;
	createdAt: string;
};
