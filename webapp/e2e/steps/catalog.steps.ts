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
            .goto("http://localhost:3000/catalog", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('User clicks on item to open its details view', ({ when, then }) => {

        when('When User clicks on item', async () => {
            await expect(page).toMatch('Reset selection')
            await expect(page).toClick('link[key=Producto prueba]')
        });

        then('Then Detail view of that item displays', async () => {
            await expect(page).toMatch('Related products:')
        });
    })

    afterAll(async () => {
        browser.close()
    })

});