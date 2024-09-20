import { logger } from "@/logger";
import { green, red, white } from "picocolors";

export function getTimestampFileName(dbName: string) {
  let date = new Date().toISOString().replace('T','---').replaceAll(':','-');
  const fileName = `${dbName}-${date}.dump`;
  return fileName;
}

export function infoErrorCallback(error: { message: any; }, stdout: any, stderr: any) {
  if (error) {
    logger.error(red(`ERROR => ${error.message}`));
    return;
  }
  if (stderr) {
   logger.error(red(`ERROR => STD ${stderr}`));
    return;
  }
  if (stdout) {
    logger.log(white(`${stdout.message}`));
   }
  logger.log(green(`Operation completed successfully.`));
}

export function getToQueryCommand(toDbName: string, query: string) {
  return `psql -d postgresql://${process.env.TO_USER}:${process.env.TO_PASS}@${process.env.TO_SERVER}:${process.env.TO_PORT}/${toDbName} -c "${query}"`;
}

export function getFromQueryCommand(fromDbName: string, query: string) {
  return `psql -d postgresql://${process.env.FROM_USER}:${process.env.FROM_PASS}@${process.env.FROM_SERVER}:${process.env.FROM_PORT}/${fromDbName} -c "${query}"`;
}

export function getDumpCommand(fromDbName: string, fileName: string) {
  return `pg_dump --no-owner --no-privileges -d postgresql://${process.env.FROM_USER}:${process.env.FROM_PASS}@${process.env.FROM_SERVER}:${process.env.FROM_PORT}/${fromDbName} > ${fileName}`;
}

export function getRestoreCommand(toDbName: string, fileName: string) {
  const command = `psql -d postgresql://${process.env.TO_USER}:${process.env.TO_PASS}@${process.env.TO_SERVER}:${process.env.TO_PORT}/${toDbName} < ${fileName}`;
  return command;
}
