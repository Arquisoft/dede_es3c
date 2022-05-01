import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
   //   : await puppeteer.launch({ headless: true });
      : await puppeteer.launch({ headless: false , slowMo: 0});
    page = await browser.newPage();
    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let email: string;
    let username: string;
    let password: string;
    let confirmPass: string;

    given('An unregistered user', () => {
      username = "testuser"
      email = "testuser@test.com"
      password = "testpass"
      confirmPass = "testpass"
      
    });

    when('I fill the data in the form and press sign up', async () => {
      function timeout(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      await timeout(1);
      await expect(page).toMatchElement('a', { text: 'Logout' })
      await expect(page).toClick('a', { text: 'Logout' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatchElement('h1', { text: 'Log in' })
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});