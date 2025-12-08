import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { testUser } from '../../config/test-data';

// Fixture for logging in with a valid user
export const test = base.extend<{ loggedIn: boolean }>({
  loggedIn: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.closeConsentModal();
    await loginPage.login(testUser.username, testUser.password);
    await use(true);
  },
});

// Fixture for attempting login with invalid user
export const testInvalid = base.extend<{ loginFailed: boolean }>({
  loginFailed: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.closeConsentModal();
    await loginPage.login('wronguser@example.com', 'wrongpassword');
    await use(true);
  },
});
