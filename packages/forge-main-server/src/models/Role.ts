import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zRole } from '../validators';

export type Role = z.infer<typeof zRole> & { changeLog: ChangeLog };
