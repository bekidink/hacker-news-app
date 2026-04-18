import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import FeedStackNavigator from './FeedStackNavigator';
import BookmarksScreen from '../features/bookmarks/BookmarksScreen';
import { RootTabParamList } from './types';
import { BookmarkingSelectedIcon, BookmarkingUnselectedIcon, HomeSelectedIcon, HomeUnselectedIcon } from '../constants/icons';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator(); // Optional root stack if needed later

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,           // Tabs don't need header (Stack handles it)
        tabBarActiveTintColor: '#0066ff',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="FeedTab"
        component={FeedStackNavigator}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            focused ? <HomeSelectedIcon height={24} width={20}  /> : <HomeUnselectedIcon height={24} width={20}  />  
          ),
        }}
      />

      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({ color, focused }) => (
            focused ? <BookmarkingSelectedIcon height={24} width={20}  /> : <BookmarkingUnselectedIcon height={24} width={20}  />  
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}