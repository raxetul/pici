import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import {  red, yellow } from 'picocolors';
import { getDumpCommand, infoErrorCallback } from '@/common/utils';
const { execSync } = require('child_process');


export const command = 'dump';
export const describe = 'Dumps a DB into file with the name including timestamp in the current folder';
export const aliases = ['d'];

export function builder(yargs: Argv<DBNameArgv>): Argv {
  return yargs
    .option('from', {
      type: 'string',
      description: 'Name of the database to count its tables from FROM VARIABLES'
    })
    ;
}

export async function handler(argv: ArgumentsCamelCase<DBNameArgv>) {
  try {
    const fromDB = argv.from.toString();
    logger.log(yellow(`Dumping DB ${argv.to}`));  
    if (fromDB) {
      let date = new Date().toISOString().replace('T','---').replaceAll(':','-');
      const fileName = `${fromDB}-${date}.dump`;
      logger.log(yellow(`Dumping DB ${fromDB} to file ${fileName}!`));
      const dumpCommand = getDumpCommand(fromDB, fileName);
      await execSync(dumpCommand, infoErrorCallback);
    } else {
      logger.error(` No --from flag is given, can not dump`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}