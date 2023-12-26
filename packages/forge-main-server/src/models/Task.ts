import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zTask } from '../validators';

export type Task = z.infer<typeof zTask> & { changeLog: ChangeLog };
