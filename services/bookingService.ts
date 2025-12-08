// Service layer for Booking API
import { apiEndpoints, apiBaseUrl } from '../config/test-data';
import { APIRequestContext } from '@playwright/test';

export class BookingService {
  constructor(private apiRequest: APIRequestContext, private token: string) {}

  async createBooking(data: any) {
    return this.apiRequest.post(`${apiBaseUrl}${apiEndpoints.booking}`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getBooking(id: string) {
    return this.apiRequest.get(`${apiBaseUrl}${apiEndpoints.booking}/${id}`);
  }

  async updateBooking(id: string, data: any) {
    return this.apiRequest.put(`${apiBaseUrl}${apiEndpoints.booking}/${id}`, {
      data,
      headers: {
        Cookie: `token=${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  // ...delete, etc.
}
