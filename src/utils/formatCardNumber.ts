export const formatCardNumber = (num: string): string => {
  const cleaned = num.replace(/\D/g, '');
  // Add spaces every 4 digits, handling potential incomplete groups
  const parts = cleaned.match(/.{1,4}/g);
  return parts ? parts.join(' ') : cleaned;
}; 