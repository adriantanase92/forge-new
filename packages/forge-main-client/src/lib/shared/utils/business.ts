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

export type ChangeLog = {
	createdAt: Date;
	updatedAt?: Date;
};

export type Role = {
	_id?: string;
	id?: string;
	name: UserRole;
	changeLog?: ChangeLog;
};

export type Permission = {
	_id?: string;
	id?: string;
	name: Modules;
	changeLog?: ChangeLog;
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
	_id?: string;
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
	changeLog?: ChangeLog;
};

export type Project = {
	_id?: string;
	id?: string;
	name: string;
	clients: string[];
	workers: string[];
	manager: string;
	tasks: string[];
	description: string;
	changeLog?: ChangeLog;
};

export enum TaskStatus {
	TO_DO = 'to-do',
	IN_PROGRESS = 'in-progress',
	DONE = 'done'
}

export type Task = {
	_id?: string;
	id?: string;
	title: string;
	description: string;
	project: string;
	responsible: string[];
	status: TaskStatus;
	changeLog?: ChangeLog;
};
