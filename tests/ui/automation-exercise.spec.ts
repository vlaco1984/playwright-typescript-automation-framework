import { test, expect } from '@playwright/test';

test.describe('Automation Exercise Website Tests', () => {
  test('should navigate to automation exercise and accept cookie banner', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://automationexercise.com/');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if the page loaded successfully
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Look for cookie banner and accept it if present
    // Common cookie banner selectors
    const cookieBannerSelectors = [
      '[id*="cookie"]',
      '[class*="cookie"]',
      '[aria-label*="cookie"]',
      'button:has-text("Accept")',
      'button:has-text("I accept")',
      'button:has-text("OK")',
      'button:has-text("Agree")',
      '.fc-consent-root',
      '#onetrust-accept-btn-handler',
      '[data-testid="consent-banner"]'
    ];

    // Try to find and click cookie accept button
    for (const selector of cookieBannerSelectors) {
      try {
        const element = page.locator(selector).first();
        if (await element.isVisible({ timeout: 2000 })) {
          console.log(`Found cookie banner with selector: ${selector}`);
          await element.click();
          console.log('Cookie banner accepted');
          break;
        }
      } catch (error) {
        // Continue to next selector if this one doesn't work
        continue;
      }
    }

    // Wait for 5 seconds as requested
    console.log('Waiting 5 seconds...');
    await page.waitForTimeout(5000);

    // Verify we're still on the correct page
    await expect(page.url()).toContain('automationexercise.com');

    console.log('Test completed successfully');
  });
});
