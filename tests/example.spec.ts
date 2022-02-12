import { test, expect } from '@playwright/test';

test('Example.com open page', async ({ page }) => {
	await page.goto('https://example.com/');
	const pageTitle = await page.locator('h1:visible');
	await expect(pageTitle).toContainText('Example Domain');
});

test('Example.com asserts', async ({ page }) => {
	await page.goto('https://example.com/');
	const pageTitle = await page.locator('h1:visible');
	await expect(pageTitle).toContainText('Example Domain');
});
