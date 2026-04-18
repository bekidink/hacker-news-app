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
  bookmarks: number[]; // store IDs only for persistence
}