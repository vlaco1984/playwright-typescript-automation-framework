// Page Object Model for Login UI
import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.locator('input[data-qa="login-email"]');
    this.passwordInput = this.page.locator('input[data-qa="login-password"]');
    this.submitButton = this.page.locator('button[data-qa="login-button"]');
  }

  async goto() {
    await this.page.goto('/login');
    await this.closeConsent();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
