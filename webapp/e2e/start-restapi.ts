import express, { Application } from "express";
import * as http from "http";
import bp from "body-parser";
import api from "../../restapi/src/Api";
import database from "../../restapi/src/persistence/Database";
import cors from "cors";

let app: Application;
let server: http.Server;
module.exports = async () => {
  app = express();
  const port: number = 5000;
  const options: cors.CorsOptions = {
    origin: ["http://localhost:3000"],
  };
  const setDB = async (): Promise<boolean> => {
    const databaseName: string = "test";
    if (await database.setDB(databaseName)) {
      console.log(`Database connection established to ${databaseName}`);
      app.set("db", database.getDB());
      return true;
    } else {
      console.log(`Error on database connection to ${databaseName}`);
      return false;
    }
  };
  app.use(cors(options));
  app.use(bp.json());
  await setDB();
  app.use("/api", api);

  server = app
    .listen(port, (): void => {
      console.log("Restapi server for testing listening on " + port);
    })
    .on("error", (error: Error) => {
      console.error("Error occured: " + error.message);
    });
}
