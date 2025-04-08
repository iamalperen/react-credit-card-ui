import React from 'react';

export type CardType =
  | 'visa'
  | 'mastercard'
  | 'amex'
  | 'discover'
  | 'dinersclub'
  | 'jcb'
  | 'maestro'
  | 'unknown';

// Interface for card information used internally
export interface CardInfo {
  type: CardType;
  patterns: RegExp[];
  logo?: React.ReactNode;
}
