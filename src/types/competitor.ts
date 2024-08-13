export interface Competitor {
    country_id: string; // Country name in local language
    country_flag_url: string;
    competitor_name: string;
    position: number; // 0-based index; 0 = 1st place if competitors > 2, 0 = 2nd place if competitors = 2
    result_position: string; 
    result_winnerLoserTie: string; // 'W' for Win, 'L' for Lose, 'T' for Tie
    result_mark: string; // Score achieved by the competitor
}