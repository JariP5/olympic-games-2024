// +page.spec.ts
import { describe, expect, it } from 'vitest';
import { formatDate } from '../../../../routes/events/[id]/+page';

// vi.mock('../../../stores/events', () => ({
//     fetchEventById: vi.fn()
//   }));
  
//   describe('load', () => {
//     it('returns event data when fetch is successful', async () => {
//       const mockEventResponse = {
//         data: {
//           discipline_pictogram: 'path/to/pictogram.png',
//           discipline_name: 'Swimming',
//           event_name: '100m Freestyle',
//           start_date: '2024-08-01T10:00:00Z',
//           end_date: '2024-08-01T11:00:00Z',
//           venue_name: 'Olympic Pool',
//           is_medal_event: true,
//           competitors: []
//         }
//       };
  
//       (fetchEventById as vi.Mock).mockResolvedValueOnce(mockEventResponse);
  
//       const { eventResponse, error } = await load({ params: { id: '1' } } as any);
  
//       expect(fetchEventById).toHaveBeenCalledWith(1);
//       expect(eventResponse).toEqual(mockEventResponse);
//       expect(error).toBeNull();
//     });
  
//     it('returns an error message when event is not found', async () => {
//       (fetchEventById as vi.Mock).mockResolvedValueOnce(null);
  
//       const { eventResponse, error } = await load({ params: { id: '999' } } as any);
  
//       expect(fetchEventById).toHaveBeenCalledWith(999);
//       expect(eventResponse).toBeNull();
//       expect(error).toBe('Event not found');
//     });
  
//     it('returns an error message on fetch failure', async () => {
//       (fetchEventById as vi.Mock).mockRejectedValueOnce(new Error('Network error'));
  
//       const { eventResponse, error } = await load({ params: { id: '1' } } as any);
  
//       expect(fetchEventById).toHaveBeenCalledWith(1);
//       expect(eventResponse).toBeNull();
//       expect(error).toBe('Failed to load event details. Please try again later.');
//     });
//   });
  
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