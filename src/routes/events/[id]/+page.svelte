<script lang="ts">
  export let data: {
    event: Event | null;
    error: string | null;
  };

  const { event, error } = data.props;
  const eventData = event.data;

  // Function to format dates
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


</script>

<section>
  {#if eventData}
    <h1>{eventData.event_name}</h1>
    <p><strong>Discipline:</strong> {eventData.discipline_name}</p>
    <p><strong>Date:</strong> {formatDate(eventData.start_date)} - {formatDate(eventData.end_date)}</p>
    <p><strong>Venue:</strong> {eventData.venue_name}</p>
  {:else if error}
    <p>{error}</p>
  {:else}
    <p>Loading event details...</p>
  {/if}
</section>

<style>
  /* Add your styles here */
</style>
