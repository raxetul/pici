import { DBArgv } from '@/common/types';
import { getDumpCommand } from '@/common/utils';
import { execSync } from 'child_process';
import { green, red, yellow } from 'picocolors';
import { ArgumentsCamelCase, Argv } from 'yargs';

import { logger } from '../logger';

export const command = 'dump';
export const describe = 'Dumps a DB into file with the name including timestamp in the current folder';
export const aliases = ['d'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs.option('source', {
    type: 'string',
    description: 'Name of the database to count its tables from SOURCE VARIABLES',
  });
}

export function handler(argv: ArgumentsCamelCase<DBArgv>): void {
  try {
    const sourceDb = argv.source?.toString();
    if (sourceDb) {
      const date = new Date().toISOString().replace('T', '---').replaceAll(':', '-');
      const fileName = `${sourceDb}-${date}.dump`;
      logger.info(yellow(`Dumping DB ${sourceDb} to file ${fileName}!`));
      const dumpCommand = getDumpCommand(sourceDb, fileName);
      execSync(dumpCommand);
      logger.info(green(`Operation is completed`));
    } else {
      logger.error(red(` No --from flag is given, can not dump`));
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}
