import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/logout.feature');

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

    test('The user is loged in the site and click to logout', ({ given, when, then }) => {
        let usernameTest: string;
        let passwordTest: string;

        given('An existing user', () => {
            usernameTest = "Wardell Stephen Curry II"
            passwordTest = "123456"
        });

        when('Click de logout button once logged', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[id="loginForm"]', {
                username: usernameTest,
                password: passwordTest,
            })
            await expect(page).toClick('a[href="/login"]')
            await page.waitForNavigation();

        });

        then('User is redirected to login page', async () => {
            await expect(page).toMatch('Log in DeDesktop')
        });
    })

    afterEach(async () => {
        browser.close()
    })

});