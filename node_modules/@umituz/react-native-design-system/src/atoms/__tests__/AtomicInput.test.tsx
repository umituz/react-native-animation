/**
 * AtomicInput Tests
 * 
 * Basic test cases for AtomicInput component
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AtomicInput } from '../AtomicInput';

// Mock design tokens
jest.mock('@umituz/react-native-design-system-theme', () => ({
  useAppDesignTokens: () => ({
    colors: {
      primary: '#007AFF',
      secondary: '#8E8E93',
      error: '#FF3B30',
      success: '#34C759',
      surface: '#F2F2F7',
      border: '#C6C6C8',
      textPrimary: '#000000',
      textSecondary: '#8E8E93',
      textDisabled: '#C7C7CC',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
    },
    typography: {
      bodyMedium: { fontSize: 16 },
      bodySmall: { fontSize: 14 },
    },
    borders: {
      radius: {
        md: 8,
      },
    },
  }),
}));

describe('AtomicInput', () => {
  it('renders correctly with basic props', () => {
    const { getByDisplayValue } = render(
      <AtomicInput value="test" onChangeText={() => {}} />
    );
    
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('handles text changes', () => {
    const mockOnChange = jest.fn();
    const { getByDisplayValue } = render(
      <AtomicInput value="" onChangeText={mockOnChange} />
    );
    
    const input = getByDisplayValue('');
    fireEvent.changeText(input, 'new text');
    
    expect(mockOnChange).toHaveBeenCalledWith('new text');
  });

  it('renders with label', () => {
    const { getByText } = render(
      <AtomicInput value="" onChangeText={() => {}} label="Test Label" />
    );
    
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <AtomicInput value="" onChangeText={() => {}} placeholder="Enter text" />
    );
    
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with error state', () => {
    const { getByText } = render(
      <AtomicInput 
        value="" 
        onChangeText={() => {}} 
        state="error" 
        helperText="Error message" 
      />
    );
    
    expect(getByText('Error message')).toBeTruthy();
  });

  it('renders with success state', () => {
    const { getByText } = render(
      <AtomicInput 
        value="" 
        onChangeText={() => {}} 
        state="success" 
        helperText="Success message" 
      />
    );
    
    expect(getByText('Success message')).toBeTruthy();
  });

  it('renders with leading icon', () => {
    const { getByTestId } = render(
      <AtomicInput 
        value="" 
        onChangeText={() => {}} 
        leadingIcon="Search" 
        testID="test-input" 
      />
    );
    
    expect(getByTestId('test-input')).toBeTruthy();
  });

  it('renders with trailing icon', () => {
    const { getByTestId } = render(
      <AtomicInput 
        value="" 
        onChangeText={() => {}} 
        trailingIcon="Eye" 
        testID="test-input" 
      />
    );
    
    expect(getByTestId('test-input')).toBeTruthy();
  });

  it('renders with password toggle', () => {
    const { getByTestId } = render(
      <AtomicInput 
        value="" 
        onChangeText={() => {}} 
        secureTextEntry 
        showPasswordToggle 
        testID="test-input" 
      />
    );
    
    expect(getByTestId('test-input')).toBeTruthy();
  });

  it('is disabled when disabled prop is true', () => {
    const { getByDisplayValue } = render(
      <AtomicInput value="test" onChangeText={() => {}} disabled />
    );
    
    const input = getByDisplayValue('test');
    expect(input).toBeDisabled();
  });

  it('renders with different variants', () => {
    const { getByDisplayValue, rerender } = render(
      <AtomicInput value="test" onChangeText={() => {}} variant="outlined" />
    );
    
    expect(getByDisplayValue('test')).toBeTruthy();
    
    rerender(<AtomicInput value="test" onChangeText={() => {}} variant="filled" />);
    expect(getByDisplayValue('test')).toBeTruthy();
    
    rerender(<AtomicInput value="test" onChangeText={() => {}} variant="flat" />);
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { getByDisplayValue, rerender } = render(
      <AtomicInput value="test" onChangeText={() => {}} size="sm" />
    );
    
    expect(getByDisplayValue('test')).toBeTruthy();
    
    rerender(<AtomicInput value="test" onChangeText={() => {}} size="md" />);
    expect(getByDisplayValue('test')).toBeTruthy();
    
    rerender(<AtomicInput value="test" onChangeText={() => {}} size="lg" />);
    expect(getByDisplayValue('test')).toBeTruthy();
  });

  it('shows character count when enabled', () => {
    const { getByText } = render(
      <AtomicInput 
        value="test" 
        onChangeText={() => {}} 
        showCharacterCount 
        maxLength={10} 
      />
    );
    
    expect(getByText('4/10')).toBeTruthy();
  });
});