import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/change-language.feature');

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

    test('Page is in english and user tries to change it to spanish', ({ when, then }) => {

        when('User clicks in language option and selects spanish', async () => {

            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toClick('a[id="idioma-dropdown"]');
            await expect(page).toClick('button', { text: 'Español' })
        });

        then('Page texts change to spanish', async () => {
            await expect(page).toMatch('Iniciar sesión en DeDesktop')
        });
    })

    test('Page is in spanish and user tries to change it to spanish', ({ when, then }) => {

        when('User clicks in language option and selects spanish', async () => {
            await expect(page).toMatch('Iniciar sesión en DeDesktop')
            await expect(page).toClick('a[id="idioma-dropdown"]');
            await expect(page).toClick('button', { text: 'Español' })
        });

        then('Page remains the same', async () => {
            await expect(page).toMatch('Iniciar sesión en DeDesktop')
        });
    })

    test('Page is in spanish and user tries to change it to english', ({ when, then }) => {

        when('User clicks in language option and selects english', async () => {
            await expect(page).toMatch('Iniciar sesión en DeDesktop')
            await expect(page).toClick('a[id="idioma-dropdown"]');
            await expect(page).toClick('button', { text: 'English' })
        });

        then('Page texts change to english', async () => {
            await expect(page).toMatch('Log in DeDesktop')
        });
    })

    test('Page is in english and user tries to change it to english', ({ when, then }) => {

        when('User clicks in language option and selects english', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toClick('a[id="idioma-dropdown"]');
            await expect(page).toClick('button', { text: 'English' })
        });

        then('Page texts change to english', async () => {
            await expect(page).toMatch('Log in DeDesktop')
        });
    })

    afterAll(async () => {
        browser.close()
    })

});
