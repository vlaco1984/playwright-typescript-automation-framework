import { test as base, Page } from '@playwright/test';
import { handleCookiePopup } from './cookieFixture';

export interface TestFixtures {
  pageWithCookieHandling: Page;
}

export const test = base.extend<TestFixtures>({
  pageWithCookieHandling: async ({ page }, use) => {
    // Handle cookie popup when page loads
    page.on('load', async () => {
      await handleCookiePopup(page);
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';
