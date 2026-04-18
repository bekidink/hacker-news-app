import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { 
  FlatList, 
  RefreshControl, 
  View, 
  ActivityIndicator, 
  StyleSheet, 
  TextInput
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
const [searchQuery, setSearchQuery] = useState('');

  
  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const filteredStories = useMemo(() => {
    let result = [...stories];

    // Local filtering: no additional API calls 
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(story => 
        story.title.toLowerCase().includes(query) || 
        story.by.toLowerCase().includes(query)
      );
    }

    // Sort logic [cite: 40]
    return result.sort((a, b) => {
      return sortOrder === 'score' 
        ? b.score - a.score 
        : b.time - a.time;
    });
  }, [stories, sortOrder, searchQuery]);

  const sortedStories = useMemo(() => {
    return [...stories].sort((a, b) => {
      return sortOrder === 'score' 
        ? b.score - a.score 
        : b.time - a.time;
    });
  }, [stories, sortOrder]);

  
  const renderItem = useCallback(({ item }: { item: Story }) => (
    <ArticleCard 
      story={item} 
      onPress={() => navigation.navigate('ArticleDetail', { story: item })} 
    />
  ), [navigation]);

   
  const keyExtractor = useCallback((item: Story) => item.id.toString(), []);

  
  const getItemLayout = (_: any, index: number) => ({
    length: 100, 
    offset: 100 * index,
    index,
  });

  if (loading && stories.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" /> 
      </View>
    ); 
  }

  if (error) {
    return <ErrorState onRetry={fetchStories} />;
  }

  return (
    <View style={styles.container}>
        <AdvancedHeader />
        <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search stories..."
          placeholderTextColor={'#000'}
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery} // Updates state on every keystroke
          clearButtonMode="while-editing"
        />
      </View>
      <SortToggle />
      <FlatList
        data={filteredStories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchStories} />
        } // Pull-to-refresh implementation [cite: 36]
        ListEmptyComponent={<EmptyState />} // Handle empty state UI [cite: 38]
        contentContainerStyle={filteredStories.length === 0 && styles.flex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  flex: { flex: 1 },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    color: '#111827',
    
  }
});
export default NewsFeedScreen;