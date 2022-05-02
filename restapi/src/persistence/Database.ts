/**
 * Database Manager class
 * @author: Sergio Arroni del Riego - UO276341
 */
 import { createConnection, getConnectionOptions, Connection } from "typeorm";

 class Database {
 
     private db!: Connection;

     /**
      * Get connection to database
      * @returns Connection
      */
     public getDB(): Connection{
         return this.db;
     }

     /**
      * Connect to database
      * @param databaseName string
      * @returns Promise<boolean>
      */
     public async setDB(databaseName: string) : Promise<boolean> {
         let result = false;
         try {
             let options = await getConnectionOptions(databaseName);
             this.db = await createConnection(options);
             result = true;
         } catch (error) {
            if (error instanceof Error) {
                console.log(`Error on create connection: ${error.message}`);
              }
         }
         return result;
     }
 }
 
 export default new Database();
