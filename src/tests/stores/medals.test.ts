import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetchMedals } from '../../stores/medals';
import type { CountryMedalsResponse } from '../../types/medals';

describe('Medals Store', () => {
    beforeEach(() => {
      vi.restoreAllMocks();
    });
  
    it('should fetch and return the medals data successfully', async () => {
      const mockResponse: CountryMedalsResponse = {
        data: [
          { id: 'USA', name: 'USA', continent: 'NA', flag_url: 'path/to/flag1.png', gold_medals: 10, silver_medals: 5, bronze_medals: 3, total_medals: 18, rank: 1, rank_total_medals: 1 },
          { id: 'CHN', name: 'China', continent: 'AS', flag_url: 'path/to/flag2.png', gold_medals: 8, silver_medals: 10, bronze_medals: 5, total_medals: 23, rank: 2, rank_total_medals: 2 },
        ],
        links: { first: '', last: '', prev: '', next: '' },
        meta: { current_page: 1, from: 1, last_page: 1, path: '', per_page: 2, to: 2, total: 2 },
      };
  
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);
  
      const result = await fetchMedals();
      expect(result).toEqual(mockResponse);
    });
  
    it('should throw an error when the API call fails', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
        ok: false,
      } as Response);
  
      await expect(fetchMedals()).rejects.toThrow('Failed to fetch medals');
    });
});
