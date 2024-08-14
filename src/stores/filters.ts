import { writable } from 'svelte/store';

export interface FilterState {
    currentPage: number;
    selectedDiscipline: string | null;
    selectedVenue: string | null;
    selectedDay: string | null;
}

const initialState: FilterState = {
    currentPage: 1,
    selectedDiscipline: null,
    selectedVenue: null,
    selectedDay: null
};

export const filterStore = writable<FilterState>(initialState);

export const setPage = (page: number) => {
    filterStore.update(state => ({ ...state, currentPage: page }));
};

export const setDiscipline = (discipline: string | null) => {
    filterStore.update(state => ({ ...state, selectedDiscipline: discipline }));
};

export const setVenue = (venue: string | null) => {
    filterStore.update(state => ({ ...state, selectedVenue: venue }));
};

export const setDay = (day: string | null) => {
    filterStore.update(state => ({ ...state, selectedDay: day }));
};
