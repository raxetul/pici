import yargs, { CommandModule } from 'yargs'
import { config } from 'dotenv'
import { commands } from '../src'
import { bgBlue } from 'picocolors'

config()

const run = yargs(process.argv.slice(2))
run.usage(
  bgBlue(
    `Welcome to Pici!
    See more on https://github.com/raxetul/pici`,
  ),
)
for (const command of commands) {
  run.command(command as CommandModule)
}

run.demandCommand(1, 'You need at least one command before moving on').help().argv
