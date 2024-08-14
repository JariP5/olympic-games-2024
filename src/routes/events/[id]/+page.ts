import { fetchEventById } from '../../../stores/events';
import type { EventResponse } from '../../../types/event';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }): Promise<{eventResponse: EventResponse | null, error: string | null}> => {
  const id = parseInt(params.id); // Extract id from route parameters

  try {
    const eventResponse: EventResponse = await fetchEventById(id);
    if (!eventResponse) {
      return {
          eventResponse: null,
          error: 'Event not found',
      };
    }
    return {
        eventResponse,
        error: null,
    };
  } catch (err) {
    console.error('Error fetching event:', err);
    return {
        eventResponse: null,
        error: 'Failed to load event details. Please try again later.',
    };
  }
};
