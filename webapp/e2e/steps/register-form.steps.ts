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
      await expect(page).toMatch('Regístrate')
      await expect(page).toFillForm('form[name="register"]', {
        textName: username,
        textEmail: email,
        textPassword: password,
        textRepeatPassword: confirmPass
      })
      await expect(page).toClick('button', { text: 'Sign up' })
    });

    then('A confirmation message should be shown in the screen', async () => {
      await expect(page).toMatch('Welcome, ' + username)
    });
  })

  test('The user is already registered in the site', ({ given, when, then }) => {

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
      await expect(page).toMatch('Sign up in DeDesktop')
      await expect(page).toFillForm('form[name="register"]', {
        textName: username,
        textEmail: email,
        textPassword: password,
        textRepeatPassword: confirmPass
      })
      await expect(page).toClick('button', { text: 'Sign up' })
    });

    then('An error message should be shown in the screen', async () => {
      await expect(page).toMatch('Error')
    });
  })

  test('The user tries to go to login page via link', ({ given, when, then }) => {

    when('I click the go to login button', async () => {
      await expect(page).toMatch('Sign up in DeDesktop')
      await expect(page).toClick('button', { text: '¿Have an account already? Log in' })
    });

    then('Login page should be displayed', async () => {
      await expect(page).toMatch('Sign up in DeDesktop')
    });
  })

  afterAll(async () => {
    browser.close()
  })

  afterAll(async ()=>{
    browser.close()
  })

});