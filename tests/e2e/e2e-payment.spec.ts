import test, { expect } from '@playwright/test';
import { Navbar } from '../../pages/components/Navbar';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel.only('New payment', () => {
	let homePage: HomePage;
	let loginPage: LoginPage;
	let navbar: Navbar;
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		homePage = new HomePage(page);
		navbar = new Navbar(page);
		await homePage.visit();
		await homePage.signIn();
		await loginPage.login('username', 'password');
		await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
		await navbar.clickOnNavbar('Transfer Funds');
	});

	test('Sprint payes saving acc', async ({ page }) => {
		await page.selectOption('#sp_payee', 'sprint');
		await page.selectOption('#sp_account', '1');
		await page.type('#sp_amount', '1');
		await page.type('#sp_date', '2030-12-12');
		await page.type('#sp_description', 'test description data.');
		await page.click('#pay_saved_payees');
		const allertSuccess = page.locator('#alert_content');
		await expect(allertSuccess).toHaveText('The payment was successfully submitted.');
	});
});
