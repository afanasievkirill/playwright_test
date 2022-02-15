import test, { expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel('Transfer funds and Make Payments', () => {
	let loginPage: LoginPage;
	let homePage: HomePage;
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		homePage = new HomePage(page);
		await homePage.visit();
		await homePage.signIn();
		await loginPage.login('username', 'password');
	});

	test('Transfer funds', async ({ page }) => {
		await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
		await page.click('#transfer_funds_tab a:visible');
		await page.selectOption('#tf_fromAccountId', '2');
		await page.selectOption('#tf_toAccountId', '3');
		await page.type('#tf_amount', '500');
		await page.type('#tf_description', 'Test message');
		await page.click('#btn_submit');

		const boardHeader = page.locator('h2.board-header');
		expect(boardHeader).toHaveText('Transfer Money & Make Payments - Verify');

		await page.click('#btn_submit');

		const successAllert = page.locator('div[class="alert alert-success"]:visible');
		await expect(successAllert).toHaveText('You successfully submitted your transaction.');
	});
});
