import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  FlatList, 
  RefreshControl, 
  View, 
  ActivityIndicator, 
  StyleSheet 
} from 'react-native';
import { useNewsStore } from '../../store/useNewsStore';
import { ArticleCard } from '../../components/feed/ArticleCard';
import { Story } from '../../types';
import { EmptyState, ErrorState } from '../../components/shared/ErrorState';
import { SortToggle } from '../../components/feed/SortToggle';
import { AdvancedHeader } from '../../components/feed/AdvancedHeader';


 const NewsFeedScreen = ({ navigation }: any) => {
  const { 
    stories, 
    loading, 
    error, 
    fetchStories, 
    sortOrder 
  } = useNewsStore();

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  // Memoize sorted data to prevent expensive recalculations on every render [cite: 25, 40]
  const sortedStories = useMemo(() => {
    return [...stories].sort((a, b) => {
      return sortOrder === 'score' 
        ? b.score - a.score 
        : b.time - a.time;
    });
  }, [stories, sortOrder]);

  // Optimized renderItem with useCallback to maintain referential identity [cite: 25, 58, 62]
  const renderItem = useCallback(({ item }: { item: Story }) => (
    <ArticleCard 
      story={item} 
      onPress={() => navigation.navigate('ArticleDetail', { story: item })} 
    />
  ), [navigation]);

  // keyExtractor ensures efficient list updates 
  const keyExtractor = useCallback((item: Story) => item.id.toString(), []);

  // getItemLayout improves performance for long lists by skipping layout measurement 
  const getItemLayout = (_: any, index: number) => ({
    length: 100, // Approximate height of ArticleCard
    offset: 100 * index,
    index,
  });

  if (loading && stories.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" /> 
      </View>
    ); // ActivityIndicator used for first load [cite: 37]
  }

  if (error) {
    return <ErrorState onRetry={fetchStories} />; // Graceful error handling [cite: 25, 38]
  }

  return (
    <View style={styles.container}>
        <AdvancedHeader />
      <SortToggle />
      <FlatList
        data={sortedStories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchStories} />
        } // Pull-to-refresh implementation [cite: 36]
        ListEmptyComponent={<EmptyState />} // Handle empty state UI [cite: 38]
        contentContainerStyle={stories.length === 0 && styles.flex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  flex: { flex: 1 },
});
export default NewsFeedScreen;