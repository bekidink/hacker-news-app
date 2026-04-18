import React, { useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { FadeInRight, Layout } from 'react-native-reanimated';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import { ArticleCard } from '../../components/feed/ArticleCard';

const BookmarkScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { bookmarks, toggleBookmark } = useBookmarkStore();

  const handleRemove = (item: any) => {
    Alert.alert(
      "Remove Bookmark",
      "Are you sure you want to remove this story from your library?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive", 
          onPress: () => toggleBookmark(item) 
        }
      ]
    );
  };

  const renderRightActions = (item: any) => (
    <TouchableOpacity 
      style={styles.deleteAction} 
      onPress={() => handleRemove(item)}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderItem = useCallback(({ item, index }: any) => (
    <Animated.View 
      entering={FadeInRight.delay(index * 100)} 
      layout={Layout.springify()}
      style={styles.cardWrapper}
    >
      <Swipeable
        renderRightActions={() => renderRightActions(item)}
        friction={2}
        rightThreshold={40}
      >
        <ArticleCard 
          story={item} 
          onPress={() => navigation.navigate('ArticleDetail', { story: item })} 
        />
      </Swipeable>
    </Animated.View>
  ), [navigation]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIllustration}>
        <View style={styles.circleLarge} />
        <View style={styles.circleSmall} />
        <Text style={styles.emptyIcon}>🔖</Text>
      </View>
      <Text style={styles.emptyTitle}>Your Library is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Save interesting articles to read them later, even when you're offline.
      </Text>
      <TouchableOpacity 
        style={styles.exploreBtn}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewsFeed')}
      >
        <Text style={styles.exploreBtnText}>Browse Trending</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        
        <View style={[styles.headerContainer, { paddingTop: insets.top + 10 }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.labelSmall}>SAVED ARTICLES</Text>
              <View style={styles.titleRow}>
                <Text style={styles.headerTitle}>Library</Text>
                {bookmarks.length > 0 && (
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{bookmarks.length}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        <Animated.FlatList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item: any) => `bookmark-${item.id}`}
          contentContainerStyle={[
            styles.listContent, 
            bookmarks.length === 0 && { flex: 1 }
          ]}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={Layout.springify()} // Smooth list re-ordering
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 24,
    paddingBottom: 25,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 15 },
      android: { elevation: 8 },
    }),
    zIndex: 10,
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  labelSmall: { fontSize: 11, fontWeight: '800', color: '#9CA3AF', letterSpacing: 1.5, marginBottom: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 32, fontWeight: '900', color: '#111827', letterSpacing: -1 },
  countBadge: { backgroundColor: '#FF6600', paddingHorizontal: 10, height: 24, borderRadius: 12, justifyContent: 'center', marginLeft: 12 },
  countText: { color: '#FFF', fontSize: 13, fontWeight: '800' },
  listContent: { paddingTop: 20, paddingBottom: 40 },
  cardWrapper: { paddingHorizontal: 16, marginBottom: 12 },
  deleteAction: {
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '90%', // Align with card height
    borderRadius: 16,
    marginLeft: 8,
  },
  deleteText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyIllustration: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  circleLarge: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF4ED' },
  circleSmall: { position: 'absolute', width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFE5D4', right: 0, bottom: 0 },
  emptyIcon: { fontSize: 50 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#111827', marginBottom: 12 },
  emptySubtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 35 },
  exploreBtn: { backgroundColor: '#111827', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 16, elevation: 4 },
  exploreBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});

export default BookmarkScreen;