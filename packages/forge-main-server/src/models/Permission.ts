import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zPermission } from '../validators';

export type Permission = z.infer<typeof zPermission> & { changeLog: ChangeLog };
