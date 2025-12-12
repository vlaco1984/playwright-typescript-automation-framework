import { test } from '@playwright/test';
import { UserService } from './api/services/user.service';
import { UserDataFactory } from './shared/utils/userDataFactory';

test('debug UserService with CSRF', async ({ request }) => {
  const userService = new UserService(request);
  const userData = UserDataFactory.generateUserData();

  const response = await userService.createUser(userData);
  console.log('Status:', response.status());
  const body = await response.text();
  console.log('Body:', body.substring(0, 500)); // First 500 chars
});
