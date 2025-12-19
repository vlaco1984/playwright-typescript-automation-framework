// Service layer for Booking API
import { apiEndpoints } from '../test-data/test-data';
import { APIRequestContext, APIResponse } from '@playwright/test';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingData {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

/**
 * Service wrapper for the Booking API.
 *
 * Provides typed methods to create, retrieve, and update bookings via
 * Playwright's `APIRequestContext` with minimal boilerplate in tests.
 */
export class BookingService {
  /**
   * Create a new instance of `BookingService`.
   *
   * @param apiRequest - Playwright API client used to make HTTP requests.gi
   * @param token - Auth token used for endpoints requiring authorization.
   */
  constructor(
    private apiRequest: APIRequestContext,
    private token: string,
  ) {}

  /**
   * Create a new booking.
   *
   * @param data - Booking payload to create.
   * @returns API response of the create booking request.
   */
  async createBooking(data: BookingData): Promise<APIResponse> {
    return this.apiRequest.post(`${apiEndpoints.booking}`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Retrieve a booking by its identifier.
   *
   * @param id - Booking ID to retrieve.
   * @returns API response of the get booking request.
   */
  async getBooking(id: number | string): Promise<APIResponse> {
    return this.apiRequest.get(`${apiEndpoints.booking}/${id}`);
  }

  /**
   * Update an existing booking with new data.
   *
   * Requires valid `token` provided to the service instance.
   *
   * @param id - Booking ID to update.
   * @param data - Updated booking payload.
   * @returns API response of the update booking request.
   */
  async updateBooking(id: number | string, data: BookingData): Promise<APIResponse> {
    return this.apiRequest.put(`${apiEndpoints.booking}/${id}`, {
      data,
      headers: {
        Cookie: `token=${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  // ...delete, etc.
}
