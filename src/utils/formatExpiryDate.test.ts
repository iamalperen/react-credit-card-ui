import { formatExpiryDate } from './formatExpiryDate';

describe('formatExpiryDate', () => {
  // Arrange: Basic test cases
  const testCases = [
    { input: '12/25', expected: '12/25' }, // Already formatted
    { input: '1225', expected: '1225' }, // Current function doesn't add slash
    { input: '01/28', expected: '01/28' },
    { input: '0128', expected: '0128' }, // Current function doesn't add slash
    { input: '1/28', expected: '1/28' }, // Should ideally format to 01/28, but current function doesn't
    { input: '12 / 25', expected: '12 / 25' }, // With spaces - function doesn't clean
    { input: 'abc', expected: 'abc' }, // Non-numeric - current function doesn't clean
    { input: '', expected: '' }, // Empty
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should format "${input}" to "${expected}" (current logic)`, () => {
      // Act
      const result = formatExpiryDate(input);
      // Assert
      expect(result).toBe(expected);
    });
  });

  // Note: The current formatExpiryDate function is very basic.
  // Future tests could cover more robust formatting/validation if the function is improved.
  // e.g., padding month with '0', validating month/year ranges.
});
