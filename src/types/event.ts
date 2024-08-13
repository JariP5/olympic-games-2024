import type { Competitor } from "./competitor";
import type { PaginationLinks, PaginationMeta } from "./pagination";

interface Event {
    id: number;
    day: string; // Format: YYYY-MM-DD
    discipline_name: string;
    discipline_pictogram: string;
    name: string | null;
    venue_name: string;
    event_name: string;
    detailed_event_name: string;
    start_date: string; // Format: YYYY-MM-DDTHH:MM:SS+TZ
    end_date: string; // Format: YYYY-MM-DDTHH:MM:SS+TZ
    status: string;
    is_medal_event: number; // 1 for yes, 0 for no
    is_live: number; // 1 for yes, 0 for no
    gender_code: string; // 'W' for Women, 'M' for Men
    competitors: Competitor[];
}

  
export interface EventResponse {
    data: Event[];
    links: PaginationLinks;
    meta: PaginationMeta;
}