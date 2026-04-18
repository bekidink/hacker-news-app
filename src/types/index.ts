export interface HNStory {
  id: number;
  title: string;
  url?: string;
  by: string;
  score: number;
  time: number;
  type: string;
}

export interface FeedState {
  stories: HNStory[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  sortBy: 'score' | 'time';
  bookmarks: number[]; 
}



export interface Story {
  id: number;          
  title: string;         
  url: string;          // [cite: 31, 33]
  by: string;           // author 
  score: number;        // 
  time: number;         // unix timestamp 
  type: 'story' | 'job' | 'comment' | 'poll' | 'pollopt'; // 
}

export type SortOrder = 'score' | 'time'; //