import { Page } from '@playwright/test';

export async function handleCookiePopup(page: Page): Promise<void> {
  try {
    // Wait for cookie popup and dismiss it
    const consentButton = page.getByRole('button', { name: /^Consent$/ });
    const isVisible = await consentButton.isVisible({ timeout: 5000 }).catch(() => false);

    if (isVisible) {
      await consentButton.click();
      console.log('Cookie popup dismissed');
    }
  } catch {
    console.log('Cookie popup not found or already dismissed');
  }
}
