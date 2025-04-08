// Basic MM/YY validation/formatting can be added here
// For now, just return the input
export const formatExpiryDate = (date: string): string => {
    // Example: Add slash if missing and possible
    // const cleaned = date.replace(/\D/g, '');
    // if (cleaned.length >= 3) {
    //     return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    // }
    return date;
}; 