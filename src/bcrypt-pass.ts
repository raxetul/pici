#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config()

import yargs from'yargs';
import bcrypt from 'bcrypt';

yargs.
command('hash <password>', 'Hash given password', (yargs) => {
  yargs.positional('password', {
    describe: 'URL to fetch content from',
    type: 'string',
    default: 'my-top-secret-pass'
  }).option('iteration', {
    type: 'number',
    description: 'Name of the database take the dump from',
    default: 12
  });
}, async (argv) => {
  const password = argv.password.toString();
  const iteration = Number(argv.iteration);
  console.log(argv);
  
  console.log(password);
  console.log(iteration);
  
  
  const hashedPassword = await bcrypt.hash(password, iteration);
  console.log('Bcrypt hashed password =============');
  console.log(hashedPassword);
  console.log('====================================');

})
.help()
.epilogue('This command uses .env file in your directory. Set and DOUBLE CHECK variables in your env file.')
.argv;
