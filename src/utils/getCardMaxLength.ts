import { CardType } from '../core/types';

// Standard maximum lengths based on ISO/IEC 7812 and common usage.
// See: https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_(IIN)

// Default max length if type is unknown or not specifically listed below
const DEFAULT_MAX_LENGTH = 19; // General upper limit for types like Maestro, JCB, Discover, some Visa

export const getCardMaxLength = (type: CardType): number => {
    switch (type) {
        case 'amex': 
            return 15;
        case 'mastercard': 
            return 16;
        case 'visa': 
            return 16; // Common length, although 13 and 19 exist
        case 'dinersclub': 
            // International (36, 38, 39) can be 14-19
            // US/Canada (55) is 16
            // For simplicity, using 16 as a common ground/max for validation input.
            // A more complex validation might check the specific IIN.
            return 16; 
        // Types that can go up to 19 digits
        case 'discover':
        case 'jcb':
        case 'maestro':
            return DEFAULT_MAX_LENGTH; // Allow up to 19
        default:
            // For unknown or other types not explicitly handled
            return DEFAULT_MAX_LENGTH;
    }
}; 