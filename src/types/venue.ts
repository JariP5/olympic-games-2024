export interface Venue {
    id: string;
    name: string;
    url: string;
}

export interface VenueResponse {
    data: Venue[];
}