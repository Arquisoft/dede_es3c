/**
 * Database Manager class
 * @author: Sergio Arroni del Riego - UO276341
 */
import { createConnection, getConnectionOptions, Connection } from "typeorm";
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

describe('user ', () => {
    /**
     * Tests that a user can be register
     */
     it('can be register correctly', async () => {
        const user = {
            username:"Dios",
            email:"Dios@jaja.com",
            password:"123456",
            rol:"Admin"
        }
        const response:Response = await request(app).post('/api/register').send(user).set('Accept', 'application/json')
        expect(response.statusCode).toBe(200);
    });

    /**
     * Tests that a user can be register with error
     */
     it('can be register correctly', async () => {
        const user = {
            username:"Dios",
            email:"Dios@jaja.com",
            rol:"Admin"
        }
        const response:Response = await request(app).post('/api/register').send(user).set('Accept', 'application/json')
        expect(response.statusCode).toBe(500);
    });

});