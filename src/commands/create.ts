import { createDbQuery } from '@/common/queries';
import { DBArgv } from '@/common/types';
import { getToQueryCommand } from '@/common/utils';
import { execSync } from 'child_process';
import { green, red, yellow } from 'picocolors';
import { ArgumentsCamelCase, Argv } from 'yargs';

import { logger } from '../logger';

export const command = 'create';
export const describe = 'Creates a DB in the server';
export const aliases = ['cd'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs.option('target', {
    type: 'string',
    description: 'Name of the database to create in TARGET',
  });
}

export async function handler(argv: ArgumentsCamelCase<DBArgv>) {
  try {
    const dbName = argv.target?.toString();
    logger.info(yellow(`Creating Target DB ${dbName}`));

    if (dbName) {
      const createCommand = getToQueryCommand('', createDbQuery(dbName));
      execSync(createCommand);
      logger.info(green(`Operation is completed`));
    } else {
      logger.error(red(`No --target flag is given, can not create`));
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}
