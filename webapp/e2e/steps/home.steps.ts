import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/register-form.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    beforeEach(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            : await puppeteer.launch({ headless: true });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000/", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('User tries to go to catalog', ({ when, then }) => {

        when('User clicks on go to catalog link at home', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
            await expect(page).toClick('button', { text: 'See all our product in our catalog' })
        });

        then('Catalog page is displayed', async () => {
            await expect(page).toMatch('Reset selection')
        });
    })

    test('User tries to go to sign up', ({ when, then }) => {

        when('User clicks on go to sign up link at home', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
            await expect(page).toClick('button', { text: 'Don\'t have an account? Register' })
        });

        then('Sign up page is displayed', async () => {
            await expect(page).toMatch('Sign up in DeDesktop')
        });
    })

    test('User tries to go to log in', ({ when, then }) => {

        when('User clicks on go to log in link at home', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
            await expect(page).toClick('button', { text: 'Already have an account? Login' })
        });

        then('Log in page is displayed', async () => {
            await expect(page).toMatch('Log in DeDesktop')
        });
    })

    afterEach(async () => {
        browser.close()
    })

});