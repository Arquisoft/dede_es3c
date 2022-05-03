import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/flow.feature');

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
