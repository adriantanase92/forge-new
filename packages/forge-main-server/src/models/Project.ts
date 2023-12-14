import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zProject } from '../validators';

export type Project = z.infer<typeof zProject> & { changeLog: ChangeLog };
