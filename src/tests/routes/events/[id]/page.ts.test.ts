import { describe, expect, it } from 'vitest';
import { formatDate } from '../../../../routes/events/[id]/+page';
  
describe('formatDate', () => {
    it('formats a valid date string correctly', () => {
      const dateString = '2024-08-01T10:00:00Z';
      const formattedDate = formatDate(dateString);
      expect(formattedDate).toBe('August 1, 2024 at 10:00');
    });
  
    it('returns an empty string for an invalid date', () => {
      const invalidDateString = 'invalid-date';
      const formattedDate = formatDate(invalidDateString);
      expect(formattedDate).toBe('');
    });
  
    it('returns an empty string for an empty date string', () => {
      const formattedDate = formatDate('');
      expect(formattedDate).toBe('');
    });
});