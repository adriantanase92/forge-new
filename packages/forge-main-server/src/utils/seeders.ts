import { Collection, ObjectId } from 'mongodb';
import { Permission, Project, Role, Task, User } from '../models';
import { faker } from '@faker-js/faker';
import { Language, Modules, UserRole } from '../enums';
import { formErrorObject } from './error-handling';
import { createPermissionsObjectFromArray, generateObjectIds } from './helpers';
import { TaskStatus } from '../enums/Task';

const numberOfUsersToGenerate = 15;
const numberOfTasksToGenerate = 10;
const roles: UserRole[] = Object.values(UserRole);
const modules: Modules[] = Object.values(Modules);
const languages: Language[] = Object.values(Language);
const taskStatuses: TaskStatus[] = Object.values(TaskStatus);
const defaultUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => ({
        name: module,
        read: false,
        write: false
    }))
);
const projectsIds = generateObjectIds(25);

export const seedRoles = async (collection: Collection<Role>): Promise<void> => {
    try {
        const rolesToInsert = roles.map((role) => ({
            name: role,
            changeLog: {
                createdAt: new Date()
            }
        }));
        await collection.insertMany(rolesToInsert);
    } catch (e) {
        console.error({ error: formErrorObject({ errorKey: 'error_seeding_roles', error: e }) });
    } finally {
        console.info('Roles collection seeded');
    }
};

export const seedPermissions = async (collection: Collection<Permission>): Promise<void> => {
    try {
        const permissionsToInsert = modules.map((module) => ({
            name: module,
            changeLog: {
                createdAt: new Date()
            }
        }));
        await collection.insertMany(permissionsToInsert);
    } catch (e) {
        console.error({
            error: formErrorObject({ errorKey: 'error_seeding_permissions', error: e })
        });
    } finally {
        console.info('Permissions collection seeded');
    }
};

export const seedUsers = async (collection: Collection<User>): Promise<void> => {
    try {
        const usersToInsert = Array.from({ length: numberOfUsersToGenerate }, () => {
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
                projects: [],
                permissions: defaultUserPermissions,
                address: {
                    country: faker.location.country(),
                    county: faker.location.county(),
                    city: faker.location.city(),
                    street: faker.location.street(),
                    locationNumber: faker.location.buildingNumber(),
                    zipCode: faker.location.zipCode()
                },
                changeLog: {
                    createdAt: new Date()
                }
            };
        });

        await collection.insertMany(usersToInsert);
    } catch (e) {
        console.error({
            error: formErrorObject({ errorKey: 'error_seeding_users', error: e })
        });
    } finally {
        console.info('Users collection seeded');
    }
};

export const seedProjects = async (collection: Collection<Project>): Promise<void> => {
    try {
        const projectsToInsert = projectsIds.map((projectId) => ({
            _id: new ObjectId(projectId),
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            clients: Array.from(
                { length: faker.number.int({ min: 1, max: 3 }) },
                () => new ObjectId()
            ),
            workers: Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                () => new ObjectId()
            ),
            manager: new ObjectId(),
            tasks: Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                () => new ObjectId()
            ),
            changeLog: {
                createdAt: new Date()
            }
        }));

        await collection.insertMany(projectsToInsert);
    } catch (e) {
        console.error({
            error: formErrorObject({ errorKey: 'error_seeding_projects', error: e })
        });
    } finally {
        console.info('Projects collection seeded');
    }
};

export const seedTasks = async (collection: Collection<Task>): Promise<void> => {
    try {
        const tasksToInsert = projectsIds
            .map((projectId) =>
                Array.from({ length: numberOfTasksToGenerate }, () => ({
                    title: faker.lorem.text(),
                    description: faker.lorem.paragraph(),
                    project: new ObjectId(projectId),
                    responsible: Array.from(
                        { length: faker.number.int({ min: 1, max: 3 }) },
                        () => new ObjectId()
                    ),
                    status: faker.helpers.arrayElement(taskStatuses),
                    changeLog: {
                        createdAt: new Date()
                    }
                }))
            )
            .flat();

        await collection.insertMany(tasksToInsert);
    } catch (e) {
        console.error({
            error: formErrorObject({ errorKey: 'error_seeding_tasks', error: e })
        });
    } finally {
        console.info('Tasks collection seeded');
    }
};
