import { expect, Page } from '@playwright/test';
import { test, testInvalid } from './login.fixtures';
// expect is already imported above
import { RegisterPage } from '../../pages/registerPage';
import { ProductsPage } from '../../pages/productsPage';
import { CartPage } from '../../pages/cartPage';

test('should register a new user via UI and verify via API', async ({ page, request }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  // Close consent modal if present
  const consentBtn = await page.$('button:has-text("Consent")');
  if (consentBtn) await consentBtn.click();
    const uniqueEmail = `newuser.${Date.now()}@example.com`;
    await registerPage.register('New User', uniqueEmail, 'Password123!');
    // Assert via expect.poll: wait until API reports the user exists
    await expect.poll(async () => {
      const res = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${uniqueEmail}`);
      const body = await res.json();
      return body.responseCode;
    }, { timeout: 10000 }).toBe(200);
    // Final check: confirm email matches
    const verifyRes = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${uniqueEmail}`);
    const verifyBody = await verifyRes.json();
    expect(verifyBody.user.email).toBe(uniqueEmail);
});

test('should login, add product to cart, and verify on checkout page', async ({ page, request, loggedIn }) => {
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  await productsPage.goto();
  await productsPage.addFirstProductToCart();
  await cartPage.goto();
  await expect.poll(async () => {
    await page.goto('/view_cart');
    return await page.locator('td.cart_product').isVisible();
  }, { timeout: 5000 }).toBe(true);
});



testInvalid('should show error for invalid login', async ({ page, loginFailed }) => {
  // API check: verify login fails
  const res = await page.request.post('https://automationexercise.com/api/verifyLogin', {
    data: { email: 'wronguser@example.com', password: 'wrongpassword' }
  });
  const body = await res.json();
  expect(body.responseCode).not.toBe(200);
});
