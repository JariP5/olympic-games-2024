import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';
import EventDetails from '../../../../routes/events/[id]/+page.svelte';

describe('EventDetails', () => {
  it('renders loading message when no data is provided', () => {
    render(EventDetails, { data: { eventResponse: null, error: null } });
    expect(screen.getByText('Loading event details...')).toBeTruthy();
  });

  it('renders error message when error is provided', () => {
    const errorMessage = 'An error occurred';
    render(EventDetails, { data: { eventResponse: null, error: errorMessage } });
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('renders event details correctly for two competitors', () => {
    const mockEvent = {
      discipline_pictogram: 'path/to/pictogram.png',
      discipline_name: 'Swimming',
      event_name: '100m Freestyle',
      start_date: '2024-08-01T10:00:00Z',
      end_date: '2024-08-01T11:00:00Z',
      venue_name: 'Olympic Pool',
      is_medal_event: true,
      competitors: [
        {
          competitor_name: 'John Doe',
          country_flag_url: 'path/to/flag.png',
          country_id: 'USA',
          result_mark: '47.52',
          position: 0,
          result_winnerLoserTie: 'W'
        },
        {
          competitor_name: 'Jane Smith',
          country_flag_url: 'path/to/flag2.png',
          country_id: 'GBR',
          result_mark: '47.60',
          position: 1,
          result_winnerLoserTie: 'L'
        }
      ]
    };

    render(EventDetails, { data: { eventResponse: { data: mockEvent }, error: null } });

    expect(screen.getByText('Swimming')).toBeTruthy();
    expect(screen.getByText('100m Freestyle')).toBeTruthy();
    expect(screen.getByText('Olympic Pool')).toBeTruthy();
    expect(screen.getByText('🏅 Medal Event')).toBeTruthy();

    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('Jane Smith')).toBeTruthy();
    expect(screen.getByText('47.52')).toBeTruthy();
    expect(screen.getByText('47.60')).toBeTruthy();
  });

  it('renders event details correctly for more than two competitors', () => {
    const mockEvent = {
      discipline_pictogram: 'path/to/pictogram.png',
      discipline_name: 'Running',
      event_name: '100m Sprint',
      start_date: '2024-09-01T10:00:00Z',
      end_date: '2024-09-01T11:00:00Z',
      venue_name: 'Arena',
      is_medal_event: false,
      competitors: [
        {
          competitor_name: 'Mac Alli',
          country_flag_url: 'path/to/flag.png',
          country_id: 'GER',
          result_mark: '47.85',
          position: 0,
          result_winnerLoserTie: 'W'
        },
        {
          competitor_name: 'Leo Run',
          country_flag_url: 'path/to/flag2.png',
          country_id: 'POR',
          result_mark: '47.92',
          position: 1,
          result_winnerLoserTie: 'L'
        },
        {
          competitor_name: 'Peter Pan',
          country_flag_url: 'path/to/flag3.png',
          country_id: 'NED',
          result_mark: '47.99',
          position: 2,
          result_winnerLoserTie: 'L'
        }
      ]
    };

    render(EventDetails, { data: { eventResponse: { data: mockEvent }, error: null } });

    expect(screen.getByText('Running')).toBeTruthy();
    expect(screen.getByText('100m Sprint')).toBeTruthy();
    expect(screen.getByText('Arena')).toBeTruthy();

    expect(screen.getByText('1. Mac Alli')).toBeTruthy();
    expect(screen.getByText('2. Leo Run')).toBeTruthy();
    expect(screen.getByText('3. Peter Pan')).toBeTruthy();
    expect(screen.getByText('47.85')).toBeTruthy();
    expect(screen.getByText('47.92')).toBeTruthy();
    expect(screen.getByText('47.99')).toBeTruthy();
  });

  it('renders event details correctly when there are no competitors', () => {
    const mockEvent = {
      discipline_pictogram: 'path/to/pictogram.png',
      discipline_name: 'Long Jump',
      event_name: 'Men\'s Long Jump',
      start_date: '2024-09-02T10:00:00Z',
      end_date: '2024-09-02T11:00:00Z',
      venue_name: 'Stadium',
      is_medal_event: false,
      competitors: [] 
    };
  
    render(EventDetails, { data: { eventResponse: { data: mockEvent }, error: null } });
  
    expect(screen.getByText('Long Jump')).toBeTruthy();
    expect(screen.getByText('Men\'s Long Jump')).toBeTruthy();
    expect(screen.getByText('Stadium')).toBeTruthy();
    expect(screen.queryByText('1.')).toBeNull();
  });

  it('renders event details correctly, ignoring falsy competitors', () => {
    const mockEvent = {
      discipline_pictogram: 'path/to/new-pictogram.png',
      discipline_name: 'Cycling',
      event_name: 'Road Race',
      start_date: '2024-10-12T09:00:00Z',
      end_date: '2024-10-12T12:00:00Z',
      venue_name: 'City Circuit',
      is_medal_event: true,
      competitors: [
        {
          competitor_name: 'Anna Speed',
          country_flag_url: 'path/to/flag1.png',
          country_id: 'USA',
          result_mark: '3:45:12',
          position: 0,
          result_winnerLoserTie: 'W'
        },
        {
          competitor_name: 'Elena Fast',
          country_flag_url: 'path/to/flag2.png',
          country_id: 'ITA',
          result_mark: '3:45:18',
          position: 1,
          result_winnerLoserTie: 'L'
        },
        {
          competitor_name: 'Maria Quick',
          country_flag_url: 'path/to/flag3.png',
          country_id: 'ESP',
          result_mark: '3:45:22',
          position: 2,
          result_winnerLoserTie: 'L'
        },
        {
          competitor_name: '',
          country_flag_url: 'path/to/flag4.png', // Falsy name
          country_id: 'FRA',
          result_mark: '3:45:30',
          position: 3,
          result_winnerLoserTie: 'L'
        },
        {
          competitor_name: 'Ghost Rider',
          country_flag_url: '',  
          country_id: '',
          result_mark: '',
          position: 4,
          result_winnerLoserTie: ''
        }
      ]
    };
  
    render(EventDetails, { data: { eventResponse: { data: mockEvent }, error: null } });
  
    expect(screen.getByText('Cycling')).toBeTruthy();
    expect(screen.getByText('Road Race')).toBeTruthy();
    expect(screen.getByText('City Circuit')).toBeTruthy();
  
    expect(screen.getByText('1. Anna Speed')).toBeTruthy();
    expect(screen.getByText('2. Elena Fast')).toBeTruthy();
    expect(screen.getByText('3. Maria Quick')).toBeTruthy();
    expect(screen.getByText('3:45:12')).toBeTruthy();
    expect(screen.getByText('3:45:18')).toBeTruthy();
    expect(screen.getByText('3:45:22')).toBeTruthy();
  
    expect(screen.queryByText('3:45:30')).toBeNull();
    expect(screen.queryByText('Ghost Rider')).toBeNull();
  });
  
  
});
