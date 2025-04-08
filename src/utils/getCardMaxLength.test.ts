import { getCardMaxLength } from './getCardMaxLength';
import { CardType } from '../core/types';

describe('getCardMaxLength', () => {
  // Arrange
  const testCases: { type: CardType; expectedLength: number }[] = [
    { type: 'visa', expectedLength: 16 },
    { type: 'mastercard', expectedLength: 16 },
    { type: 'amex', expectedLength: 15 },
    { type: 'discover', expectedLength: 19 }, // Default max
    { type: 'dinersclub', expectedLength: 16 }, // Simplified max
    { type: 'jcb', expectedLength: 19 },       // Default max
    { type: 'maestro', expectedLength: 19 },    // Default max
    { type: 'unknown', expectedLength: 19 },    // Default max
    { type: 'some-other-type' as CardType, expectedLength: 19 }, // Default max for unhandled
  ];

  testCases.forEach(({ type, expectedLength }) => {
    it(`should return ${expectedLength} for card type "${type}"`, () => {
      // Act
      const maxLength = getCardMaxLength(type);
      // Assert
      expect(maxLength).toBe(expectedLength);
    });
  });
});
