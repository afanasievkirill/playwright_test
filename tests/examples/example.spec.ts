import { test, expect } from '@playwright/test';

test.describe.parallel('Example.com ', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://example.com/');
	});

	test('open home page. @exampleDotCom', async ({ page }) => {
		const pageTitle = page.locator('h1:visible');
		await expect(pageTitle).toContainText('Example Domain');
	});

	test('asserts home page. @exampleDotCom', async ({ page }) => {
		await expect(page).toHaveURL('https://example.com/');
		await expect(page).toHaveTitle('Example Domain');

		const element = page.locator('h1');
		await expect(element).toBeVisible();
		await expect(element).toHaveText('Example Domain');
		await expect(element).toHaveCount(1);

		const notExistingElement = page.locator('h5');
		await expect(notExistingElement).not.toBeVisible();
	});

	test('screenshot home page', async ({ page }) => {
		await page.screenshot({ path: '../out' });
	});

	test('screenshot h1', async ({ page }) => {
		const screenshotElement = await page.$('h1');
		await screenshotElement.screenshot({ path: '../out' });
	});

	test.skip('playwrite inspector npm run tests:project_name -- --headed', async ({ page }) => {
		// inspect browser
		await page.pause();
		const pageTitle = page.locator('h1:visible');
		await expect(pageTitle).toContainText('Example Domain');
	});
});
