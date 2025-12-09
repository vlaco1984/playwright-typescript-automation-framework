import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { testUser } from '../../config/test-data';
import { closeConsentModal } from '../../utils/helpers';

// Fixture for logging in with a valid user
export const test = base.extend<{ loggedIn: boolean }>({
  loggedIn: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await closeConsentModal(page);
    await loginPage.login(testUser.username, testUser.password);
    await use(true);
  },
});

// Fixture for attempting login with invalid user
export const testInvalid = base.extend<{ loginFailed: boolean }>({
  loginFailed: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await closeConsentModal(page);
    await loginPage.login('wronguser@example.com', 'wrongpassword');
    await use(true);
  },
});
