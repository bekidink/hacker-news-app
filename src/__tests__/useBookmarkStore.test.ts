import { renderHook, act } from '@testing-library/react-native';
import { useBookmarkStore } from '../store/useBookmarkStore';

const mockStory = {
  id: 123,
  title: 'Test Story',
  url: 'https://test.com',
  by: 'author',
  score: 100,
  time: 1614556800,
  type: 'story'
};

describe('useBookmarkStore', () => {
  it('should toggle a bookmark correctly', () => {
    const { result } = renderHook(() => useBookmarkStore());

    expect(result.current.isBookmarked(mockStory.id)).toBe(false);

    act(() => {
      result.current.toggleBookmark(mockStory);
    });
    expect(result.current.isBookmarked(mockStory.id)).toBe(true);
    expect(result.current.bookmarks).toContainEqual(mockStory);

    act(() => {
      result.current.toggleBookmark(mockStory);
    });
    expect(result.current.isBookmarked(mockStory.id)).toBe(false);
    expect(result.current.bookmarks).toHaveLength(0);
  });
});