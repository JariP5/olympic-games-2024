import { fetchEventById } from '../../../stores/events'; // Adjust path as necessary
import type { PageLoad } from './$types'; // Ensure this import path matches your setup

export const load: PageLoad = async ({ params }) => {
  const id = parseInt(params.id); // Extract id from route parameters
  console.log(id);

  try {
    const event: Event = await fetchEventById(id);
    if (!event) {
      return {
        props: {
          event: null,
          error: 'Event not found',
        },
      };
    }
    return {
      props: {
        event,
        error: null,
      },
    };
  } catch (err) {
    console.error('Error fetching event:', err);
    return {
      props: {
        event: null,
        error: 'Failed to load event details. Please try again later.',
      },
    };
  }
};
