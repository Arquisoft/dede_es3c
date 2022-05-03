import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/home.feature');

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
            await expect(page).toMatch('Check our products')
            await expect(page).toClick('button', { text: 'Catalog' })
        });

        then('Catalog page is displayed', async () => {
            await page.waitForNavigation();
            await expect(page).toMatch('Reset filters')
        });
    })

    afterEach(async () => {
        browser.close()
    })

});