<script lang="ts">
    import { formatDate } from './+page.ts';

    export let data: {
        eventResponse: EventResponse | null;
        error: string | null;
    };

    const { eventResponse, error } = data;
    const event = eventResponse?.data;
    
    const cleanedCompetitors = event?.competitors.filter((competitor) => competitor.country_id !== '' && competitor.competitor_name !== '');
    const sortedCompetitors = cleanedCompetitors?.slice().sort((a, b) => a.position - b.position);

    const isTwoCompetitors = cleanedCompetitors && cleanedCompetitors.length === 2;

    const getMedalIcon = (position: number): string => {
        switch (position) {
        case 0:
            return goldMedal;
        case 1:
            return silverMedal;
        case 2:
            return bronzeMedal;
        default:
            return '';
        }
    };

</script>

<section class="event-details">
    {#if event}
        <div class="event-info">
            <img src={event.discipline_pictogram} alt="Discipline Pictogram" class="discipline-icon" />
            <h1>{event.discipline_name}</h1>
            <h2> {event.event_name}</h2>
            <p><strong>Date:</strong> {formatDate(event.start_date)} - {formatDate(event.end_date)}</p>
            <p><strong>Venue:</strong> {event.venue_name}</p>
            {#if event.is_medal_event}
                <p class="medal-event">🏅 Medal Event</p>
            {/if}
        </div>

        {#if isTwoCompetitors}
            <div class="two-competitors">
                {#each cleanedCompetitors as competitor}
                    <div class="competitor {competitor.result_winnerLoserTie === 'W' ? 'winner' : competitor.result_winnerLoserTie === 'T' ? 'tie' : 'loser'}">
                        <img src={competitor.country_flag_url} alt={competitor.country_id} class="country-flag" />
                        <p>{competitor.competitor_name}</p>
                        <p>{competitor.result_mark}</p>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="multi-competitors">
                {#each sortedCompetitors as competitor}
                    <div class="competitor">
                        <p>{competitor.position + 1}. {competitor.competitor_name}</p>
                        <p>{competitor.result_mark}</p>
                    </div>
                {/each}
            </div>
        {/if}
    {:else if error}
        <p class="error">{error}</p>
    {:else}
        <p>Loading event details...</p>
    {/if}
</section>

<style>
    .event-details {
        max-width: 800px;
        margin: 2rem auto;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        font-family: Arial, sans-serif;
    }

    .event-info {
        margin-bottom: 2rem;
        text-align: center;
    }

    .discipline-icon {
        height: 50px;
        vertical-align: middle;
        margin-bottom: 100;
    }

    .event-info h1 {
        font-size: 1.5rem;
    }

    .event-info p {
        margin: 0.5rem 0;
    }

    .medal-event {
        font-weight: bold;
    }

    .two-competitors {
        display: flex;
        justify-content: space-around;
        align-items: center;
        word-wrap: break-word;
    }

    .multi-competitors {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .competitor {
        text-align: center;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #fff;
    }

    .competitor img.country-flag {
        height: 30px;
        margin-bottom: 0.5rem;
    }

    .competitor.winner {
        border-color: #28a745;
        background-color: #e9ffe9;
        width: 35%;
    }

    .competitor.loser {
        border-color: #dc3545;
        background-color: #ffe9e9;
        width: 35%;
    }

    .competitor.tie {
        border-color: #808080;
        background-color: #d3d3d3;
        width: 35%;
    }

    .error {
        color: #dc3545;
    }
</style>
