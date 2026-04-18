import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ArticleCard } from '../components/feed/ArticleCard';

const mockStory = {
  id: 1,
  title: 'React Native Testing',
  url: 'https://reactnative.dev',
  by: 'fb_dev',
  score: 500,
  time: 1614556800,
  type: 'story'
};

describe('ArticleCard Component', () => {
  it('calls onPress when the card is tapped', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ArticleCard story={mockStory} onPress={mockOnPress} />
    );

    // Check if title is rendered
    const titleElement = getByText('React Native Testing');
    expect(titleElement).toBeTruthy();

    // Interaction: Tap the card
    fireEvent.press(titleElement);

    // Verification
    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith();
  });
});