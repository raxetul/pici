import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import { red } from 'picocolors';
import { infoErrorCallback, getFromQueryCommand, getToQueryCommand } from '@/common/utils';
const { execSync } = require('child_process');


export const command = 'count';
export const describe = 'Return row counts of all tables in the given DB';
export const aliases = ['c'];

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
    logger.log(`Table counts in DB ${argv.to}`);
    const countQuery = `SELECT table_name, (SELECT n_live_tup FROM pg_stat_user_tables WHERE relname = table_name) AS row_count FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;`;
  
    const countCommand = argv.to ?
    getToQueryCommand(argv.to.toString(), countQuery)
    :
    argv.from ?
      getFromQueryCommand(argv.from.toString(), countQuery)
      :
      null;
  
    if (countCommand) {
      logger.log(countCommand)
      execSync(countCommand, infoErrorCallback);
    } else {
      logger.error(`No --to or --from flag is given, can not count`);
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}