/**
 * Build a valid Booking API payload with sensible defaults.
 *
 * Allows overriding any subset of fields to tailor data per test case.
 *
 * @param overrides - Partial booking fields to override default values.
 * @returns Complete booking data object ready to be sent to the API.
 */
export function buildBookingData(
  overrides: Partial<{
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: { checkin: string; checkout: string };
    additionalneeds?: string;
  }> = {},
) {
  return {
    firstname: 'John',
    lastname: 'Doe',
    totalprice: 100,
    depositpaid: true,
    bookingdates: {
      checkin: '2025-01-01',
      checkout: '2025-01-05',
    },
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}
