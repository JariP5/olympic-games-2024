import type { PaginationLinks, PaginationMeta } from "./pagination";

interface CountryMedals {
    id: string, // Three letter string
    name: string,
    continent: string, // Three letter string
    flag_url: string,
    gold_medals: number,
    silver_medals: number,
    bronze_medals: number,
    total_medals: number,
    rank: number,
    rank_total_medals: number
}

export interface CountryMedalsResponse {
    data: CountryMedals[];
    links: PaginationLinks;
    meta: PaginationMeta;
}