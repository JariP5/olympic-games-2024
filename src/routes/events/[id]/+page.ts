import { fetchEventById } from '../../../stores/events';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }): Promise<{event: Event | null, error: string | null}> => {
  const id = parseInt(params.id); // Extract id from route parameters

  try {
    const event: Event = await fetchEventById(id);
    if (!event) {
      return {
          event: null,
          error: 'Event not found',
      };
    }
    return {
        event,
        error: null,
    };
  } catch (err) {
    console.error('Error fetching event:', err);
    return {
        event: null,
        error: 'Failed to load event details. Please try again later.',
    };
  }
};
