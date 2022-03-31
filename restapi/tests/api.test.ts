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