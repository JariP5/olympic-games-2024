import { writable } from 'svelte/store';
import type { Discipline, DisciplineResponse } from '../types/discipline';
import type { EventResponse } from '../types/event';
import type { Venue, VenueResponse } from '../types/venue';

const events = writable<EventResponse | null>(null);
const disciplines = writable<Discipline[]>([]);
const venues = writable<Venue[]>([]);

const fetchEvents = async (query: string) => {
    try {
        const response = await fetch(`https://apis.codante.io/olympic-games/events${query}`);
        const data: EventResponse = await response.json();
        events.set(data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

const fetchDisciplines = async () => {
    try {
        const response = await fetch('https://apis.codante.io/olympic-games/disciplines');
        const data: DisciplineResponse = await response.json();
        disciplines.set(data.data);
    } catch (error) {
        console.error('Error fetching disciplines:', error);
    }
};

const fetchVenues = async () => {
    try {
        const response = await fetch('https://apis.codante.io/olympic-games/venues');
        const data: VenueResponse = await response.json();
        venues.set(data.data);
    } catch (error) {
        console.error('Error fetching venues:', error);
    }
};

const fetchEventById = async (id: number) => {
    const response = await fetch(`https://apis.codante.io/olympic-games/events/${id}`)
    if (!response.ok) throw new Error('Network response was not ok');
    const data: Event = await response.json();
    return data;
};

export { disciplines, events, fetchDisciplines, fetchEventById, fetchEvents, fetchVenues, venues };

