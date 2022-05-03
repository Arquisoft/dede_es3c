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
            .goto("http://localhost:3000/", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('Page is in english and user tries to change it to spanish', ({ when, then }) => {

        when('User clicks in language option and selects spanish', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
            await expect(page).toClick('button', { text: 'Language' })
            await expect(page).toMatch('English')
            await expect(page).toClick('button', { text: 'Español' })
        });

        then('Page texts change to spanish', async () => {
            await expect(page).toMatch('DeDesktop es el resultado del esfuerzo y dedicación')
        });
    })

    test('Page is in spanish and user tries to change it to spanish', ({ when, then }) => {

        when('User clicks in language option and selects spanish', async () => {
            await expect(page).toMatch('DeDesktop es el resultado del esfuerzo y dedicación')
            await expect(page).toClick('button', { text: 'Language' })
            await expect(page).toMatch('English')
            await expect(page).toClick('button', { text: 'Español' })
        });

        then('Page remains the same', async () => {
            await expect(page).toMatch('DeDesktop es el resultado del esfuerzo y dedicación')
        });
    })

    test('Page is in spanish and user tries to change it to english', ({ when, then }) => {

        when('User clicks in language option and selects english', async () => {
            await expect(page).toMatch('DeDesktop es el resultado del esfuerzo y dedicación')
            await expect(page).toClick('button', { text: 'Language' })
            await expect(page).toMatch('English')
            await expect(page).toClick('button', { text: 'English' })
        });

        then('Page texts change to english', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
        });
    })

    test('Page is in english and user tries to change it to english', ({ when, then }) => {

        when('User clicks in language option and selects english', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
            await expect(page).toClick('button', { text: 'Language' })
            await expect(page).toMatch('English')
            await expect(page).toClick('button', { text: 'Español' })
        });

        then('Page texts change to english', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
        });
    })

    afterAll(async () => {
        browser.close()
    })

});
