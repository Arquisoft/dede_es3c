import request, {Response} from 'supertest';
import express, { Application } from 'express';
import * as http from 'http';
import bp from 'body-parser';
import cors from 'cors';
import api from '../src/Api';
import database from "../src/persistence/Database";

let app:Application;
let server:http.Server;

beforeAll(async () => {
    app = express();
    const port: number = 5000;
    const options: cors.CorsOptions = {
        origin: ['http://localhost:3000']
    };
    const setDB = async (): Promise<boolean> => { 
        const databaseName: string ='test';
        if ( await database.setDB(databaseName) ) {
            console.log(`Database connection established to ${databaseName}`);
            app.set('db', database.getDB());
            return true;
        } else {
            console.log(`Error on database connection to ${databaseName}`);
            return false;
        }
    };    
    app.use(cors(options));
    app.use(bp.json());
    await setDB();
    app.use("/api", api)

    server = app.listen(port, ():void => {
        console.log('Restapi server for testing listening on '+ port);
    }).on("error",(error:Error)=>{
        console.error('Error occured: ' + error.message);
    });
});

afterAll(async () => {
    server.close() //close the server
})


describe("products", () => {
    /**
     * Test that we can list products without any error.
     */
    it("can be listed", async () => {
      const response: Response = await request(app).get("/api/products");
      console.log(response.text);
      expect(response.statusCode).toBe(200);
    });
  
  });
  