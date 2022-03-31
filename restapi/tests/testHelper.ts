import {Connection, createConnection } from 'typeorm';
import database from "../src/persistence/Database";
import express, { Application, RequestHandler } from "express";

export class TestHelper {

    private static _instance: TestHelper;

    private constructor() {}

    public static get instance(): TestHelper {
        if(!this._instance) this._instance = new TestHelper();

        return this._instance;
    }

    private dbConnect!: Connection;
    private testdb!: any;
    private app: Application = express(); // Express application

    async setupTestDB() {
        const databaseName: string = process.env.DATABASE_NAME || 'default';
        if ( await database.setDB(databaseName) ) {
            console.log(`Database connection established to ${databaseName}`);
            await database.getDB().synchronize();
            this.app.set('db', database.getDB());
            return true;
        } else {
            console.log(`Error on database connection to ${databaseName}`);
            return false;
        }
    }

    teardownTestDB() {
        this.dbConnect.close();
        this.testdb.close();
    }

}