export const uiApiTestUser = {
  email: 'uiapitestuser@example.com',
  password: 'UiApiTest123!',
};
// Centralized test data and config
export const testUser = {
  username: 'admin',
  password: 'password123',
};

// Base URLs are defined at project config level (playwright.config.ts)

export const apiEndpoints = {
  auth: '/auth',
  booking: '/booking',
  // restful-booker does not have products endpoint
};
