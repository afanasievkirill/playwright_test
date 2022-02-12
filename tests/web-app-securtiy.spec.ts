import { test, expect } from '@playwright/test';

test('Web app invalid login.', async ({ page }) => {
	await page.goto('http://zero.webappsecurity.com/');
	await page.click('#signin_button:visible');
	await page.click('input[value="Sign in"]:visible');
	const errorMessage = await page.locator('div[class="alert alert-error"]:visible');
	await expect(errorMessage).toContainText('Login and/or password are wrong.');
});

test('Web app invalid login with input data.', async ({ page }) => {
	await page.goto('http://zero.webappsecurity.com/');
	await page.click('#signin_button:visible');
	await page.type('#user_login', 'test name');
	await page.type('#user_password', 'test password');
	await page.click('input[value="Sign in"]:visible');
	const errorMessage = await page.locator('div[class="alert alert-error"]:visible');
	await expect(errorMessage).toContainText('Login and/or password are wrong.');
});
