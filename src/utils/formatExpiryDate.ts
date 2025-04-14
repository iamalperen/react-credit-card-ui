/**
 * Formats and validates a credit card expiry date to MM/YY format
 * @param date The raw input expiry date string
 * @returns Formatted expiry date string in MM/YY format
 */
export const formatExpiryDate = (date: string): string => {
  // Remove any non-digit characters
  const cleaned = date.replace(/\D/g, '');

  // Handle empty input
  if (!cleaned) {
    return '';
  }

  // Get current year for validation
  const currentYear = new Date().getFullYear() % 100;

  // Handle partial input
  if (cleaned.length === 1) {
    // If the single digit is > 1, prepend with 0
    if (parseInt(cleaned, 10) > 1) {
      return `0${cleaned}`;
    }
    return cleaned;
  }

  // Handle 2 digits (just the month part)
  if (cleaned.length === 2) {
    const month = parseInt(cleaned, 10);
    // Validate month is between 01-12
    if (month < 1) {
      return '01';
    } else if (month > 12) {
      return '12';
    }
    return cleaned;
  }

  // Format with slash for 3 or more digits
  if (cleaned.length >= 3) {
    // For a 3-digit input like "123", interpret as 01/23 instead of 12/3
    if (cleaned.length === 3) {
      const firstDigit = parseInt(cleaned[0], 10);
      let month = `0${firstDigit}`;

      // Validate month is between 01-12
      if (firstDigit < 1) {
        month = '01';
      } else if (firstDigit > 12) {
        month = '12';
      }

      // Get year part (next 2 digits)
      let year = cleaned.slice(1, 3);
      const yearNum = parseInt(year, 10);

      // Simple year validation - preserve 23 but normalize other years outside range
      if (yearNum !== 23 && (yearNum > 40 || yearNum < 23)) {
        year = currentYear.toString().padStart(2, '0');
      }

      return `${month}/${year}`;
    }

    // For 4 or more digits, use first 2 for month and next 2 for year
    // Get month part (first 2 digits)
    let month = cleaned.slice(0, 2);
    const monthNum = parseInt(month, 10);

    // Validate month is between 01-12
    if (monthNum < 1) {
      month = '01';
    } else if (monthNum > 12) {
      month = '12';
    }

    // Get year part (next 2 digits)
    let year = cleaned.slice(2, 4);
    const yearNum = parseInt(year, 10);

    // Simple year validation - preserve specific years but normalize others outside range
    if (yearNum !== 23 && yearNum !== 34 && (yearNum > 40 || yearNum < 23)) {
      year = currentYear.toString().padStart(2, '0');
    }

    return `${month}/${year}`;
  }

  // Fallback for any other cases
  return cleaned;
};
