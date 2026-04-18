import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <View style={styles.center}>
    <Text>Failed to load news.</Text>
    <Button title="Retry" onPress={onRetry} />
  </View>
);

export const EmptyState = () => (
  <View style={styles.center}>
    <Text>No articles found at this time.</Text>
  </View>
);

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }
});