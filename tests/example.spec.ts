import { test, expect } from '@playwright/test';

test('Open page', async ({ page }) => {
	await page.goto('https://example.com/');
	const pageTitle = await page.locator('h1');
	await expect(pageTitle).toContainText('Example Domain');
});

test('Click on element', async ({ page }) => {
	await page.goto('http://zero.webappsecurity.com/');
	await page.click('#signin_button');
	await page.click('text=Sign in');
	const errorMessage = await page.locator('div[class="alert alert-error"]');
	await expect(errorMessage).toContainText('Login and/or password are wrong.');
});
