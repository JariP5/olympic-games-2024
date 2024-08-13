<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchMedals } from '../stores/medals';
    import type { CountryMedalsResponse, CountryMedals } from '../types';
    import { writable } from 'svelte/store';
    import goldMedal from '../assets/gold-medal.svg';
    import silverMedal from '../assets/silver-medal.svg';
    import bronzeMedal from '../assets/bronze-medal.svg';
    import allMedals from '../assets/all-medals.svg';

    let medals: CountryMedals[] = [];
    let error: string | null = null;
    const sortByTotal = writable(false);

    onMount(async () => {
        try {
            const response: CountryMedalsResponse = await fetchMedals();
            medals = response.data.sort((a, b) => a.rank - b.rank);
        } catch (err) {
            error = 'Failed to load medals. Please try again later.';
            console.error('Error fetching medals:', err);
        }
    });

    $: sortedMedals = medals.slice().sort((a, b) => {
        return $sortByTotal ? b.total_medals - a.total_medals : a.rank - b.rank;
    });

    function toggleSorting() {
        sortByTotal.update(value => !value);
    }
</script>

<section>
    <h1>Medals Table</h1>
    <div class="sort-toggle">
        <button 
            class:active={!$sortByTotal} 
            on:click={toggleSorting} 
            disabled={!$sortByTotal}
        >
            Sort by Rank
        </button>
        <button 
            class:active={$sortByTotal} 
            on:click={toggleSorting} 
            disabled={$sortByTotal}
        >
            Sort by Total
        </button>
    </div>
        
    {#if error}
        <p class="error">{error}</p>
    {:else if sortedMedals.length}
        <table>
            <thead>
                <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>
                        <img src={goldMedal} alt="Gold Medal" width="16" height="16" /> Gold
                    </th>
                    <th>
                        <img src={silverMedal} alt="Silver Medal" width="16" height="16" /> Silver
                    </th>
                    <th>
                        <img src={bronzeMedal} alt="Bronze Medal" width="16" height="16" /> Bronze
                    </th>
                    <th>
                        <img src={allMedals} alt="All Medals" width="16" height="16" /> Total
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each sortedMedals as medal}
                <tr>
                    <td><img src={medal.flag_url} alt={medal.name} width="32" /></td>
                    <td>{medal.name}</td>
                    <td class="center">{medal.gold_medals}</td>
                    <td class="center">{medal.silver_medals}</td>
                    <td class="center">{medal.bronze_medals}</td>
                    <td class="center">{medal.total_medals}</td>
                </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>Loading medals...</p>
    {/if}
</section>

<style>
    .error {
        color: red;
        font-weight: bold;
    }
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
        font-size: 1rem;
        text-align: left;
    }
    th, td {
        padding: 12px;
        border-bottom: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
    }
    th, img {
        vertical-align: middle;
    }
    tr:hover {
        background-color: #f5f5f5;
    }
    td.center {
        text-align: center;
    }
    .sort-toggle {
        display: flex;
        margin-bottom: 20px;
    }
    .sort-toggle button {
        padding: 10px 15px;
        font-size: 1rem;
        cursor: pointer;
        background-color: #007BFF;
        color: white;
        border: 2px solid transparent;
        border-radius: 5px;
        flex: 1;
        text-align: center;
        transition: background-color 0.3s, border-color 0.3s;
    }
    .sort-toggle button:not(:last-child) {
        margin-right: 10px;
    }
    .sort-toggle button.active {
        background-color: #0056b3;
        border-color: #ffcc00;
        cursor: not-allowed;
    }
    .sort-toggle button:hover:not(:disabled) {
        background-color: #0056b3;
    }
</style>
