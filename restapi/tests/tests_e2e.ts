/**
 * REST API Server with Express
 * @author: Sergio Arroni del Reigo - UO276341
 */
 import express, { Application, RequestHandler } from "express";
 import * as dotenv from "dotenv";
 import "reflect-metadata";
 import bp from 'body-parser';
 import promBundle from 'express-prom-bundle';
 import api from "../src/Api";
 import database from "../src/persistence/Database";
import cors from "cors";

 // =================================> Constants
 const PORT = Number.parseInt(`${process.env.PORT}`) || 5000; // Port to listen, default 5000
 const app: Application = express(); // Express application
 
 app.disable("x-powered-by");
 const cors_options: cors.CorsOptions = {
     origin: ['http://localhost:3000']
 };
 app.use(cors(cors_options));

 const metricsMiddleware:RequestHandler = promBundle({includeMethod: true}); // Prometheus middleware
 
 // =================================> Functions
 
 /**
  * Set Database connection
  */
 const setDB = async (): Promise<boolean> => { 
     const databaseName: string = process.env.DATABASE_NAME || 'test_e2e';
     if ( await database.setDB(databaseName) ) {
         console.log(`Database connection established to ${databaseName}`);
         await database.getDB().synchronize();
         app.set('db', database.getDB());
         return true;
     } else {
         console.log(`Error on database connection to ${databaseName}`);
         return false;
     }
 };
     
 
 /**
  * Set configuration services for express App
  */
 const setConfig = (): void => {
     dotenv.config(); // Set environment variables
     app.use(cors(cors_options)); // Enable CORS
     app.use(bp.json()); // Enable JSON body parser
 };
 
 /**
  * Set Middlewares for express App
  */
 const setMiddlewares = (): void => {
     app.use(metricsMiddleware); // Enable Prometheus middleware
 };
 
 /**
  * Set Routes for express App
  */
 const setRoutes = (): void => {
     app.use("/api", api); // Set API routes
 };
 
 // =================================> Main
 setConfig();
 setDB().then( (result: boolean) => {
     if (result) {
         setMiddlewares();
         setRoutes();
         // =================================> App Start Listener
         app.listen(PORT, (): void => {
             console.log(`API REST listening on port ${PORT}`);
         }).on("error" ,(error:Error )=> {
             console.error(`Error occurred: ${error.message}`);
         });
     }
 });
