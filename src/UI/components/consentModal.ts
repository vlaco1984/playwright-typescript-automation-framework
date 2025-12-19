import { Page, Locator } from '@playwright/test';

export class ConsentModal {
  private consentButton: Locator;
  constructor(private page: Page) {
    this.consentButton = this.page.locator('button:has-text("Consent")');
  }
  async close(): Promise<void> {
    if (await this.consentButton.count()) {
      await this.consentButton.click();
    }
  }
}
