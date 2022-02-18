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
		await homePage.signIn();
	});

	test('Check login form', async ({ page }) => {
		await loginPage.loginFormSnapshot();
	});
});
