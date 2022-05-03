import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/flow.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            //: await puppeteer.launch({ headless: true });
            : await puppeteer.launch({ headless: false, slowMo: 0 });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000/login", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('Logged client user is at catalog page and tries to go to home', ({ given, when, then }) => {
        let usernameTest: string;
        let passwordTest: string;
        
        given('A valid client user', () => {
            usernameTest = "Wardell Stephen Curry II"
            passwordTest = "123456"
        });

        when('User clicks in home header option', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[id="loginForm"]', {
                username: usernameTest,
                password: passwordTest,
            })
            await expect(page).toClick('button', { text: 'Log in' })
            await expect(page).toClick('button', { text: 'OK' })
            await page.waitForNavigation();
            await expect(page).toClick('a[href="/"]')
        });

        then('User goes to home page', async () => {
            await expect(page).toMatch('Check our products')
        });
    });

    test('Logged client user is at home and tries to go to catalog', ({ when, then }) => {
        when('User clicks in catalog header option', async () => {
            await expect(page).toClick('a[href="/catalog"]')
        });

        then('User goes to catalog page', async () => {
            await expect(page).toMatch('Reset filters')
        });
    });

    afterAll(async () => {
        browser.close()
    })

});
