<script>
  	import Medals from './Medals.svelte';
</script>

<svelte:head>
	<title>Paris 2024</title>
	<meta name="description" content="Olympic Games App" />
</svelte:head>

<section>
	<Medals />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}
</style>
