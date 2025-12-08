import { Page, expect } from '@playwright/test';
import { CartPage } from '../pages/cartPage';

/**
 * Asserts that a cart item becomes visible using Playwright's expect.poll.
 * Throws if not visible within timeout.
 * @param page Playwright Page object
 * @param timeoutMs Total timeout in ms (default: 5000)
 */
export async function pollForCartItemVisible(
  page: Page,
  timeoutMs = 5000
): Promise<void> {
  // Use selector from CartPage page object
  const cartPage = new CartPage(page);
  await expect.poll(async () => {
    await page.goto('/view_cart');
    return await page.locator(cartPage.cartItemSelector).isVisible();
  }, { timeout: timeoutMs }).toBe(true);
}
