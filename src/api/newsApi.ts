// src/api/newsApi.ts
import { Story } from '../types';
import { api } from './client';

/**
 * Fetches top stories and resolves their details in parallel.
 */
export const newsApi = {
  getTopStoryIds: async (): Promise<number[]> => {
    // GET /topstories.json returns an array of integer IDs 
    const response = await api.get<number[]>('topstories.json');
    return response.data;
  },

  getItemById: async (id: number): Promise<Story> => {
    // GET /item/{id}.json returns the item object 
    const response = await api.get<Story>(`item/${id}.json`);
    return response.data;
  },

  /**
   * Orchestrator function to satisfy Section 01 requirements [cite: 32, 33]
   */
  fetchTopStoriesDetailed: async (limit: number = 20): Promise<Story[]> => {
    const allIds = await newsApi.getTopStoryIds();
    const topIds = allIds.slice(0, limit);

    // Fetch details in parallel using Promise.all 
    const storyPromises = topIds.map((id) => newsApi.getItemById(id));
    const results = await Promise.all(storyPromises);

    // Filter to items where type === 'story' and a url exists 
    return results.filter(
      (item) => item && item.type === 'story' && item.url
    );
  },
};