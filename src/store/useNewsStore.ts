import { create } from 'zustand';
import { newsApi } from '../api/newsApi'; 
import { SortOrder, Story } from '../types';

interface NewsState {
  stories: Story[];
  loading: boolean;
  error: boolean;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  fetchStories: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set) => ({
  stories: [],
  loading: false,
  error: false,
  sortOrder: 'score', 
  
  setSortOrder: (sortOrder) => set({ sortOrder }),
  
  fetchStories: async () => {
    set({ loading: true, error: false });
    
    try {
      const data = await newsApi.fetchTopStoriesDetailed(20);
      
      set({ 
        stories: data, 
        loading: false, 
        error: data.length === 0 
      });
    } catch (e) {
      // Graceful error state handling [cite: 38]
      set({ error: true, loading: false });
      console.error('Failed to fetch Hacker News stories:', e);
    }
  },
}));