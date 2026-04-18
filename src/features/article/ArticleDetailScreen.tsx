import React, { useLayoutEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Share, 
  Linking, 
  Platform,
  StatusBar 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedStackParamList } from '../../navigation/types';
import { useBookmarkStore } from '../../store/useBookmarkStore';

type Props = NativeStackScreenProps<FeedStackParamList, 'ArticleDetail'>;

const ArticleDetailScreen = ({ route, navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const { story } = route.params;
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const bookmarked = isBookmarked(story.id);

  const domain = story.url ? new URL(story.url).hostname.replace('www.', '') : 'news.ycombinator.com';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
      headerLeft: () => (
        <TouchableOpacity 
          style={[styles.blurBtn, { marginTop: insets.top > 0 ? 0 : 10 }]} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnIcon}>←</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={[styles.headerActions, { marginTop: insets.top > 0 ? 0 : 10 }]}>
          <TouchableOpacity onPress={handleShare} style={styles.blurBtn}>
            <Text style={styles.btnIcon}>⎋</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleBookmark(story)} style={styles.blurBtn}>
            <Text style={[styles.btnIcon, bookmarked && { color: '#FF6600' }]}>
              {bookmarked ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, bookmarked, story, insets.top]);

  const handleShare = async () => {
    try {
      await Share.share({
        title: story.title,
        message: `${story.title}\n\nRead more: ${story.url}`,
        url: story.url,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenSource = useCallback(() => {
    if (story.url) {
      Linking.openURL(story.url).catch(err => console.error(err));
    }
  }, [story.url]);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 70, paddingBottom: insets.bottom + 100 }]}
      >
        <View style={styles.badgeContainer}>
          <View style={styles.domainBadge}>
            <Text style={styles.domainText}>{domain}</Text>
          </View>
        </View>

        <Text style={styles.mainTitle}>{story.title}</Text>

        <View style={styles.authorRow}>
          <View style={styles.authorGroup}>
            <View style={styles.avatarCircle}>
               <Text style={styles.avatarLetter}>{story.by.charAt(0).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.labelSmall}>CONTRIBUTOR</Text>
              <Text style={styles.authorName}>{story.by}</Text>
            </View>
          </View>
          <View >
             <Text style={styles.dateText}>{new Date(story.time * 1000).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.metricGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>🔥</Text>
            <Text style={styles.metricValue}>{story.score}</Text>
            <Text style={styles.metricLabel}>UPVOTES</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>💬</Text>
            <Text style={styles.metricValue}>{story?.kids?.length || 0}</Text>
            <Text style={styles.metricLabel}>COMMENTS</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricEmoji}>🕒</Text>
            <Text style={styles.metricValue}>{Math.floor((Date.now() / 1000 - story.time) / 3600)}h</Text>
            <Text style={styles.metricLabel}>AGE</Text>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryHeading}>Insight</Text>
          <Text style={styles.summaryText}>
            This submission is currently gaining traction on Hacker News. To dive deeper into the technical discussions or verify the source data, proceed to the full article.
          </Text>
        </View>

        <View style={styles.sourcePreview}>
          <Text style={styles.urlLabel}>SOURCE LINK</Text>
          <Text style={styles.urlText} numberOfLines={1}>{story.url}</Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Button for better Reachability */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity style={styles.primaryAction} onPress={handleOpenSource}>
          <Text style={styles.primaryActionText}>Read Full Article</Text>
          <Text style={styles.primaryActionSub}>Opens in external browser</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { paddingHorizontal: 24 },
  blurBtn: {
    backgroundColor: 'rgba(243, 244, 246, 0.9)',
    width: 42, height: 42, borderRadius: 21,
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)'
  },
  btnIcon: { fontSize: 20, color: '#111827', fontWeight: '600' },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  badgeContainer: { marginBottom: 16 },
  domainBadge: {
    backgroundColor: '#FFF4ED',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#FF6600'
  },
  domainText: { color: '#FF6600', fontSize: 12, fontWeight: '800', letterSpacing: 0.5 },
  mainTitle: {
    fontSize: 28, fontWeight: '800', color: '#111827',
    lineHeight: 36, letterSpacing: -0.5, marginBottom: 28
  },
  authorRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 32, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: '#F3F4F6'
  },
  authorGroup: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center', marginRight: 12
  },
  avatarLetter: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  labelSmall: { fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 1 },
  authorName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  dateText: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  metricGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  metricCard: {
    flex: 1, backgroundColor: '#F9FAFB', marginHorizontal: 4,
    borderRadius: 16, paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#F3F4F6'
  },
  metricEmoji: { fontSize: 20, marginBottom: 4 },
  metricValue: { fontSize: 18, fontWeight: '800', color: '#111827' },
  metricLabel: { fontSize: 9, color: '#9CA3AF', fontWeight: '800', marginTop: 2 },
  summarySection: { marginBottom: 32 },
  summaryHeading: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
  summaryText: { fontSize: 16, color: '#4B5563', lineHeight: 26 },
  sourcePreview: {
    padding: 20, backgroundColor: '#F3F4F6', borderRadius: 16, borderStyle: 'dashed',
    borderWidth: 1, borderColor: '#D1D5DB'
  },
  urlLabel: { fontSize: 10, fontWeight: '800', color: '#6B7280', marginBottom: 4 },
  urlText: { fontSize: 14, color: '#111827', fontWeight: '500' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 24, paddingTop: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopWidth: 1, borderTopColor: '#F3F4F6'
  },
  primaryAction: {
    backgroundColor: '#FF6600',
    borderRadius: 16, paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#FF6600', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 5
  },
  primaryActionText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  primaryActionSub: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600', marginTop: 2 }
});

export default ArticleDetailScreen;