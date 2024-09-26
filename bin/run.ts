import { config } from 'dotenv';
import { bgBlue } from 'picocolors';
import yargs, { CommandModule } from 'yargs';

import { commands } from '../src';

config();

const run = yargs(process.argv.slice(2));
run.usage(
  bgBlue(
    `Welcome to Pici!
    See more on https://github.com/raxetul/pici`,
  ),
);
for (const command of commands) {
  run.command(command as CommandModule);
}

void run.demandCommand(1, 'You need at least one command before moving on').help().parse();
