import { formatExpiryDate } from './formatExpiryDate';

describe('formatExpiryDate', () => {
  // Mock fixed date for testing
  const mockDate = new Date(2024, 0, 1); // January 1, 2024

  beforeEach(() => {
    // Mock Date.now to return our fixed date time
    jest.spyOn(Date, 'now').mockImplementation(() => mockDate.getTime());

    // Here's the key part: we're mocking Date.prototype.getFullYear
    // This affects all Date instances in the test
    jest.spyOn(Date.prototype, 'getFullYear').mockImplementation(function () {
      return 2024;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Test cases for the updated implementation
  const testCases = [
    // Empty input
    { input: '', expected: '' },

    // Single digit inputs
    { input: '1', expected: '1' }, // Keeping as is since it could be start of 10, 11, 12
    { input: '2', expected: '02' }, // Prepending 0 since month can't be > 19
    { input: '9', expected: '09' }, // Prepending 0

    // Two digit inputs (month only)
    { input: '01', expected: '01' },
    { input: '12', expected: '12' },
    { input: '00', expected: '01' }, // Invalid month corrected to 01
    { input: '13', expected: '12' }, // Invalid month corrected to 12

    // Three or more digits
    { input: '123', expected: '01/23' }, // Should be formatted as 01/23
    { input: '124', expected: '01/24' }, // Valid year (2024)
    { input: '144', expected: '01/24' }, // Year 44 > maxYear (2024+20=44), sets to currentYear (24)
    { input: '188', expected: '01/24' }, // Invalid year (88), sets to currentYear (24)
    { input: '1234', expected: '12/34' }, // Complete MM/YY with valid year
    { input: '0134', expected: '01/34' }, // Valid month and year
    { input: '0123', expected: '01/23' }, // Valid month and year
    { input: '0023', expected: '01/23' }, // Invalid month corrected, valid year
    { input: '1399', expected: '12/24' }, // Invalid month and year corrected
    { input: '8888', expected: '12/24' }, // Both month & year invalid, corrected to current year

    // Inputs with slashes already present
    { input: '12/34', expected: '12/34' }, // Slashes removed then re-added
    { input: '1/23', expected: '01/23' }, // Single digit month gets formatted
    { input: '12/88', expected: '12/24' }, // Invalid year corrected to current year

    // Inputs with other characters
    { input: '12 / 34', expected: '12/34' }, // Spaces removed
    { input: '12-34', expected: '12/34' }, // Dashes replaced with slash
    { input: 'ab/cd', expected: '' }, // Non-numeric becomes empty
    { input: '12abc34', expected: '12/34' }, // Mix of letters and numbers

    // Long inputs
    { input: '123456', expected: '12/34' }, // Only first 4 digits used
    { input: '129988', expected: '12/24' }, // Invalid year corrected
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should format "${input}" to "${expected}"`, () => {
      // Act
      const result = formatExpiryDate(input);
      // Assert
      expect(result).toBe(expected);
    });
  });
});
