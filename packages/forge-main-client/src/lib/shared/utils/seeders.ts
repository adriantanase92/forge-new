import { faker } from '@faker-js/faker';
import {
	UserRole,
	PreferredLanguage,
	type Project,
	type User,
	type Permission,
	Modules,
	type Role,
	type Task,
	TaskStatus
} from './business';

const roles: UserRole[] = Object.values(UserRole);
const languages: PreferredLanguage[] = Object.values(PreferredLanguage);
const modules: Modules[] = Object.values(Modules);
const taskStatuses: TaskStatus[] = Object.values(TaskStatus);

export const generateUsers = (numberOfUsers: number): User[] => {
	return Array.from({ length: numberOfUsers }, (): User => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		return {
			id: faker.database.mongodbObjectId(),
			firstName,
			lastName,
			email: faker.internet.email({
				firstName,
				lastName
			}),
			phone: faker.phone.number(),
			role: faker.helpers.arrayElement(roles),
			preferredLanguage: faker.helpers.arrayElement(languages),
			createdAt: faker.date.past().toISOString(),
			projects: [],
			permissions: [],
			address: {
				country: faker.location.country(),
				county: faker.location.county(),
				city: faker.location.city(),
				street: faker.location.street(),
				locationNumber: faker.location.buildingNumber(),
				zipCode: faker.location.zipCode()
			}
		};
	});
};

export const generatePermissions = (): Permission[] =>
	modules.map((module) => ({
		id: faker.database.mongodbObjectId(),
		name: module
	}));

export const generateRoles = (): Role[] =>
	roles.map((role) => ({
		id: faker.database.mongodbObjectId(),
		name: role
	}));

export const generateProjects = (numberOfProjects: number): Project[] => {
	return Array.from(
		{ length: numberOfProjects },
		(): Project => ({
			name: faker.commerce.productName(),
			createdAt: faker.date.past().toISOString(),
			clients: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
				faker.database.mongodbObjectId()
			),
			workers: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
				faker.database.mongodbObjectId()
			),
			manager: faker.database.mongodbObjectId(),
			tasks: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () =>
				faker.database.mongodbObjectId()
			),
			description: faker.lorem.paragraph()
		})
	);
};

export const generateTasks = (numberOfTasks: number): Task[] => {
	return Array.from(
		{ length: numberOfTasks },
		(): Task => ({
			title: faker.lorem.text(),
			description: faker.lorem.paragraph(),
			project: faker.database.mongodbObjectId(),
			responsible: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
				faker.database.mongodbObjectId()
			),
			status: faker.helpers.arrayElement(taskStatuses)
		})
	);
};
