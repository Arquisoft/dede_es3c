import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/login-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    beforeEach(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000/login", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('An existing user tries to log in the app', ({ given, when, then }) => {
        let usernameTest: string;
        let passwordTest: string;

        given('An existing user', () => {
            usernameTest = "Wardell Stephen Curry II"
            passwordTest = "123456"

        });

        when('Fill the form and click log in button', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[id="loginForm"]', {
                username: usernameTest,
                password: passwordTest,
            })
            await expect(page).toClick('button', { text: 'Log in' })
        });

        then('Welcome message is shown and is redirected to catalog page', async () => {
            await expect(page).toMatch('DeDesktop')
        });
    })

    test('Non existing user tries to log in the app', ({ given, when, then }) => {

        let usernameTest: string;
        let passwordTest: string;

        given('A non existing user', () => {
            usernameTest = "nonValidUser"
            passwordTest = "nonValidPass"

        });

        when('Fill the form and click log in', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[id="loginForm"]', {
                username: usernameTest,
                password: passwordTest,
            })
            await expect(page).toClick('button', { text: 'Log in' })
        });

        then('Error message should be displayed', async () => {
            await expect(page).toMatch('Error')
        });
    })

    test('Existing user tries to login without filling name', ({ given, when, then }) => {

        let passwordTest: string;

        given('An existing password', () => {
            passwordTest = "testPass"

        });

        when('Fill password field and click log in button', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[id="loginForm"]', {
                password: passwordTest,
            })
            await expect(page).toClick('button', { text: 'Log in' })
        });

        then('Error mesage should be displayed', async () => {
            await expect(page).toMatch('Error')
        });
    })

    test('Existing user tries to login without filling password', ({ given, when, then }) => {

        let usernameTest: string;

        given('An existing username', () => {
            usernameTest = "testUser"

        });

        when('Fill username field and click log in button', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[id="loginForm"]', {
                username: usernameTest,
            })
            await expect(page).toClick('button', { text: 'Log in' })
        });

        then('Error message should be displayed', async () => {
            await expect(page).toMatch('Error')
        });
    })

    test('User tries to go to sign up page via link', ({ when, then }) => {

        when('User clicks in go to register link', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toClick('a', { text: "Don't have an account? Sign Up" })
        });

        then('Signup page should be displayed', async () => {
            await expect(page).toMatch('Sign up in DeDesktop')
        });
    })

    afterEach(async () => {
        browser.close()
    })

});
