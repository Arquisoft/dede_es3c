import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
            ? await puppeteer.launch()
            //: await puppeteer.launch({ headless: true });
            : await puppeteer.launch({ headless: false, slowMo: 0, args: ["--window-size=1300,2000"] });
        page = await browser.newPage();

        await page
            .goto("http://localhost:3000/catalog", {
                waitUntil: "networkidle0",
            })
            .catch(() => { });
    });

    test('User opens cart', ({ given, when, then }) => {

        let usernameTest: string;
        let passwordTest: string;

        given('A registered client user', () => {
            usernameTest = "Wardell Stephen Curry II"
            passwordTest = "123456"

        });

        when('Clicks on cart button', async () => {

            await expect(page).toClick('a', { text: 'Logout' })

            await expect(page).toMatch('Reset filters')


            await expect(page).toClick('button', { text: 'Cart' })
        });

        then('Cart is displayed', async () => {
            await expect(page).toMatch('Your shopping cart')
            await expect(page).toMatch('No items in cart')
        });
    })

    test('User tries to add to cart an item from catalog', ({ when, then }) => {

        when('User selects and amount of a product and clicks in add to cart button', async () => {
            await expect(page).toClick('button', { text: 'Catalog' })
            await expect(page).toClick("button[key='0']")
            await expect(page).toClick('button', { text: '1' })
            await expect(page).toClick("button[aria-label='add to cartPdocuto prueba']")
            await expect(page).toClick('button', { text: 'Cart' })
        });

        then('Item is added to cart', async () => {
            await expect(page).toMatch('1')
        });
    })

    test('User tries to add more of an item in cart from catalog', ({ when, then }) => {

        when('User selects and amount of a product and clicks in add to cart button', async () => {
            await expect(page).toClick('button', { text: 'Catalog' })
            await expect(page).toClick("button[key='0']")
            await expect(page).toClick('button', { text: '5' })
            await expect(page).toClick("button[aria-label='add to cartPdocuto prueba']")
            await expect(page).toClick('button', { text: 'Cart' })
        });

        then('Item is added to cart', async () => {
            await expect(page).toMatch('6')
        });
    })

    test('User tries to add more of an item in cart from catalog but there isn\'t enough stock', ({ when, then }) => {

        when('User selects and amount of a product and clicks in add to cart button', async () => {
            await expect(page).toClick('button', { text: 'Catalog' })
            await expect(page).toClick("button[aria-label='add to cartProducto prueba']")
        });

        then('An error message is displayed', async () => {
            await expect(page).toMatch('Error')
            await expect(page).toClick('button', { text: 'OK' })
        });
    })

    test('User tries to add a unit of a product in cart from cart but there isn\'t enough stock', ({ when, then }) => {

        when('User clicks on + button in cart', async () => {
            await expect(page).toClick('button', { text: 'Cart' })
            await expect(page).toClick('button', { text: '+' })
        });

        then('An error message is displayed', async () => {
            await expect(page).toMatch('Error')
            await expect(page).toClick('button', { text: 'OK' })
            await expect(page).toClick('button', { text: 'OK' })
        });
    })

    test('User tries to remove an unit of an item in cart from cart', ({ when, then }) => {

        when('User clicks on - button in cart', async () => {
            await expect(page).toClick('button', { text: 'Cart' })
            await expect(page).toClick('button', { text: '-' })
        });

        then('Item amount is reduced in one unit', async () => {
            await expect(page).toMatch('5')
        });
    })

    test('User tries to add a unit of an item in cart from cart', ({ when, then }) => {

        when('User clicks on + button in cart', async () => {
            await expect(page).toClick('button', { text: '+' })
        });

        then('Item amount is increased in one unit', async () => {
            await expect(page).toMatch('6')
        });
    })

    test('User tries to go to shipping page', ({ when, then }) => {

        when('User clicks proceed to checkout button with items in cart', async () => {
            await expect(page).toClick('button', { text: 'Proceed to checkout' })
        });

        then('Shipping page is displayed', async () => {
            await expect(page).toMatch('Selected Products')
        });
    })

    afterAll(async () => {
        browser.close()
    })

});
