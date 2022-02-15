import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
	readonly page: Page;
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly signInButton: Locator;
	readonly errorMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.usernameInput = page.locator('#user_login:visible');
		this.passwordInput = page.locator('#user_password:visible');
		this.signInButton = page.locator('input[value="Sign in"]:visible');
		this.errorMessage = page.locator('div[class="alert alert-error"]:visible');
	}

	async login(username: string, password: string): Promise<void> {
		await this.usernameInput.type(username);
		await this.passwordInput.type(password);
		await this.signInButton.click();
	}

	async assertErrorMessage(): Promise<void> {
		await expect(this.errorMessage).toContainText('Login and/or password are wrong.');
	}
}
