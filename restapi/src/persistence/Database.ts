/**
 * Database Manager class
 * @author: Sergio Arroni del Reigo - UO276341
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

        const { MongoClient, ServerApiVersion } = require('mongodb');
        const uri = "mongodb+srv://<username>:<password>@cluster0.hhkbe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {
          const collection = client.db("test").collection("devices");
          // perform actions on the collection object
          client.close();
        });
        
        /** 
         let result = false;
         try {
             let options = await getConnectionOptions(databaseName);
             this.db = await createConnection(options);
             //this.db.synchronize();
             result = true;
         } catch (error) {
             console.log(`Error on create connection: ${error.message}`);
         } finally {
             return result;
         }
         */
     }
 }
 
 export default new Database();