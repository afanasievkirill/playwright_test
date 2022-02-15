import { test, expect } from '@playwright/test';

test.describe.parallel('Feedback form', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('http://zero.webappsecurity.com/');
		await page.click('#feedback');
	});

	test('Reset feedback form', async ({ page }) => {
		await page.type('#name:visible', 'name');
		await page.type('#email:visible', 'eamail@email.com');
		await page.type('#subject:visible', 'subject name');
		await page.type('#comment:visible', 'my awesome comment');

		await page.click('input[name="clear"]:visible');

		const inputName = page.locator('#name:visible');
		const inputComment = page.locator('#comment:visible');

		await expect(inputName).toBeEmpty();
		await expect(inputComment).toBeEmpty();
	});
});
