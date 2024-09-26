export function getRenameDBQuery(oldDbName: string, newDbName: string) {
  return `
        DO LANGUAGE plpgsql
        '
        DECLARE
          db_exists BOOLEAN;
        BEGIN
          SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = ''${oldDbName}'') INTO db_exists;
          
          IF db_exists THEN
            PERFORM pg_terminate_backend(pid) 
            FROM pg_stat_activity 
            WHERE datname = ''${oldDbName}'' AND pid <> pg_backend_pid();
            
            EXECUTE ''ALTER DATABASE '' || quote_ident(''${oldDbName}'') || '' RENAME TO '' || quote_ident(''${newDbName}'');
            RAISE LOG ''Renaming executed successfully'';
          ELSE
            RAISE NOTICE ''Database does not exist. No action taken.'';
          END IF;
        END
        ';
    `;
}

export function createDbQuery(dbName: string) {
  return `CREATE DATABASE "${dbName}";`;
}
