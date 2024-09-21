import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import {  red, yellow } from 'picocolors';
import { getToQueryCommand } from '@/common/utils';
import { createDbQuery } from '@/common/queries';
import { execSync } from 'child_process';
import { DBArgv } from '@/common/types';


export const command = 'create';
export const describe = 'Creates a DB in the server';
export const aliases = ['cd'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs
    .option('target', {
      type: 'string',
      description: 'Name of the database to create in TARGET'
    })
    ;
}

export async function handler(argv: ArgumentsCamelCase<DBArgv>) {

  try {
    const dbName = argv.target?.toString();
    logger.log(yellow(`Creating Target DB ${dbName}`));  

    if (dbName) {
      const createCommand = getToQueryCommand('', createDbQuery(dbName));
      const output = execSync(createCommand);
      logger.info(output);
    } else {
      logger.error(`No --target flag is given, can not create`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}