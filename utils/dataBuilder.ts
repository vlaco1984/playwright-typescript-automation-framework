// Factory for test data
export function buildBookingData(overrides = {}) {
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
