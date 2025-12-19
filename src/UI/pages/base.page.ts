import { Page } from '@playwright/test';
import { ConsentModal } from '../components/consentModal';

/**
 * Base page object providing shared UI behaviors and utilities.
 *
 * Centralizes cross-cutting concerns like handling the consent modal,
 * so individual page objects can focus on page-specific interactions.
 */
export class BasePage {
  protected page: Page;
  protected consent: ConsentModal;

  /**
   * Initialize base page with Playwright `Page` and consent modal.
   *
   * @param page - Browser page instance used by page objects.
   */
  constructor(page: Page) {
    this.page = page;
    this.consent = new ConsentModal(page);
  }

  /**
   * Close consent modal if present.
   */
  async closeConsent(): Promise<void> {
    await this.consent.close();
  }
}
