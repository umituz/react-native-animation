/**
 * Tests for text color utilities
 */

import { getTextColor } from '../presentation/utils/textColorUtils';
import type { ColorVariant } from '../domain/entities/TypographyTypes';

import type { DesignTokens } from '@umituz/react-native-design-system-theme';

// Mock design tokens for testing
const mockTokens: DesignTokens = {
  colors: {
    textPrimary: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textDisabled: '#CCCCCC',
    textInverse: '#FFFFFF',
    onSurface: '#000000',
    onBackground: '#000000',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSuccess: '#FFFFFF',
    onError: '#FFFFFF',
    onWarning: '#000000',
    onInfo: '#FFFFFF',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
    info: '#2196F3',
    primary: '#2196F3',
    secondary: '#FF9800',
    tertiary: '#9C27B0',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FFFFFF',
  },
  typography: {
    displayLarge: { fontSize: 57, fontWeight: '400' },
    displayMedium: { fontSize: 45, fontWeight: '400' },
    displaySmall: { fontSize: 36, fontWeight: '400' },
    headlineLarge: { fontSize: 32, fontWeight: '400' },
    headlineMedium: { fontSize: 28, fontWeight: '400' },
    headlineSmall: { fontSize: 24, fontWeight: '400' },
    titleLarge: { fontSize: 22, fontWeight: '500' },
    titleMedium: { fontSize: 16, fontWeight: '500' },
    titleSmall: { fontSize: 14, fontWeight: '500' },
    bodyLarge: { fontSize: 16, fontWeight: '400' },
    bodyMedium: { fontSize: 14, fontWeight: '400' },
    bodySmall: { fontSize: 12, fontWeight: '400' },
    labelLarge: { fontSize: 14, fontWeight: '500' },
    labelMedium: { fontSize: 12, fontWeight: '500' },
    labelSmall: { fontSize: 11, fontWeight: '500' },
  },
  spacing: {},
  shadows: {},
  borderRadius: {},
  iconSizes: {},
  opacity: {},
  avatarSizes: {},
  borders: {},
};



describe('getTextColor', () => {
  test('should throw error when tokens is null', () => {
    expect(() => getTextColor('textPrimary', null as any)).toThrow(
      'Invalid design tokens: tokens and tokens.colors are required'
    );
  });

  test('should throw error when tokens is undefined', () => {
    expect(() => getTextColor('textPrimary', undefined as any)).toThrow(
      'Invalid design tokens: tokens and tokens.colors are required'
    );
  });

  test('should throw error when tokens.colors is null', () => {
    expect(() => getTextColor('textPrimary', { colors: null } as any)).toThrow(
      'Invalid design tokens: tokens and tokens.colors are required'
    );
  });

  test('should return default textPrimary when color is undefined', () => {
    const result = getTextColor(undefined, mockTokens);
    expect(result).toBe('#000000');
  });

  test('should return custom color as-is when not a variant', () => {
    const customColor = '#FF5722';
    const result = getTextColor(customColor, mockTokens);
    expect(result).toBe(customColor);
  });

  test('should map textPrimary variant correctly', () => {
    const result = getTextColor('textPrimary', mockTokens);
    expect(result).toBe('#000000');
  });

  test('should map textSecondary variant correctly', () => {
    const result = getTextColor('textSecondary', mockTokens);
    expect(result).toBe('#666666');
  });

  test('should map semantic colors correctly', () => {
    expect(getTextColor('success', mockTokens)).toBe('#4CAF50');
    expect(getTextColor('error', mockTokens)).toBe('#F44336');
    expect(getTextColor('warning', mockTokens)).toBe('#FF9800');
    expect(getTextColor('info', mockTokens)).toBe('#2196F3');
  });

  test('should map on-colors correctly', () => {
    expect(getTextColor('onPrimary', mockTokens)).toBe('#FFFFFF');
    expect(getTextColor('onError', mockTokens)).toBe('#FFFFFF');
  });

  test('should handle legacy variants correctly', () => {
    expect(getTextColor('primary', mockTokens)).toBe('#000000'); // Maps to textPrimary
    expect(getTextColor('secondary', mockTokens)).toBe('#666666'); // Maps to textSecondary
    expect(getTextColor('surfaceVariant', mockTokens)).toBe('#666666'); // Maps to textSecondary
  });

  test('should handle empty string', () => {
    const result = getTextColor('', mockTokens);
    expect(result).toBe('#000000');
  });

  test('should handle hex color strings', () => {
    const hexColor = '#RRGGBB';
    const result = getTextColor(hexColor, mockTokens);
    expect(result).toBe(hexColor);
  });

  test('should handle rgb color strings', () => {
    const rgbColor = 'rgb(255, 0, 0)';
    const result = getTextColor(rgbColor, mockTokens);
    expect(result).toBe(rgbColor);
  });

  test('should return custom color as-is when not a variant', () => {
    const customColor = 'unknownVariant';
    const result = getTextColor(customColor, mockTokens);
    expect(result).toBe(customColor);
  });




});

describe('ColorVariant validation', () => {
  test('should validate all defined color variants', () => {
    const validVariants: ColorVariant[] = [
      'textPrimary',
      'textSecondary',
      'textTertiary',
      'textDisabled',
      'textInverse',
      'onSurface',
      'onBackground',
      'onPrimary',
      'onSecondary',
      'onSuccess',
      'onError',
      'onWarning',
      'onInfo',
      'success',
      'error',
      'warning',
      'info',
      'primary',
      'secondary',
      'tertiary',
      'disabled',
      'inverse',
      'surfaceVariant',
    ];

    validVariants.forEach(variant => {
      const result = getTextColor(variant, mockTokens);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});