import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useNewsStore } from '../../store/useNewsStore';


export const SortToggle = () => {
  const { sortOrder, setSortOrder } = useNewsStore();

  return (
    <View style={styles.floatingContainer}>
      <View style={styles.pill}>
        <TouchableOpacity
          onPress={() => setSortOrder('score')}
          style={[styles.segment, sortOrder === 'score' && styles.activeSegment]}
        >
          <Text style={[styles.label, sortOrder === 'score' && styles.activeLabel]}>Trending</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setSortOrder('time')}
          style={[styles.segment, sortOrder === 'time' && styles.activeSegment]}
        >
          <Text style={[styles.label, sortOrder === 'time' && styles.activeLabel]}>Latest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 30, 
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: 'rgba(31, 41, 55, 0.95)',
    borderRadius: 30,
    padding: 4,
    width: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 26,
  },
  activeSegment: {
    backgroundColor: '#3B82F6', 
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  activeLabel: {
    color: '#FFF',
  },
});