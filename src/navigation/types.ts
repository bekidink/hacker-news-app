import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Story } from '../types';

export type RootTabParamList = {
  FeedTab: undefined;
  Bookmarks: undefined;
};

export type FeedStackParamList = {
  ArticleList: undefined;
  ArticleDetail: { story: Story };
};

export type RootTabScreenProps<T extends keyof RootTabParamList> = 
  BottomTabScreenProps<RootTabParamList, T>;

export type FeedStackScreenProps<T extends keyof FeedStackParamList> = 
  NativeStackScreenProps<FeedStackParamList, T>;