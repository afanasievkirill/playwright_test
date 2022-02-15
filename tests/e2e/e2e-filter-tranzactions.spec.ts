import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel('Filter tranzactions', () => {
	let homePage: HomePage;
	let loginPage: LoginPage;

	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		homePage = new HomePage(page);
		await homePage.visit();
		await homePage.signIn();
		await loginPage.login('username', 'password');
		await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
		await page.click('#account_activity_tab:visible');
	});

	test('Verify savings', async ({ page }) => {
		await page.selectOption('#aa_accountId:visible', '1');
		const table = page.locator('.table-condensed tbody tr:visible');
		await expect(table).toHaveCount(3);
	});

	test('Verify cheking', async ({ page }) => {
		await page.selectOption('#aa_accountId:visible', '2');
		const table = page.locator('.table-condensed tbody tr:visible');
		await expect(table).toHaveCount(3);
	});

	test('Verify loan', async ({ page }) => {
		await page.selectOption('#aa_accountId:visible', '4');
		const table = page.locator('.table-condensed tbody tr:visible');
		await expect(table).toHaveCount(2);
	});

	test('Verify credit card', async ({ page }) => {
		await page.selectOption('#aa_accountId:visible', '5');
		const table = page.locator('.well:visible');
		await expect(table).toContainText('No results.');
	});

	test('Verify brokerage', async ({ page }) => {
		await page.selectOption('#aa_accountId:visible', '6');
		const table = page.locator('.well:visible');
		await expect(table).toContainText('No results.');
	});
});
