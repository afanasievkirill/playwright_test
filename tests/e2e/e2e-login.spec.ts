import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

test.describe.parallel('Login Logout flow', () => {
	let loginPage: LoginPage;
	let homePage: HomePage;
	test.beforeEach(async ({ page }) => {
		loginPage = new LoginPage(page);
		homePage = new HomePage(page);
		await homePage.visit();
	});

	test('Negative scenario for login', async ({ page }) => {
		await homePage.signIn();
		await loginPage.login('test_user', 'test_password');
		await loginPage.assertErrorMessage();
	});

	test('Positive scenario for login', async ({ page }) => {
		await homePage.signIn();
		await loginPage.login('username', 'password');

		await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
		const accountSummary = await page.locator('#account_summary_tab');
		await expect(accountSummary).toBeVisible();

		await page.goto('http://zero.webappsecurity.com/logout.html');
		await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html');
	});
});
