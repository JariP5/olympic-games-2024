export interface Discipline {
    id: string;
    name: string;
    pictogram_url: string;
}

export interface DisciplineResponse {
    data: Discipline[];
}