import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zUser } from '../validators';

export type User = z.infer<typeof zUser> & { changeLog: ChangeLog };
