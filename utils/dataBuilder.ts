// Factory for test data
export function buildBookingData(overrides = {}) {
  return {
    firstName: 'John',
    lastName: 'Doe',
    totalPrice: 100,
    depositPaid: true,
    bookingDates: {
      checkin: '2025-01-01',
      checkout: '2025-01-05',
    },
    additionalNeeds: 'Breakfast',
    ...overrides,
  };
}
