import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

import express, { Application } from "express";
import * as http from "http";
import bp from "body-parser";
import api from "../../../restapi/src/Api";
import database from "../../../restapi/src/persistence/Database";

let app: Application;
let server: http.Server;

beforeAll(async () => {
  app = express();

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
  app.use(bp.json());
  await setDB();
  app.use("/api", api);

});

afterAll(async () => {
  server.close(); //close the server
});

defineFeature(feature, test => {

  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatch('DeDesktop es el resultado del esfuerzo y dedicación del grupo es3c de la asignatura Arquitectura del Software.')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

