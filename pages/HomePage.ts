import { Locator, Page } from '@playwright/test';

export class HomePage {
	readonly page: Page;
	readonly signInButton: Locator;
	readonly searchInput: Locator;

	constructor(page: Page) {
		this.page = page;
		this.signInButton = page.locator('#signin_button:visible');
		this.searchInput = page.locator('#searchTerm');
	}

	async visit(): Promise<void> {
		await this.page.goto('http://zero.webappsecurity.com/');
	}

	async signIn(): Promise<void> {
		await this.signInButton.click();
	}

	async search(searchText: string): Promise<void> {
		await this.searchInput.type(searchText);
		await this.page.keyboard.press('Enter');
	}
}
