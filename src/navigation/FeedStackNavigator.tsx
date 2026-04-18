import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ArticleListScreen from '../features/feed/ArticleListScreen';
import ArticleDetailScreen from '../features/article/ArticleDetailScreen';
import { FeedStackParamList } from './types';

const Stack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArticleList"
        component={ArticleListScreen}
        options={{
          title: 'Hacker News',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={({ route }) => ({
          title: 'Article',
          headerShown: true,
          // Important for scroll position restoration
          detachPreviousScreen: false,
        })}
      />
    </Stack.Navigator>
  );
}