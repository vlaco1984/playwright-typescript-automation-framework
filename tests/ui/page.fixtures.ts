import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { RegisterPage } from '../../pages/registerPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';
import { closeConsentModal } from '../../utils/helpers';

export const test = base.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
}>({
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.goto();
    await closeConsentModal(page);
    await use(lp);
  },
  registerPage: async ({ page }, use) => {
    const rp = new RegisterPage(page);
    await rp.goto();
    await closeConsentModal(page);
    await use(rp);
  },
  productsPage: async ({ page }, use) => {
    const pp = new ProductsPage(page);
    await pp.goto();
    await closeConsentModal(page);
    await use(pp);
  },
  cartPage: async ({ page }, use) => {
    const cp = new CartPage(page);
    await cp.goto();
    await closeConsentModal(page);
    await use(cp);
  },
});

export { expect };
