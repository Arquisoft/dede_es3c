import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
   //   : await puppeteer.launch({ headless: true });
      : await puppeteer.launch({ headless: false , slowMo: 300,
        args: [ "--window-size=1366,768" ] });
    page = await browser.newPage();
    await page
      .goto("http://localhost:3000/signup", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  afterEach(() => {
    browser.close();
  });

  test('The user can Logout', ({given,when,then}) => {

    given('Nothing', () => {
    });

    when('I fill the data in the form and press sign up', async () => {
      function timeout(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      await expect(page).toMatchElement('a', { text: 'Logout' })
      await expect(page).toClick('a', { text: 'Logout' })

    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatchElement('h1', { text: 'Log in DeDesktop' })
    });
  });
  test('Register user on the website', ({ given, when, then }) => {

    let email: string;
    let username: string;
    let password: string;
    let confirmPass: string;

    given('A registered user', () => {
      username = "testuser"
      email = "testuser@test.com"
      password = "testpass"
      confirmPass = "testpass"
    });

    when('I fill the data in the form and press sign up', async () => {
      function timeout(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

      await expect(page).toClick('a', { text: 'Register' })

      await expect(page).toFillForm('form[name="register"]', {
        textName: username,
        textEmail: email,
        textPassword: password,
        textRepeatPassword: confirmPass
      })
      await expect(page).toClick('button', { text: 'Sign up' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatch('Error')
    });
  });

  afterAll(async () => {
    browser.close()
  });

});