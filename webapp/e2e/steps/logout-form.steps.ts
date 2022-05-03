import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/logout-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    beforeAll(async () => {
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

    test('The user is loged in the site and click to logout', ({ given, when, then }) => {

        let username: string;
        let password: string;

        given('An existing user', () => {
            username = "testUser"
            password = "testPass"

        });

        when('Click de logout button', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[name="login"]', {
                textName: username,
                textPassword: password,
            })
            await expect(page).toClick('button', { text: 'Log in' })
            await expect(page).toMatch('Reset selection')
            await expect(page).toClick('button', { text: 'Logout' })
        });

        then('User is redirected to login page', async () => {
            await expect(page).toMatch('Log in DeDesktop')
        });
    })

    afterAll(async () => {
        browser.close()
    })

});
