import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import {  red, yellow } from 'picocolors';
import { getDumpCommand } from '@/common/utils';
import { execSync } from 'child_process';
import { DBArgv } from '@/common/types';


export const command = 'dump';
export const describe = 'Dumps a DB into file with the name including timestamp in the current folder';
export const aliases = ['d'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs
    .option('source', {
      type: 'string',
      description: 'Name of the database to count its tables from SOURCE VARIABLES'
    })
    ;
}

export function handler(argv: ArgumentsCamelCase<DBArgv>): void {
  try {
    const sourceDb = argv.source?.toString();
    logger.log(yellow(`Dumping DB ${argv.target}`));  
    if (sourceDb) {
      const date = new Date().toISOString().replace('T','---').replaceAll(':','-');
      const fileName = `${sourceDb}-${date}.dump`;
      logger.log(yellow(`Dumping DB ${sourceDb} to file ${fileName}!`));
      const dumpCommand = getDumpCommand(sourceDb, fileName);
      const output =execSync(dumpCommand);
      logger.info(output);
    } else {
      logger.error(` No --from flag is given, can not dump`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}