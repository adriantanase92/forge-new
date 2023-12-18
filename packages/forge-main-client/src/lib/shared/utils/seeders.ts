import { faker } from '@faker-js/faker';
import type { PreferredLanguage, Project, User, UserRole } from './business';

const roles: UserRole[] = ['client', 'manager', 'worker'];
const languages: PreferredLanguage[] = ['en', 'fr', 'nl'];

faker.database.mongodbObjectId();

export const generateUsers = (numberOfUsers: number): User[] => {
	return Array.from({ length: numberOfUsers }, (): User => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();

		return {
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

export const generateProjects = (numberOfProjects: number): Project[] => {
	return Array.from(
		{ length: numberOfProjects },
		(): Project => ({
			name: faker.commerce.productName(),
			createdAt: faker.date.past().toISOString(),
			clients: Array.from({ length: faker.datatype.number({ min: 1, max: 3 }) }, () =>
				faker.datatype.uuid()
			),
			workers: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () =>
				faker.datatype.uuid()
			),
			manager: faker.datatype.uuid(),
			tasks: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, () =>
				faker.datatype.uuid()
			),
			description: faker.lorem.paragraph()
		})
	);
};
