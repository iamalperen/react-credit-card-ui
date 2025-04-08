import { getCardType } from './getCardType';
import { CardType } from '../core/types';

describe('getCardType', () => {
  // Arrange
  const testCases: { number: string; expectedType: CardType }[] = [
    // Visa
    { number: '4', expectedType: 'visa' },
    { number: '4111111111111111', expectedType: 'visa' },
    { number: '499999', expectedType: 'visa' },
    // Mastercard
    { number: '51', expectedType: 'mastercard' },
    { number: '5511111111111111', expectedType: 'mastercard' },
    { number: '222100', expectedType: 'mastercard' },
    { number: '272099', expectedType: 'mastercard' },
    // Maestro
    { number: '5018', expectedType: 'maestro' },
    { number: '5020', expectedType: 'maestro' },
    { number: '5038', expectedType: 'maestro' },
    { number: '5893', expectedType: 'maestro' },
    { number: '6304', expectedType: 'maestro' },
    { number: '6759', expectedType: 'maestro' },
    { number: '6761', expectedType: 'maestro' },
    { number: '6763', expectedType: 'maestro' },
    // Amex
    { number: '34', expectedType: 'amex' },
    { number: '371111111111111', expectedType: 'amex' },
    // Discover
    { number: '6011', expectedType: 'discover' },
    { number: '6511111111111111', expectedType: 'discover' },
    // Diners Club
    { number: '300', expectedType: 'dinersclub' },
    { number: '30511111111111', expectedType: 'dinersclub' },
    { number: '36', expectedType: 'dinersclub' },
    { number: '38', expectedType: 'dinersclub' },
    // JCB
    { number: '35', expectedType: 'jcb' },
    { number: '352800', expectedType: 'jcb' },
    { number: '358999', expectedType: 'jcb' },
    // Unknown / Edge cases
    { number: '1', expectedType: 'unknown' },
    { number: '9999999999999999', expectedType: 'unknown' },
    { number: '', expectedType: 'unknown' },
    { number: 'abcd', expectedType: 'unknown' },
    { number: '4111-1111-1111-1111', expectedType: 'visa' }, // With separators
  ];

  testCases.forEach(({ number, expectedType }) => {
    it(`should return "${expectedType}" for card number starting with "${number.substring(0, Math.min(6, number.length))}..."`, () => {
      // Act
      const type = getCardType(number);
      // Assert
      expect(type).toBe(expectedType);
    });
  });
});
