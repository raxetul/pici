import { DBArgv } from '@/common/types';
import { getRestoreCommand } from '@/common/utils';
import { execSync } from 'child_process';
import { red, yellow } from 'picocolors';
import { ArgumentsCamelCase, Argv } from 'yargs';

import { logger } from '../logger';

export const command = 'restore';
export const describe = 'Restore dump file into a DB';
export const aliases = ['r'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs
    .option('file', {
      type: 'string',
      description: 'Name of the file which is going to be restored',
    })
    .option('target', {
      type: 'string',
      description: 'Name of the database to count its tables from FROM VARIABLES',
    });
}

export async function handler(argv: ArgumentsCamelCase<DBArgv>): Promise<void> {
  try {
    const dbName = argv.target?.toString();
    const fileName = argv.file?.toString();
    logger.log(yellow(`Restoring DB ${dbName} from file ${fileName}`));

    if (dbName && fileName) {
      if (
        process.env.SOURCE_SERVER === process.env.TARGET_SERVER &&
        process.env.SOURCE_PORT === process.env.TARGET_PORT &&
        fileName.split('-')[0] === dbName
      ) {
        logger.error(`Cannot restore to the same DB, use explicitly written pg_restore command!`);
        return;
      }
      const restoreCommand = getRestoreCommand(dbName, fileName);
      const output = execSync(restoreCommand);
      logger.info(output);
    } else {
      logger.error(`No --to or --file flag is given, can not restore`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}
