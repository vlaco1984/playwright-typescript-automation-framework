// Service layer for Booking API
import { apiEndpoints } from '../config/test-data';
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

export class BookingService {
  constructor(
    private apiRequest: APIRequestContext,
    private token: string,
  ) {}

  async createBooking(data: BookingData): Promise<APIResponse> {
    return this.apiRequest.post(`${apiEndpoints.booking}`, {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getBooking(id: number | string): Promise<APIResponse> {
    return this.apiRequest.get(`${apiEndpoints.booking}/${id}`);
  }

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
