export enum Modules {
	USERS = 'users',
	ROLES = 'roles',
	PERMISSIONS = 'permissions',
	PROJECTS = 'projects',
	TASKS = 'tasks'
}

export enum UserRole {
	ADMIN = 'admin',
	CLIENT = 'client',
	MANAGER = 'manager',
	WORKER = 'worker'
}

export enum PreferredLanguage {
	EN = 'en',
	FR = 'fr',
	NL = 'nl'
}

export type Role = {
	id?: string;
	name: UserRole;
};

export type Permission = {
	id?: string;
	name: Modules;
};

export type PermissionOptions = {
	read: boolean;
	write: boolean;
};

export type UserPermissionArrayItem = Permission & PermissionOptions;

export type UserPermissions = Record<Modules, PermissionOptions>;

export type Address = {
	country?: string;
	county?: string;
	city?: string;
	street?: string;
	locationNumber?: string;
	zipCode?: string;
};

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	role: UserRole;
	permissions: UserPermissions;
	preferredLanguage: PreferredLanguage;
	projects: string[];
	address?: Address;
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

export enum TaskStatus {
	TO_DO = 'to-do',
	IN_PROGRESS = 'in-progress',
	DONE = 'done'
}

export type Task = {
	title: string;
	description: string;
	project: string;
	responsible: string[];
	status: TaskStatus;
};
