import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import {green, red, yellow } from 'picocolors';
import { infoErrorCallback, getFromQueryCommand, getToQueryCommand, getDumpCommand, getRestoreCommand } from '@/common/utils';
import { createDbQuery, getRenameDBQuery } from '@/common/queries';
const { execSync } = require('child_process');


export const command = 'transfer';
export const describe = 'Transfers database FROM DB to TO DB, stores locally first';
export const aliases = ['t'];

export function builder(yargs: Argv<DBNameArgv>): Argv {
  return yargs
    .option('to', {
      type: 'string',
      description: 'Name of the database to count its tables from TO VARIABLES'
    })
    .option('from', {
      type: 'string',
      description: 'Name of the database to count its tables from TO VARIABLES'
    })
    ;
}

export async function handler(argv: ArgumentsCamelCase<DBNameArgv>) {
  try {
    const fromDb = argv.from.toString();
    const toDb = argv.to.toString();

    logger.info(yellow(`Transfering From DB from ${fromDb} --->>> to ${toDb}`));

    if (fromDb && toDb) {
      let date = new Date().toISOString().replace('T','---').replaceAll(':','-');

      // const backupByRenamingInDBQuery = getRenameDBQuery(toDb,`${toDb}__${date}`)
      // const backupByRenamingInDBCommand = getToQueryCommand('', backupByRenamingInDBQuery.replace(/"/g, '\\"'));
      
      // await execSync(backupByRenamingInDBCommand, infoErrorCallback);
      // await execSync(getToQueryCommand(toDb, createDbQuery(toDb)));

      const fileName = `${fromDb}-${date}.dump`;
      logger.log(yellow(`Dumping DB ${fromDb} to file ${fileName}!`));

      const dumpCommand = getDumpCommand(fromDb, fileName);
      await execSync(dumpCommand, infoErrorCallback);
      
      logger.log(yellow(`Restoring file ${fileName} to DB ${toDb}!`));
      const restoreCommand = getRestoreCommand(toDb, fileName);
      await execSync(restoreCommand, infoErrorCallback);

    } else {
      logger.error(` No --from and --to flag is given, can not transfer`);
    }

  } catch (e) {
    logger.error(red((e as Error).message));
  }
}