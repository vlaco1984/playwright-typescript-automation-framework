import { test, expect } from '@playwright/test';

test('Accept cookie banner and wait 5 seconds', async ({ page }) => {
  // Navigate to the website
  await page.goto('https://automationexercise.com/');

  // Wait for the cookie consent dialog to be visible
  await expect(page.locator('dialog')).toBeVisible();

  // Click the Consent button to accept cookies
  await page.getByRole('button', { name: 'Consent' }).click();

  // Wait for the cookie dialog to disappear
  await expect(page.locator('dialog')).not.toBeVisible();

  // Wait for 5 seconds as requested
  await page.waitForTimeout(5000);

  // Verify the page loaded correctly by checking the title
  await expect(page).toHaveTitle('Automation Exercise');
});
