import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import {  red, yellow } from 'picocolors';
import { getDumpCommand, getToQueryCommand, infoErrorCallback } from '@/common/utils';
import { createDbQuery } from '@/common/queries';
const { execSync } = require('child_process');


export const command = 'create';
export const describe = 'Creates a DB in the server';
export const aliases = ['cd'];

export function builder(yargs: Argv<DBNameArgv>): Argv {
  return yargs
    .option('to', {
      type: 'string',
      description: 'Name of the database to count its tables from TO VARIABLES'
    })
    ;
}

export async function handler(argv: ArgumentsCamelCase<DBNameArgv>) {
  try {
    const dbName = argv.to.toString();
    logger.log(yellow(`Creating TO DB ${dbName}`));  

    if (dbName) {
      const createCommand = getToQueryCommand('', createDbQuery(dbName));
      await execSync(createCommand, infoErrorCallback);
    } else {
      logger.error(`No --to flag is given, can not create`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}