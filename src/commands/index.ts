import dotenv from 'dotenv';
import * as count from './count';
import * as create from "./create";
import * as dumpOnly from './dump-only';
import * as restoreOnly from './restore-only';
import * as transfer from "./transfer";



dotenv.config();

export const commands = [count, create, dumpOnly, restoreOnly, transfer];
