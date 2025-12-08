import { test, expect } from '@playwright/test';
import { TestInfo } from '@playwright/test';
import { BookingService } from '../../services/bookingService';
import { buildBookingData } from '../../utils/dataBuilder';
import { testUser, apiEndpoints, apiBaseUrl } from '../../config/test-data';


let token: string;
let bookingService: BookingService;

test.afterEach(async ({}, testInfo: TestInfo) => {
  if (testInfo.status === 'passed') {
    console.log(`✅ Test passed: ${testInfo.title}`);
  }
});

test.beforeAll(async ({ playwright }) => {
  const apiRequest = await playwright.request.newContext();
  const response = await apiRequest.post(`${apiBaseUrl}${apiEndpoints.auth}`, {
    data: { username: testUser.username, password: testUser.password },
    headers: { 'Content-Type': 'application/json' }
  });
  token = (await response.json()).token;
  bookingService = new BookingService(apiRequest, token);
});

test('should create a booking', async () => {
  const bookingData = buildBookingData();
  const response = await bookingService.createBooking(bookingData);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('bookingid');
});

test('should get a booking by id', async () => {
  const bookingData = buildBookingData();
  const createRes = await bookingService.createBooking(bookingData);
  const bookingId = (await createRes.json()).bookingid;
  const getRes = await bookingService.getBooking(bookingId);
  expect(getRes.ok()).toBeTruthy();
  const booking = await getRes.json();
  expect(booking.firstname).toBe(bookingData.firstname);
});

test('should fail unauthorized booking update', async ({ playwright }) => {
  const apiRequest = await playwright.request.newContext();
  const bookingServiceNoAuth = new BookingService(apiRequest, '');
  const bookingData = buildBookingData();
  const createRes = await bookingServiceNoAuth.createBooking(bookingData);
  const bookingId = (await createRes.json()).bookingid;
  const updateRes = await bookingServiceNoAuth.updateBooking(bookingId, buildBookingData({ firstName: 'NoAuth' }));
  expect(updateRes.status()).toBe(403);
});

test('should update a booking', async () => {
  // Create a booking first
  const bookingData = buildBookingData();
  const createRes = await bookingService.createBooking(bookingData);
  const bookingId = (await createRes.json()).bookingid;

  // Prepare updated data
  const updatedData = buildBookingData({
    firstname: 'Jane',
    lastname: 'Smith',
    totalprice: 150,
    depositpaid: false,
    additionalneeds: 'Lunch',
  });

  // Update the booking
  const updateRes = await bookingService.updateBooking(bookingId, updatedData);
  expect(updateRes.ok()).toBeTruthy();

  // Verify the update
  const getRes = await bookingService.getBooking(bookingId);
  const booking = await getRes.json();
  expect(booking.firstname).toBe('Jane');
  expect(booking.lastname).toBe('Smith');
  expect(booking.totalprice).toBe(150);
  expect(booking.depositpaid).toBe(false);
  expect(booking.additionalneeds).toBe('Lunch');
});
