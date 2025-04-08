import React from 'react';
import { CardType } from '../core/types';

// Define logos separately, can be replaced with actual SVGs later
const cardLogos: Record<CardType, React.ReactNode> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  maestro: 'Maestro',
  amex: 'Amex',
  discover: 'Discover',
  dinersclub: 'Diners Club',
  jcb: 'JCB',
  unknown: null, // Or a default unknown logo
};

export const getCardLogo = (type: CardType): React.ReactNode | null => {
  return cardLogos[type] ?? null; // Return logo or null if type is somehow invalid
};
