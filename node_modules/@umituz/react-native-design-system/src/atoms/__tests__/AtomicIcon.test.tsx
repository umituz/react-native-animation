/**
 * AtomicIcon Tests
 * 
 * Basic test cases for AtomicIcon component
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { AtomicIcon } from '../AtomicIcon';

// Mock design tokens
jest.mock('@umituz/react-native-design-system-theme', () => ({
  useAppDesignTokens: () => ({
    colors: {
      primary: '#007AFF',
      secondary: '#8E8E93',
    },
  }),
}));

describe('AtomicIcon', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <AtomicIcon name="Settings" testID="test-icon" />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByTestId, rerender } = render(
      <AtomicIcon name="Settings" size="sm" testID="test-icon" />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
    
    rerender(<AtomicIcon name="Settings" size="lg" testID="test-icon" />);
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('renders with different colors', () => {
    const { getByTestId, rerender } = render(
      <AtomicIcon name="Settings" color="primary" testID="test-icon" />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
    
    rerender(<AtomicIcon name="Settings" color="secondary" testID="test-icon" />);
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('renders with custom size', () => {
    const { getByTestId } = render(
      <AtomicIcon name="Settings" customSize={32} testID="test-icon" />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('renders with custom color', () => {
    const { getByTestId } = render(
      <AtomicIcon name="Settings" customColor="#FF0000" testID="test-icon" />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('renders with background', () => {
    const { getByTestId } = render(
      <AtomicIcon 
        name="Settings" 
        withBackground 
        backgroundColor="#F0F0F0" 
        testID="test-icon" 
      />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('has accessibility label when provided', () => {
    const { getByTestId } = render(
      <AtomicIcon 
        name="Settings" 
        accessibilityLabel="Settings icon" 
        testID="test-icon" 
      />
    );
    
    expect(getByTestId('test-icon')).toBeTruthy();
  });

  it('handles unknown icon names gracefully', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    render(<AtomicIcon name="UnknownIcon" testID="test-icon" />);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Icon "UnknownIcon" not found')
    );
    
    consoleSpy.mockRestore();
  });
});