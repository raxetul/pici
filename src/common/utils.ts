export function getTimestampFileName(dbName: string): string {
  const date = new Date().toISOString().replace('T','---').replaceAll(':','-');
  const fileName = `${dbName}-${date}.dump`;
  return fileName;
}

// export function infoErrorCallback(error: { message: string; }, stdout: string, stderr: string): void {
//   if (error) {
//     logger.error(red(`ERROR => ${error.message}`));
//     return;
//   }
//   if (stderr) {
//     logger.error(red(`ERROR => STD ${stderr}`));
//     return;
//   }
//   if (stdout) {
//     logger.log(white(`${stdout.message}`));
//   }
//   logger.log(green(`Operation completed successfully.`));
// }

export function getToQueryCommand(targetDbName: string, query: string): string {
  return `psql -d postgresql://${process.env.TARGET_USER}:${process.env.TARGET_PASS}@${process.env.TARGET_SERVER}:${process.env.TARGET_PORT}/${targetDbName} -c "${query}"`;
}

export function getFromQueryCommand(sourceDbName: string, query: string): string {
  return `psql -d postgresql://${process.env.SOURCE_USER}:${process.env.SOURCE_PASS}@${process.env.SOURCE_SERVER}:${process.env.SOURCE_PORT}/${sourceDbName} -c "${query}"`;
}

export function getDumpCommand(sourceDbName: string, fileName: string): string {
  return `pg_dump --no-owner --no-privileges -d postgresql://${process.env.SOURCE_USER}:${process.env.SOURCE_PASS}@${process.env.SOURCE_SERVER}:${process.env.SOURCE_PORT}/${sourceDbName} > ${fileName}`;
}

export function getRestoreCommand(targetDbName: string, fileName: string): string {
  const command = `psql -d postgresql://${process.env.TARGET_USER}:${process.env.TARGET_PASS}@${process.env.TARGET_SERVER}:${process.env.TARGET_PORT}/${targetDbName} < ${fileName}`;
  return command;
}
