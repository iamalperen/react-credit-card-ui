/**
 * Identifies the credit card type based on the card number
 * @param cardNumber The credit card number (can include spaces or other non-digit characters)
 * @returns The identified card type (visa, mastercard, etc.)
 * @example
 * // Returns "visa"
 * getCardType("4111111111111111")
 *
 * // Returns "mastercard"
 * getCardType("5555555555554444")
 */
import { CardType, CardInfo } from '../core/types';

// Moved patterns here, assuming getCardType is the primary user
const cardPatterns: Omit<CardInfo, 'logo'>[] = [
  { type: 'visa', patterns: [/^4/] },
  { type: 'mastercard', patterns: [/^5[1-5]/, /^2[2-7]/] },
  // Specific card patterns first
  { type: 'discover', patterns: [/^6(?:011|5)/] },
  { type: 'amex', patterns: [/^3[47]/] },
  { type: 'dinersclub', patterns: [/^3(?:0[0-5]|[68])/] },
  { type: 'jcb', patterns: [/^35/] },
  // Maestro
  { type: 'maestro', patterns: [/^(?:5[0|6-8]|6(?!011|5))/] },
];

export const getCardType = (cardNumber: string): CardType => {
  const cleanedNumber = cardNumber.replace(/\D/g, '');

  for (const card of cardPatterns) {
    for (const pattern of card.patterns) {
      if (pattern.test(cleanedNumber)) {
        return card.type;
      }
    }
  }
  return 'unknown';
};
