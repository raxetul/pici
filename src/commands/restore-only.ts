import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import {  red, yellow } from 'picocolors';
import { getRestoreCommand, getToQueryCommand, infoErrorCallback } from '@/common/utils';
import { createDbQuery } from '@/common/queries';
const { execSync } = require('child_process');


export const command = 'restore';
export const describe = 'Restore dump file into a DB';
export const aliases = ['r'];

export function builder(yargs: Argv<DBNameArgv>): Argv {
  return yargs
    .option('file', {
      type: 'string',
      description: 'Name of the file which is going to be restored'
    })
    .option('to', {
      type: 'string',
      description: 'Name of the database to count its tables from FROM VARIABLES'
    })
    ;
}

export async function handler(argv: ArgumentsCamelCase<DBNameArgv>) {
  try {
    const dbName = argv.to.toString();
    const fileName = argv.file.toString();
    logger.log(yellow(`Restoring DB ${dbName} from file ${fileName}`));  

    if (dbName && fileName) {
      if (process.env.FROM_SERVER === process.env.TO_SERVER &&
        process.env.FROM_PORT === process.env.TO_PORT &&
        fileName.split('-')[0] === dbName
      ) {
        logger.error(`Cannot restore to the same DB, use explicitly written pg_restore command!`);
        return;
      }
      const restoreCommand = getRestoreCommand(dbName, fileName);
      await execSync(restoreCommand, infoErrorCallback);

    } else {
      logger.error(`No --to or --file flag is given, can not restore`);
    }

  } catch (e) {
    logger.error(red((e as Error).message));
  }
}