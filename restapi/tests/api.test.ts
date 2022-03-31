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

});

afterAll(async () => {
    server.close() //close the server
})

describe('user ', () => {
    /**
     * Tests that a user can be created
     */
     it('can be created correctly', async () => {
        const user = {
            username: "Sergio",
            email: "sergiotest@gmail.com"
        }
        const response:Response = await request(app).post('/api/users').send(user).set('Accept', 'application/json')
        expect(response.statusCode).toBe(201);
    });

    /**
     * Test that we can list users without any error.
     */
    it('can be listed',async () => {
        const response:Response = await request(app).get("/api/users");
        expect(response.statusCode).toBe(200);
    });

});