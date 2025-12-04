// Service layer for Booking API
import { apiEndpoints } from '../config/test-data';
import { APIRequestContext } from '@playwright/test';

export class BookingService {
  constructor(private apiRequest: APIRequestContext, private token: string) {}

  async createBooking(data: any) {
    return this.apiRequest.post(apiEndpoints.booking, {
      data,
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async getBooking(id: string) {
    return this.apiRequest.get(`${apiEndpoints.booking}/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  // ...update, delete, etc.
}
