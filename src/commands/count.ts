import { DBArgv } from '@/common/types';
import { getFromQueryCommand, getToQueryCommand } from '@/common/utils';
import { execSync } from 'child_process';
import { green, red } from 'picocolors';
import { ArgumentsCamelCase, Argv } from 'yargs';

import { logger } from '../logger';

export const command = 'count';
export const describe = 'Return row counts of all tables in the given DB';
export const aliases = ['c'];

export function builder(yargs: Argv<DBArgv>): Argv {
  return yargs
    .option('target', {
      type: 'string',
      description: 'Name of the database in TARGET to count table rows',
    })
    .option('source', {
      type: 'string',
      description: 'Name of the database in SOURCE to count table rows',
    });
}

export async function handler(argv: ArgumentsCamelCase<DBArgv>): Promise<void> {
  try {
    logger.info(`Table counts in DB ${argv.target || argv.source}`);
    const countQuery = `SELECT 
        table_name,
        (SELECT 
          n_live_tup
        FROM 
          pg_stat_user_tables
        WHERE relname = table_name) AS row_count
      FROM 
        information_schema.tables 
      WHERE 
        table_schema = 'public' ORDER BY table_name;`;

    const countCommand = argv.target
      ? getToQueryCommand(argv.target.toString(), countQuery)
      : argv.source
        ? getFromQueryCommand(argv.source.toString(), countQuery)
        : null;

    if (countCommand) {
      const output = execSync(countCommand);
      logger.info(green(`\n${output}`));
    } else {
      logger.error(red(`No --source or --target flag is given, cannot count`));
    }
  } catch (e) {
    logger.error(red((e as Error).message));
  }
}
