import { Collection, ObjectId } from 'mongodb';
import { Permission, Project, Role, Task, User } from '../models';
import { faker } from '@faker-js/faker';
import { Language, Modules, UserRole } from '../enums';
import { formErrorObject } from './error-handling';
import { createPermissionsObjectFromArray, generateObjectIds } from './helpers';
import { TaskStatus } from '../enums/Task';
import dotenv from 'dotenv';
import path from 'path';

// --------- dotenv ------------
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const groupTasksByProject = (projects: ObjectId[], tasks: ObjectId[]) => {
    if (
        projects.length !== numberOfProjectsToGenerate ||
        tasks.length !== numberOfTasksToGenerate * numberOfProjectsToGenerate
    ) {
        throw new Error(
            `Invalid input: there must be ${numberOfProjectsToGenerate} projects and ${
                numberOfTasksToGenerate * numberOfProjectsToGenerate
            } tasks.`
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedTasks: any = {};

    projects.forEach((project, index) => {
        const startIndex = index * numberOfProjectsToGenerate;
        const endIndex = startIndex + numberOfProjectsToGenerate;

        groupedTasks[project.toString()] = tasks.slice(startIndex, endIndex);
    });

    return groupedTasks;
};

const numberOfUsersToGenerate = 15;
const numberOfProjectsToGenerate = 5;
const numberOfTasksToGenerate = 5;
const projectsIds = generateObjectIds(numberOfProjectsToGenerate);
const tasksIds = generateObjectIds(numberOfTasksToGenerate * numberOfProjectsToGenerate);
const tasksIdsPerProjectsIds = groupTasksByProject(projectsIds, tasksIds);
const roles: UserRole[] = Object.values(UserRole);
const modules: Modules[] = Object.values(Modules);
const languages: Language[] = Object.values(Language);
const taskStatuses: TaskStatus[] = Object.values(TaskStatus);
const adminObjectId = new ObjectId(process.env.ADMIN_OBJECT_ID);
const managerObjectId = new ObjectId(process.env.MANAGER_OBJECT_ID);
const clientObjectId = new ObjectId(process.env.CLIENT_OBJECT_ID);
const workerObjectId = new ObjectId(process.env.WORKER_OBJECT_ID);
const adminUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => ({
        name: module,
        read: true,
        write: true
    }))
);
const managerUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => {
        if (module === 'roles' || module === 'permissions') {
            return {
                name: module,
                read: false,
                write: false
            };
        } else if (module === 'users') {
            return {
                name: module,
                read: true,
                write: false
            };
        } else {
            return {
                name: module,
                read: true,
                write: true
            };
        }
    })
);
const clientUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => {
        if (module === 'projects' || module === 'tasks') {
            return {
                name: module,
                read: true,
                write: true
            };
        } else {
            return {
                name: module,
                read: false,
                write: false
            };
        }
    })
);
const workerUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => {
        if (module === 'tasks') {
            return {
                name: module,
                read: true,
                write: true
            };
        } else if (module === 'users' || module === 'projects') {
            return {
                name: module,
                read: true,
                write: false
            };
        } else {
            return {
                name: module,
                read: false,
                write: false
            };
        }
    })
);
const defaultUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => ({
        name: module,
        read: false,
        write: false
    }))
);

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
        const adminUser = {
            _id: adminObjectId,
            firstName: `${process.env.ADMIN_FIRST_NAME}`,
            lastName: `${process.env.ADMIN_LAST_NAME}`,
            email: `${process.env.ADMIN_EMAIL}`,
            phone: `${process.env.ADMIN_PHONE}`,
            role: UserRole.ADMIN,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: adminUserPermissions,
            changeLog: {
                createdAt: new Date()
            }
        };

        const managerTestUser = {
            _id: managerObjectId,
            firstName: 'Manager',
            lastName: 'TestUser',
            email: 'manager.test.user@forge.com',
            phone: faker.phone.number(),
            role: UserRole.MANAGER,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: managerUserPermissions,
            changeLog: {
                createdAt: new Date()
            }
        };

        const clientTestUser = {
            _id: clientObjectId,
            firstName: 'Client',
            lastName: 'TestUser',
            email: 'client.test.user@forge.com',
            phone: faker.phone.number(),
            role: UserRole.CLIENT,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: clientUserPermissions,
            changeLog: {
                createdAt: new Date()
            }
        };

        const workerTestUser = {
            _id: workerObjectId,
            firstName: 'Worker',
            lastName: 'TestUser',
            email: 'worker.test.user@forge.com',
            phone: faker.phone.number(),
            role: UserRole.WORKER,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: workerUserPermissions,
            changeLog: {
                createdAt: new Date()
            }
        };

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

        await collection.insertMany([
            adminUser,
            clientTestUser,
            workerTestUser,
            managerTestUser,
            ...usersToInsert
        ]);
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
            clients: [clientObjectId],
            workers: [workerObjectId],
            manager: managerObjectId,
            tasks: tasksIdsPerProjectsIds[projectId.toString()].map(
                (taskId: string) => new ObjectId(taskId)
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
        const tasksToInsert = [];
        for (const [projectId, taskIds] of Object.entries(tasksIdsPerProjectsIds)) {
            const arrayToInsert = (taskIds as string[]).map((taskId: string) => ({
                _id: new ObjectId(taskId),
                title: faker.lorem.text(),
                description: faker.lorem.paragraph(),
                project: new ObjectId(projectId),
                responsible: [workerObjectId],
                status: faker.helpers.arrayElement(taskStatuses),
                changeLog: {
                    createdAt: new Date()
                }
            }));
            tasksToInsert.push(arrayToInsert);
        }

        await collection.insertMany(tasksToInsert.flat());
    } catch (e) {
        console.error({
            error: formErrorObject({ errorKey: 'error_seeding_tasks', error: e })
        });
    } finally {
        console.info('Tasks collection seeded');
    }
};
