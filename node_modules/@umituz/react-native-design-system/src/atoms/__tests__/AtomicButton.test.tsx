/**
 * AtomicButton Tests
 * 
 * Basic test cases for AtomicButton component
 * These tests can be run by consuming applications
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AtomicButton } from '../AtomicButton';

// Mock design tokens
jest.mock('@umituz/react-native-design-system-theme', () => ({
  useAppDesignTokens: () => ({
    colors: {
      primary: '#007AFF',
      onPrimary: '#FFFFFF',
      secondary: '#8E8E93',
      surface: '#F2F2F7',
      border: '#C6C6C8',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
    },
    typography: {
      bodyMedium: { fontSize: 16 },
      labelLarge: { fontSize: 18 },
    },
    borders: {
      radius: {
        md: 8,
      },
    },
  }),
}));

describe('AtomicButton', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <AtomicButton title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <AtomicButton title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const { getByText, rerender } = render(
      <AtomicButton title="Primary" onPress={() => {}} variant="primary" />
    );
    
    expect(getByText('Primary')).toBeTruthy();
    
    rerender(<AtomicButton title="Secondary" onPress={() => {}} variant="secondary" />);
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByText, rerender } = render(
      <AtomicButton title="Small" onPress={() => {}} size="sm" />
    );
    
    expect(getByText('Small')).toBeTruthy();
    
    rerender(<AtomicButton title="Large" onPress={() => {}} size="lg" />);
    expect(getByText('Large')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <AtomicButton title="Disabled" onPress={mockOnPress} disabled />
    );
    
    const button = getByText('Disabled').parent;
    expect(button).toBeDisabled();
  });

  it('renders with icon', () => {
    const { getByTestId } = render(
      <AtomicButton title="With Icon" onPress={() => {}} icon="Settings" testID="test-button" />
    );
    
    expect(getByTestId('test-button')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <AtomicButton title="Custom" onPress={() => {}} style={customStyle} testID="test-button" />
    );
    
    expect(getByTestId('test-button')).toBeTruthy();
  });
});