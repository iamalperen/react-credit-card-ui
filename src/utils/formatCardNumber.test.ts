import { formatCardNumber } from './formatCardNumber';

describe('formatCardNumber', () => {
  // Arrange
  const testCases = [
    { input: '1234567812345678', expected: '1234 5678 1234 5678' },
    { input: '123456781234', expected: '1234 5678 1234' },
    { input: '1234', expected: '1234' },
    { input: '1234 5678 1234 5678', expected: '1234 5678 1234 5678' }, // Already formatted
    { input: '1234-5678-1234-5678', expected: '1234 5678 1234 5678' }, // With dashes
    { input: 'abc1234def5678', expected: '1234 5678' }, // With letters
    { input: '', expected: '' }, // Empty string
    { input: '   ', expected: '' }, // Whitespace only
  ];

  testCases.forEach(({ input, expected }) => {
    it(`should format "${input}" to "${expected}"`, () => {
      // Act
      const result = formatCardNumber(input);
      // Assert
      expect(result).toBe(expected);
    });
  });
});
