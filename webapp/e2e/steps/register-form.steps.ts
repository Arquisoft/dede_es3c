import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

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
    
    let username:string;
    let password: string;

    given('An unregistered user', () => {
      username = "newuser",
      password = "12345"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toClick('button', { text: 'Login' })

      await expect(page).toMatch('Log in DeDesktop')
      await expect(page).toFillForm('form[name="loginForm"]', {
        username: username,
        password: password
      })
      await expect(page).toClick('button', { text: 'Log in' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatch('Incorrect user or password')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});

