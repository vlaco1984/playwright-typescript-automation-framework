import { test, expect } from '@playwright/test';
import { BookingService } from '../services/bookingService';
import { buildBookingData } from '../utils/helpers';
import { testUser, apiEndpoints } from '../test-data/test-data';
import type { APIRequestContext } from '@playwright/test';

test.describe('API Tests', () => {
  const authenticate = async (request: APIRequestContext): Promise<string> => {
    const response = await request.post(`${apiEndpoints.auth}`, {
      data: { username: testUser.username, password: testUser.password },
      headers: { 'Content-Type': 'application/json' },
    });
    const authBody = (await response.json()) as { token: string };
    return authBody.token;
  };

  test('should create a booking', async ({ request }) => {
    const token = await authenticate(request);
    const bookingService = new BookingService(request, token);
    const bookingData = buildBookingData();
    const response = await bookingService.createBooking(bookingData);
    expect(response.ok()).toBeTruthy();
    const body = (await response.json()) as { bookingid: number };
    expect(body.bookingid).toBeDefined();
  });

  test('should get a booking by id', async ({ request }) => {
    const token = await authenticate(request);
    const bookingService = new BookingService(request, token);
    const bookingData = buildBookingData();
    const createRes = await bookingService.createBooking(bookingData);
    const createBody = (await createRes.json()) as { bookingid: number };
    const bookingId = createBody.bookingid;
    const getRes = await bookingService.getBooking(bookingId);
    expect(getRes.ok()).toBeTruthy();
    const booking = (await getRes.json()) as {
      firstname: string;
      lastname: string;
      totalprice: number;
      depositpaid: boolean;
      additionalneeds?: string;
    };
    expect(booking.firstname).toBe(bookingData.firstname);
  });

  test('should fail unauthorized booking update', async ({ request }) => {
    const bookingServiceNoAuth = new BookingService(request, '');
    const bookingData = buildBookingData();
    const createRes = await bookingServiceNoAuth.createBooking(bookingData);
    const created = (await createRes.json()) as { bookingid: number };
    const bookingId = created.bookingid;
    const updateRes = await bookingServiceNoAuth.updateBooking(
      bookingId,
      buildBookingData({ firstname: 'NoAuth' }),
    );
    expect(updateRes.status()).toBe(403);
  });

  test('should update a booking', async ({ request }) => {
    const token = await authenticate(request);
    const bookingService = new BookingService(request, token);
    // Create a booking first
    const bookingData = buildBookingData();
    const createRes = await bookingService.createBooking(bookingData);
    const created = (await createRes.json()) as { bookingid: number };
    const bookingId = created.bookingid;

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
    const booking = (await getRes.json()) as {
      firstname: string;
      lastname: string;
      totalprice: number;
      depositpaid: boolean;
      additionalneeds?: string;
    };
    expect(booking.firstname).toBe('Jane');
    expect(booking.lastname).toBe('Smith');
    expect(booking.totalprice).toBe(150);
    expect(booking.depositpaid).toBe(false);
    expect(booking.additionalneeds).toBe('Lunch');
  });
});
