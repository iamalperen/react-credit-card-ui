import React from 'react';

/**
 * Supported credit card types/brands
 */
export type CardType =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'dinersclub'
  | 'jcb'
  | 'maestro'
  | 'unknown';

/**
 * Interface for card information used internally
 */
export interface CardInfo {
  /** The type/brand of the credit card */
  type: CardType;
  /** Regular expressions to match the card number patterns */
  patterns: RegExp[];
  /** React node containing the card logo */
  logo?: React.ReactNode;
}
