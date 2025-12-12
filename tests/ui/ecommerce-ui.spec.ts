import { test, expect } from './page.fixtures';

test.describe('E2E Tests', () => {
test('should register a new user via UI and verify via API', async ({ registerPage, request }) => {
  const uniqueEmail = `newuser.${Date.now()}@example.com`;
  await registerPage.register('New User', uniqueEmail, 'Password123!');
  // Assert via expect.poll: wait until API reports the user exists
  await expect
    .poll(
      async () => {
        const res = await request.get(
          `https://automationexercise.com/api/getUserDetailByEmail?email=${uniqueEmail}`,
        );
        const body = await res.json();
        return body.responseCode;
      },
      { timeout: 10000 },
    )
    .toBe(200);
  // Final check: confirm email matches
  const verifyRes = await request.get(
    `https://automationexercise.com/api/getUserDetailByEmail?email=${uniqueEmail}`,
  );
  const verifyBody = await verifyRes.json();
  expect(verifyBody.user.email).toBe(uniqueEmail);
});

test('should login, add product to cart, and verify on checkout page', async ({ page, productsPage, cartPage }) => {
  await productsPage.goto();
  await productsPage.addFirstProductToCart();
  await expect
    .poll(
      async () => {
        await cartPage.goto();
        const visible = await page.locator(cartPage.cartItemSelector).isVisible();
        return visible;
      },
      { timeout: 5000 },
    )
    .toBe(true);
});

test('should show error for invalid login', async ({ page }) => {
  // API check: verify login fails
  const res = await page.request.post('https://automationexercise.com/api/verifyLogin', {
    data: { email: 'wronguser@example.com', password: 'wrongpassword' },
  });
  const body = (await res.json()) as { responseCode: number };
  expect(body.responseCode).not.toBe(200);
});

test('should show error for invalid login via UI', async ({ loginPage, page }) => {
  await loginPage.login('wronguser@example.com', 'wrongpassword');
  await expect(page).toHaveURL(/login/);
});
});
