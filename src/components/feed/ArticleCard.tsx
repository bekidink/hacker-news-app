import React, { memo } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, Platform } from 'react-native';

export const ArticleCard = memo(({ story, onPress }: any) => {
  const domain = story.url ? new URL(story.url).hostname.replace('www.', '') : 'news.ycombinator.com';
  const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`; // Higher res favicon

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={onPress} 
        activeOpacity={0.85}
      >
        <View style={styles.headerRow}>
          <View style={styles.sourceBadge}>
            <Image source={{ uri: favicon }} style={styles.favicon} />
            <Text style={styles.domainText}>{domain}</Text>
          </View>
          <Text style={styles.timeText}>{new Date(story.time * 1000).toLocaleDateString()}</Text>
        </View>

        <Text style={styles.title} numberOfLines={3}>{story.title}</Text>

        <View style={styles.footer}>
          <View style={styles.statBox}>
            <Text style={styles.statIcon}>▲</Text>
            <Text style={styles.statText}>{story.score}</Text>
          </View>
          <View style={styles.authorBox}>
            <Text style={styles.byText}>by </Text>
            <Text style={styles.authorName}>{story.by}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  favicon: { width: 14, height: 14, marginRight: 6, borderRadius: 2 },
  domainText: { fontSize: 11, fontWeight: '600', color: '#6B7280', textTransform: 'lowercase' },
  timeText: { fontSize: 11, color: '#9CA3AF' },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 24,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  statBox: { flexDirection: 'row', alignItems: 'center' },
  statIcon: { color: '#3B82F6', fontSize: 12, marginRight: 4 },
  statText: { fontWeight: '700', color: '#374151', fontSize: 13 },
  authorBox: { flexDirection: 'row' },
  byText: { fontSize: 13, color: '#9CA3AF' },
  authorName: { fontSize: 13, fontWeight: '600', color: '#4B5563' },
});