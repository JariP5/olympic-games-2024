import { get } from 'svelte/store';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { disciplines, events, fetchDisciplines, fetchEventById, fetchEvents, fetchVenues, venues } from '../../stores/events';
import type { DisciplineResponse } from '../../types/discipline';
import type { EventResponse, EventsResponse } from '../../types/event';
import type { VenueResponse } from '../../types/venue';

describe('Events Store', () => {
  beforeEach(() => {
    disciplines.set([]);
    events.set(null);
    venues.set([]);
    vi.restoreAllMocks();
  });

  it('fetchEvents should fetch and update events store', async () => {
    const mockEventsResponse: EventsResponse = {
      data: [
        {
          id: 1,
          day: '2024-08-01',
          discipline_name: 'Swimming',
          discipline_pictogram: 'path/to/pictogram.png',
          name: '100m Freestyle',
          venue_name: 'Aquatics Center',
          event_name: 'Men\'s 100m Freestyle',
          detailed_event_name: 'Men\'s 100m Freestyle - Final',
          start_date: '2024-08-01T10:00:00Z',
          end_date: '2024-08-01T10:30:00Z',
          status: 'scheduled',
          is_medal_event: 1,
          is_live: 0,
          gender_code: 'M',
          competitors: []
        },
        {
          id: 2,
          day: '2024-08-02',
          discipline_name: 'Swimming',
          discipline_pictogram: 'path/to/pictogram.png',
          name: '200m Butterfly',
          venue_name: 'Aquatics Center',
          event_name: 'Women\'s 200m Butterfly',
          detailed_event_name: 'Women\'s 200m Butterfly - Final',
          start_date: '2024-08-02T11:00:00Z',
          end_date: '2024-08-02T11:30:00Z',
          status: 'scheduled',
          is_medal_event: 1,
          is_live: 0,
          gender_code: 'W',
          competitors: []
        },
      ],
      links: { first: '', last: '', prev: '', next: '' },
      meta: { current_page: 1, from: 1, last_page: 1, path: '', per_page: 2, to: 2, total: 2 },
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockEventsResponse,
    } as Response);

    await fetchEvents('?page=1');

    expect(get(events)).toEqual(mockEventsResponse);
  });

  it('fetchDisciplines should fetch and update disciplines store', async () => {
    const mockDisciplineResponse: DisciplineResponse = {
      data: [
        { id: '1', name: 'Swimming', pictogram_url: 'path/to/swimming.png' },
        { id: '2', name: 'Athletics', pictogram_url: 'path/to/athletics.png' },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockDisciplineResponse,
    } as Response);

    await fetchDisciplines();

    expect(get(disciplines)).toEqual(mockDisciplineResponse.data);
  });

  it('fetchVenues should fetch and update venues store', async () => {
    const mockVenueResponse: VenueResponse = {
      data: [
        { id: '1', name: 'Aquatics Center', url: 'https://example.com/aquatics-center' },
        { id: '2', name: 'Olympic Stadium', url: 'https://example.com/olympic-stadium' },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockVenueResponse,
    } as Response);

    await fetchVenues();

    expect(get(venues)).toEqual(mockVenueResponse.data);
  });

  it('fetchEventById should fetch and return event data by ID', async () => {
    const mockEventResponse: EventResponse = {
      data: {
        id: 1,
        day: '2024-08-01',
        discipline_name: 'Swimming',
        discipline_pictogram: 'path/to/pictogram.png',
        name: '100m Freestyle',
        venue_name: 'Aquatics Center',
        event_name: 'Men\'s 100m Freestyle',
        detailed_event_name: 'Men\'s 100m Freestyle - Final',
        start_date: '2024-08-01T10:00:00Z',
        end_date: '2024-08-01T10:30:00Z',
        status: 'scheduled',
        is_medal_event: 1,
        is_live: 0,
        gender_code: 'M',
        competitors: []
      }
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockEventResponse,
    } as Response);

    const result = await fetchEventById(1);

    expect(result).toEqual(mockEventResponse);
  });

  it('should throw an error when fetchEventById fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(fetchEventById(1)).rejects.toThrow('Network response was not ok');
  });
});
