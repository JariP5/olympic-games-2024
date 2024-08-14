import type { CountryMedalsResponse } from "../types/medals";

export async function fetchMedals(): Promise<CountryMedalsResponse> {
    const response = await fetch('https://apis.codante.io/olympic-games/countries');
    if (!response.ok) throw new Error('Failed to fetch medals');
    return response.json();
}

