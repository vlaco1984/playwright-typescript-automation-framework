// Page Object Model for Login UI
import { Page, Locator } from '@playwright/test';
import { ConsentModal } from '../components/consentModal';

export class LoginPage {
  private usernameInput: Locator;
  private passwordInput: Locator;
  private submitButton: Locator;
  public consentModal: ConsentModal;

  constructor(private page: Page) {
    this.usernameInput = this.page.locator('input[data-qa="login-email"]');
    this.passwordInput = this.page.locator('input[data-qa="login-password"]');
    this.submitButton = this.page.locator('button[data-qa="login-button"]');
    this.consentModal = new ConsentModal(this.page);
  }

  async goto() {
    await this.page.goto('/login');
    await this.consentModal.close();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
