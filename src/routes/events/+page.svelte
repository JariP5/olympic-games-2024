<script lang="ts">
    import { onMount } from 'svelte';
    import { events, fetchEvents, fetchDisciplines, fetchVenues, disciplines, venues } from '../../stores/events';
    import type { EventResponse, Discipline, Venue } from '../../types';

    let currentPage = 1;
    let selectedDiscipline: string | null = null;
    let selectedVenue: string | null = null;

    let eventList: EventResponse | null = null;
    let availableDisciplines: Discipline[] = [];
    let availableVenues: Venue[] = [];

    onMount(async () => {
        fetchEvents(`?page=${currentPage}`);
        fetchDisciplines();
        fetchVenues();
        
        const unsubscribeEvents = events.subscribe(data => {
            eventList = data;
        });
        const unsubscribeDisciplines = disciplines.subscribe(data => {
            availableDisciplines = data;
        });
        const unsubscribeVenues = venues.subscribe(data => {
            availableVenues = data;
        });

        return () => {
        unsubscribeEvents();
        unsubscribeDisciplines();
        unsubscribeVenues();
        };
    });

    function applyFilters() {
        let query = `?page=${currentPage}`;
        if (selectedDiscipline) query += `&discipline=${selectedDiscipline}`;
        if (selectedVenue) query += `&venue=${selectedVenue}`;
        fetchEvents(query);
    }

    function goToPage(page: number) {
        currentPage = page;
        applyFilters();
    }

    function handleDisciplineChange(event: Event) {
        currentPage = 1;
        selectedDiscipline = (event.target as HTMLSelectElement).value;
        console.log(selectedDiscipline);
        console.log("Here");
        applyFilters();
    }

    function handleVenueChange(event: Event) {
        currentPage = 1;
        selectedVenue = (event.target as HTMLSelectElement).value;
        applyFilters();
    }

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return '';
            }
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        } catch (error) {
            console.error('Error formatting date:', error);
            return ''; 
        }
    };
</script>

<section class="events-section">
  <h1>Events</h1>
  
    <div class="filters">
        <label for="discipline">Discipline:</label>
        <select id="discipline" on:change={handleDisciplineChange}>
            <option value="">All Disciplines</option>
            {#each availableDisciplines as discipline}
                <option value={discipline.id}>{discipline.name}</option>
            {/each}
        </select>

        <label for="venue">Venue:</label>
        <select id="venue" on:change={handleVenueChange}>
            <option value="">All Venues</option>
            {#each availableVenues as venue}
                <option value={venue.name}>{venue.name}</option>
            {/each}
        </select>
    </div>

    {#if eventList}
        <table class="events-table">
        <thead>
            <tr>
                <th>Discipline</th>
                <th>Event Name</th>
                <th>Date</th>
                <th>Venue</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each eventList.data as event}
                <tr>
                    <td>{event.discipline_name}</td>
                    <td>{event.event_name}</td>
                    <td>{formatDate(event.day)}</td>
                    <td>{event.venue_name}</td>
                    <td><a href={`/events/${event.id}`}>See More</td>
                </tr>
            {/each}
        </tbody>
        </table>

        <div class="pagination">
            <button disabled={eventList.meta.current_page === 1} on:click={() => goToPage(eventList.meta.current_page - 1)}>Previous</button>
            <span>Page {eventList.meta.current_page} of {eventList.meta.last_page}</span>
            <button disabled={eventList.meta.current_page === eventList.meta.last_page} on:click={() => goToPage(eventList.meta.current_page + 1)}>Next</button>
        </div>
    {:else}
        <p>Loading events...</p>
    {/if}
</section>

<style>
    .events-section {
        max-width: 900px;
        margin: 0 auto;
        padding: 1rem;
        font-family: Arial, sans-serif;
    }

    .filters {
        margin-bottom: 1rem;
    }

    .filters label {
        margin-right: 0.5rem;
    }

    .filters select {
        margin-right: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .events-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    .events-table th,
    .events-table td {
        padding: 0.75rem;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }

    .events-table th {
        background-color: #f4f4f4;
    }

    .pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pagination button {
        padding: 0.5rem 1rem;
        border: none;
        background-color: #007bff;
        color: white;
        border-radius: 4px;
        cursor: pointer;
    }

    .pagination button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .pagination span {
        font-size: 1rem;
    }
</style>
