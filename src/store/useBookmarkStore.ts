import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import * as MMKVStorage from 'react-native-mmkv'; // Import the namespace
import { Story } from '../types';
import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV()

const mmkvStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: (name) => storage.getString(name) ?? null,
  removeItem: (name) => storage.remove(name),
};

// ... rest of your useBookmarkStore implementation
interface BookmarkState {
  bookmarks: Story[];
  toggleBookmark: (story: Story) => void;
  isBookmarked: (id: number) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (story) => {
        const { bookmarks } = get();
        const exists = bookmarks.find((b) => b.id === story.id);
        if (exists) {
          set({ bookmarks: bookmarks.filter((b) => b.id !== story.id) });
        } else {
          set({ bookmarks: [...bookmarks, story] });
        }
      },
      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),
    }),
    {
      name: 'bookmark-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);