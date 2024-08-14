import { describe, expect, it } from 'vitest';
import { filterStore, setDay, setDiscipline, setPage, setVenue } from '../../stores/filters';

describe('filterStore', () => {
  it('should initialize with the correct default state', () => {
    let state;
    const unsubscribe = filterStore.subscribe((value: unknown) => {
      state = value;
    });
    
    expect(state).toEqual({
      currentPage: 1,
      selectedDiscipline: null,
      selectedVenue: null,
      selectedDay: null
    });
    
    unsubscribe();
  });

  it('should update currentPage with setPage', () => {
    const newPage = 2;
    
    setPage(newPage);

    let state;
    const unsubscribe = filterStore.subscribe((value: unknown) => {
      state = value;
    });

    expect(state!.currentPage).toBe(newPage);
    
    unsubscribe();
  });

  it('should update selectedDiscipline with setDiscipline', () => {
    const newDiscipline = 'Swimming';

    setDiscipline(newDiscipline);

    let state;
    const unsubscribe = filterStore.subscribe((value: unknown) => {
      state = value;
    });

    expect(state!.selectedDiscipline).toBe(newDiscipline);
    
    unsubscribe();
  });

  it('should update selectedVenue with setVenue', () => {
    const newVenue = 'Olympic Pool';

    setVenue(newVenue);

    let state;
    const unsubscribe = filterStore.subscribe((value: unknown) => {
      state = value;
    });

    expect(state!.selectedVenue).toBe(newVenue);
    
    unsubscribe();
  });

  it('should update selectedDay with setDay', () => {
    const newDay = '2024-08-14';

    setDay(newDay);

    let state;
    const unsubscribe = filterStore.subscribe((value: unknown) => {
      state = value;
    });

    expect(state!.selectedDay).toBe(newDay);
    
    unsubscribe();
  });
});
