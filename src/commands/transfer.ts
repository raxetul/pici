import { DBArgv } from '@/common/types';
import { getDumpCommand, getRestoreCommand } from '@/common/utils';
import { execSync } from 'child_process';
import { red, yellow } from 'picocolors';
import { ArgumentsCamelCase, Argv } from 'yargs';

import { logger } from '../logger';

export const command = 'transfer';
export const describe = 'Transfers database SOURCE DB to TARGET DB, stores locally first';
export const aliases = ['t'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs
    .option('target', {
      type: 'string',
      description: 'Name of the database to count its tables from TARGET VARIABLES',
    })
    .option('source', {
      type: 'string',
      description: 'Name of the database to count its tables from TARGET VARIABLES',
    });
}

export async function handler(argv: ArgumentsCamelCase<DBArgv>) {
  try {
    const sourceDb = argv.source?.toString();
    const targetDb = argv.target?.toString();

    logger.info(yellow(`Transfering From DB from ${sourceDb} --->>> to ${targetDb}`));

    if (sourceDb && targetDb) {
      const date = new Date().toISOString().replace('T', '---').replaceAll(':', '-');

      // const backupByRenamingInDBQuery = getRenameDBQuery(targetDb,`${targetDb}__${date}`)
      // const backupByRenamingInDBCommand = getToQueryCommand('', backupByRenamingInDBQuery.replace(/"/g, '\\"'));

      // await execSync(backupByRenamingInDBCommand, infoErrorCallback);
      // await execSync(getToQueryCommand(targetDb, createDbQuery(targetDb)));

      const fileName = `${sourceDb}-${date}.dump`;
      logger.log(yellow(`Dumping DB ${sourceDb} to file ${fileName}!`));

      const dumpCommand = getDumpCommand(sourceDb, fileName);
      const dumpOutput = execSync(dumpCommand);
      logger.info(dumpOutput);

      logger.log(yellow(`Restoring file ${fileName} to DB ${targetDb}!`));
      const restoreCommand = getRestoreCommand(targetDb, fileName);
      const restoreOutput = execSync(restoreCommand);
      logger.info(restoreOutput);
    } else {
      logger.error(` No --source and --target flag is given, can not transfer`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}
