import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AdvancedHeader = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.outerContainer}>
      <View style={[
        styles.headerSheet, 
        { paddingTop: insets.top + 10, paddingBottom: 25 }
      ]}>
        <View style={styles.content}>
          <View>
            <Text style={styles.dateLabel}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Hacker</Text>
              <View style={styles.dot} />
              <Text style={styles.title}>News</Text>
            </View>
          </View>
          
        
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F3F4F6',
  },
  headerSheet: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 32, 
    borderBottomRightRadius: 32,
   
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280', 
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#374151', 
    letterSpacing: -0.5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6', 
    marginHorizontal: 6,
    marginTop: 8,
  }
  
});