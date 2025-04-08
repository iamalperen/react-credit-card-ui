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

export interface CardInfo {
  type: CardType;
  patterns: RegExp[];
  logo?: React.ReactNode;
}
