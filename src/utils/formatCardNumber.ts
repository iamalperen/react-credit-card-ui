/**
 * Formats a credit card number by adding spaces every 4 digits
 * @param num The raw input credit card number string
 * @returns Formatted credit card number with spaces between each group of 4 digits
 * @example
 * // Returns "4111 1111 1111 1111"
 * formatCardNumber("4111111111111111")
 *
 * // Returns "4111 1111 1111 111"
 * formatCardNumber("411111111111111")
 *
 * // Returns "4111 1111"
 * formatCardNumber("41111111")
 */
export const formatCardNumber = (num: string): string => {
  const cleaned = num.replace(/\D/g, '');
  // Add spaces every 4 digits, handling potential incomplete groups
  const parts = cleaned.match(/.{1,4}/g);
  return parts ? parts.join(' ') : cleaned;
};
