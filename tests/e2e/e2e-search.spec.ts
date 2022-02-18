import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Search result', async () => {
	let homePage: HomePage;
	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		homePage.visit();
		await homePage.signIn();
	});

	test('Should find search result', async ({ page }) => {
		homePage.search('Bank');

		const numberOfLinks = page.locator('li > a');
		expect(numberOfLinks).toHaveCount(2);
	});
});
