import type { Collection } from 'mongodb';
import type { Project } from './Project';
import type { Task } from './Task';

export type Db = {
    projects: Collection<Project>;
    tasks: Collection<Task>;
};
