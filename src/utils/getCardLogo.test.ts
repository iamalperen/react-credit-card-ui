import { getCardLogo } from './getCardLogo';
import { CardType } from '../core/types';

describe('getCardLogo', () => {
  // Arrange
  const testCases: { type: CardType; expectedLogo: string | null }[] = [
    { type: 'visa', expectedLogo: 'Visa' },
    { type: 'mastercard', expectedLogo: 'Mastercard' },
    { type: 'amex', expectedLogo: 'Amex' },
    { type: 'discover', expectedLogo: 'Discover' },
    { type: 'dinersclub', expectedLogo: 'Diners Club' },
    { type: 'jcb', expectedLogo: 'JCB' },
    { type: 'maestro', expectedLogo: 'Maestro' },
    { type: 'unknown', expectedLogo: null },
    { type: 'invalid-type' as CardType, expectedLogo: null },
  ];

  testCases.forEach(({ type, expectedLogo }) => {
    it(`should return "${expectedLogo || 'null'}" for card type "${type}"`, () => {
      // Act
      const logo = getCardLogo(type);
      // Assert
      expect(logo).toBe(expectedLogo);
    });
  });
});
