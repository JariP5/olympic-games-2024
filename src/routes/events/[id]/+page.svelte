<script lang="ts">
    export let data: {
        event: Event | null;
        error: string | null;
    };

    const { event, error } = data;
    const eventData = event?.data;

    const formatDate = (dateString: string): string => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '';

            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            };

            return new Intl.DateTimeFormat('en-US', options).format(date);
        } catch {
            return '';
        }
    };

    const isTwoCompetitors = eventData && eventData.competitors.length === 2;

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

    const sortedCompetitors = eventData?.competitors.slice().sort((a, b) => a.position - b.position);
</script>

<section class="event-details">
  {#if eventData}
    <div class="event-info">
      <img src={eventData.discipline_pictogram} alt="Discipline Pictogram" class="discipline-icon" />
      <h1>{eventData.discipline_name}</h1>
      <h2> {eventData.event_name}</h2>
      <p><strong>Date:</strong> {formatDate(eventData.start_date)} - {formatDate(eventData.end_date)}</p>
      <p><strong>Venue:</strong> {eventData.venue_name}</p>
      {#if eventData.is_medal_event}
        <p class="medal-event">🏅 Medal Event</p>
      {/if}
    </div>

    {#if isTwoCompetitors}
      <div class="two-competitors">
        {#each eventData.competitors as competitor}
          <div class="competitor {competitor.result_winnerLoserTie === 'W' ? 'winner' : 'loser'}">
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

  .medal-icon {
    height: 20px;
    margin-left: 0.5rem;
  }

  .error {
    color: #dc3545;
  }
</style>
