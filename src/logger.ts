import { createConsola } from 'consola';

export const logger = createConsola({
  level: 4,
  // timestampFormat: 'YYYY-MM-DD HH:mm:ss',
  reporters: [
    {
      log(logObj) {
        const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        const message = logObj.args.join(' ');
        console.log(`[${timestamp}] ${logObj.type}: ${message}`);
      },
    },
  ],
});
