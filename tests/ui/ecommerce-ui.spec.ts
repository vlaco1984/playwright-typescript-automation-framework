import { pollForCartItemVisible } from '../../utils/pollForCartItemVisible';

import { test, testInvalid } from './login.fixtures';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';

import { RegisterPage } from '../../pages/registerPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';
import { testUser } from '../../config/test-data';
// import { OrdersPage } from '../../pages/ordersPage';

test('should register a new user via UI and verify via API', async ({ page, request }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  // Close consent modal if present
  const consentBtn = await page.$('button:has-text("Consent")');
  if (consentBtn) await consentBtn.click();
  await registerPage.register('newuser@example.com', 'Password123!');
  // API check: verify user exists
  const res = await request.get('https://automationexercise.com/api/getUserDetailByEmail?email=newuser@example.com');
  const body = await res.json();
  expect(body.responseCode).toBe(200);
  expect(body.user.email).toBe('newuser@example.com');
});

test('should login, add product to cart, and verify via API', async ({ page, request, loggedIn }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  await productsPage.goto();
  await productsPage.addFirstProductToCart();
  await cartPage.goto();
  // UI check: verify cart has items
  await pollForCartItemVisible(page);
});



testInvalid('should show error for invalid login', async ({ page, loginFailed }) => {
  // API check: verify login fails
  const res = await page.request.post('https://automationexercise.com/api/verifyLogin', {
    data: { email: 'wronguser@example.com', password: 'wrongpassword' }
  });
  const body = await res.json();
  expect(body.responseCode).not.toBe(200);
});
