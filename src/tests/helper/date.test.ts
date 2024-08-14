import { describe, expect, it } from 'vitest';
import { formatDate } from '../../helper/date';

describe('formatDate', () => {
    it('formats a valid date string with time correctly', () => {
        const dateString = '2024-08-01T10:00:00Z';
        const formattedDate = formatDate(dateString, true);
        expect(formattedDate).toBe('August 1, 2024 at 10:00');
    });

    it('formats a valid date string without time correctly', () => {
        const dateString = '2024-08-01T10:00:00Z';
        const formattedDate = formatDate(dateString, false);
        expect(formattedDate).toBe('August 1, 2024');
    });

    it('returns an empty string for an invalid date', () => {
        const invalidDateString = 'invalid-date';
        const formattedDate = formatDate(invalidDateString, true);
        expect(formattedDate).toBe('');
    });

    it('returns an empty string for an empty date string', () => {
        const formattedDate = formatDate('');
        expect(formattedDate).toBe('');
    });

    it('handles a date string with a time zone offset', () => {
        const dateString = '2024-08-01T10:00:00-05:00'; // 5 hours behind UTC
        const formattedDate = formatDate(dateString, true);
        expect(formattedDate).toBe('August 1, 2024 at 15:00'); // Adjusted to UTC
    });

    it('returns an empty string for a non-date string', () => {
        const nonDateString = 'not-a-date';
        const formattedDate = formatDate(nonDateString, false);
        expect(formattedDate).toBe('');
    });

    it('returns an empty string for a date string with invalid format', () => {
        const invalidFormatString = '2024-08-01TZZ:00:00Z';
        const formattedDate = formatDate(invalidFormatString, true);
        expect(formattedDate).toBe('');
    });
});
