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
            .goto("http://localhost:3000/login", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('Logged client user is at catalog page and tries to go to home', ({ given, when, then }) => {

        let username: string;
        let password: string;

        given('A valid client user', () => {
            username = "testUser"
            password = "testPass"

        });

        when('User clicks in home header option', async () => {
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[name="login"]', {
                textName: username,
                textPassword: password,
            })
            await expect(page).toClick('button', { text: 'Log in' })
            await expect(page).toMatch('Welcome, ' + username)
            await expect(page).toClick('button', { text: 'OK' })
            await expect(page).toMatch('Reset selection')
            await expect(page).toClick('button', { text: 'Home' })
        });

        then('User goes to home page', async () => {
            await expect(page).toMatch('DeDesktop is the result of the effort and dedication')
        });
    })

    test('Logged client user is at home and tries to go to catalog', ({ when, then }) => {

        when('User clicks in catalog header option', async () => {
            await expect(page).toClick('button', { text: 'Catalog' })
        });

        then('User goes to catalog page', async () => {
            await expect(page).toMatch('Reset selection')
        });
    })

    test('Logged client user is at catalog page and tries to go to my orders page', ({ when, then }) => {

        when('User clicks in my orders header option', async () => {
            await expect(page).toClick('button', { text: 'My orders' })
        });

        then('User goes to catalog my orders page', async () => {
            await expect(page).toMatch('Preview')
        });
    })

    test('Logged client user is at my orders page and tries to go to my account page', ({ when, then }) => {

        when('User clicks in my account header option', async () => {
            await expect(page).toClick('button', { text: 'My account' })
        });

        then('User goes to my account page', async () => {
            await expect(page).toMatch('Personal Data')
        });
    })

    test('Logged admin user is at home and tries to go to add product page', ({ given, when, then }) => {

        let username: string;
        let password: string;

        given('A valid admin user', () => {
            username = "adminTestUser"
            password = "adminTestPass"
        });

        when('User clicks in add product header option', async () => {
            await expect(page).toClick('button', { text: 'Logout' })
            await expect(page).toMatch('Log in DeDesktop')
            await expect(page).toFillForm('form[name="login"]', {
                textName: username,
                textPassword: password,
            })
            await expect(page).toClick('button', { text: 'Log in' })
            await expect(page).toMatch('Welcome, ' + username)
            await expect(page).toClick('button', { text: 'OK' })
            await expect(page).toMatch('Reset selection')
            await expect(page).toClick('button', { text: 'Edit products' })
            await expect(page).toMatch('Add product')
            await expect(page).toClick('button', { text: 'Add product' })
        });

        then('User goes to add product page', async () => {
            await expect(page).toMatch('Add product')
        });
    })

    test('Logged admin user is at add product and tries to go to edit product page', ({ when, then }) => {

        when('User clicks in add product header option', async () => {
            await expect(page).toClick('button', { text: 'Edit products' })
            await expect(page).toClick('button', { text: 'Update product' })
        });

        then('User goes to add product page', async () => {
            await expect(page).toMatch('Update product')
        });
    })

    test('Logged admin user is at edit product and tries to go to delete product page', ({ when, then }) => {

        when('User clicks in delete product header option', async () => {
            await expect(page).toClick('button', { text: 'Edit products' })
            await expect(page).toClick('button', { text: 'Delete product' })
        });

        then('User goes to delete product page', async () => {
            await expect(page).toMatch('Delete product')
        });
    })

    test('Logged admin user is at delete product and tries to go to users page', ({ when, then }) => {

        when('User clicks in users header option', async () => {
            await expect(page).toClick('button', { text: 'Users' })
        });

        then('User goes to delete users page', async () => {
            await expect(page).toMatch('DeDesktop\'s registered clients')
        });
    })

    afterAll(async () => {
        browser.close()
    })

});