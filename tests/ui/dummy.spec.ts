import { test, expect } from '@playwright/test';

/**
 * Dummy test to verify Playwright setup and basic functionality
 */
test.describe('Dummy Test Suite', () => {
  test('should verify basic Playwright functionality', async ({ page }) => {
    // Navigate to a simple website
    await page.goto('https://example.com');

    // Verify the page title
    const title = await page.title();
    expect(title).toBe('Example Domain');

    // Verify page content
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Example Domain');

    // Verify page has paragraphs
    const paragraphs = page.locator('p');
    await expect(paragraphs.first()).toBeVisible();
  });
});
