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
  // Maestro - daha spesifik pattern, 6011 ve 65 ile başlayan kartları kapsamıyor
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