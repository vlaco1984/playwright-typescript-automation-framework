import { test, expect } from '../../fixtures/page.fixtures';

test.describe('E2E Tests', () => {
  test('should register a new user via UI and verify via API', async ({
    registerPage,
    request,
  }) => {
    await registerPage.goto();
    const uniqueEmail = `newuser.${Date.now()}@example.com`;
    await registerPage.register('New User', uniqueEmail, 'Password123!');
    // Assert via expect.poll: wait until API reports the user exists
    await expect
      .poll(
        async () => {
          const res = await request.get(`/api/getUserDetailByEmail?email=${uniqueEmail}`);
          const body = await res.json();
          return body.responseCode;
        },
        { timeout: 10000 },
      )
      .toBe(200);
    // Final check: confirm email matches
    const verifyRes = await request.get(`/api/getUserDetailByEmail?email=${uniqueEmail}`);
    const verifyBody = await verifyRes.json();
    expect(verifyBody.user.email).toBe(uniqueEmail);
  });

  test('should add product to cart, and verify on checkout page', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.goto();
    await productsPage.addFirstProductToCart();
    await expect
      .poll(
        async () => {
          await cartPage.goto();
          const visible = await cartPage.hasVisibleItem();
          return visible;
        },
        { timeout: 50000 },
      )
      .toBe(true);
  });

  test('should show error for invalid login', async ({ loginPage, page }) => {
    await loginPage.goto();
    const res = await page.request.post('/api/verifyLogin', {
      data: { email: 'wronguser@example.com', password: 'wrongpassword' },
    });
    await loginPage.login('wronguser@example.com', 'wrongpassword');
    const body = (await res.json()) as { responseCode: number };
    expect(body.responseCode).not.toBe(200);
  });
});
