/**
 * Tests for typography style utilities
 */

import { getTextStyle, isTextStyleVariant, getAllTextStyleVariants } from '../presentation/utils/textStyleUtils';
import type { TextStyleVariant } from '../domain/entities/TypographyTypes';
import type { DesignTokens } from '@umituz/react-native-design-system-theme';

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

describe('getTextStyle', () => {
  test('should throw error when tokens is null', () => {
    expect(() => getTextStyle('bodyLarge', null as any)).toThrow(
      'Invalid design tokens: tokens and tokens.typography are required'
    );
  });

  test('should throw error when tokens is undefined', () => {
    expect(() => getTextStyle('bodyLarge', undefined as any)).toThrow(
      'Invalid design tokens: tokens and tokens.typography are required'
    );
  });

  test('should throw error when tokens.typography is null', () => {
    expect(() => getTextStyle('bodyLarge', { typography: null } as any)).toThrow(
      'Invalid design tokens: tokens and tokens.typography are required'
    );
  });

  test('should return correct style for displayLarge', () => {
    const result = getTextStyle('displayLarge', mockTokens);
    expect(result).toEqual({ fontSize: 57, fontWeight: '400' });
  });

  test('should return correct style for headlineMedium', () => {
    const result = getTextStyle('headlineMedium', mockTokens);
    expect(result).toEqual({ fontSize: 28, fontWeight: '400' });
  });

  test('should return correct style for titleSmall', () => {
    const result = getTextStyle('titleSmall', mockTokens);
    expect(result).toEqual({ fontSize: 14, fontWeight: '500' });
  });

  test('should return correct style for bodyMedium', () => {
    const result = getTextStyle('bodyMedium', mockTokens);
    expect(result).toEqual({ fontSize: 14, fontWeight: '400' });
  });

  test('should return correct style for labelSmall', () => {
    const result = getTextStyle('labelSmall', mockTokens);
    expect(result).toEqual({ fontSize: 11, fontWeight: '500' });
  });

  test('should return fallback style for unknown variant', () => {
    const result = getTextStyle('unknownVariant' as TextStyleVariant, mockTokens);
    expect(result).toEqual({ fontSize: 16, fontWeight: '400' }); // bodyLarge fallback
  });
});

describe('isTextStyleVariant', () => {
  test('should return true for valid variants', () => {
    expect(isTextStyleVariant('displayLarge')).toBe(true);
    expect(isTextStyleVariant('headlineMedium')).toBe(true);
    expect(isTextStyleVariant('titleSmall')).toBe(true);
    expect(isTextStyleVariant('bodyMedium')).toBe(true);
    expect(isTextStyleVariant('labelSmall')).toBe(true);
  });

  test('should return false for invalid variants', () => {
    expect(isTextStyleVariant('invalid')).toBe(false);
    expect(isTextStyleVariant('display')).toBe(false);
    expect(isTextStyleVariant('')).toBe(false);
    expect(isTextStyleVariant('body')).toBe(false);
  });
});

describe('getAllTextStyleVariants', () => {
  test('should return all text style variants', () => {
    const variants = getAllTextStyleVariants();
    
    expect(variants).toHaveLength(15);
    expect(variants).toContain('displayLarge');
    expect(variants).toContain('displayMedium');
    expect(variants).toContain('displaySmall');
    expect(variants).toContain('headlineLarge');
    expect(variants).toContain('headlineMedium');
    expect(variants).toContain('headlineSmall');
    expect(variants).toContain('titleLarge');
    expect(variants).toContain('titleMedium');
    expect(variants).toContain('titleSmall');
    expect(variants).toContain('bodyLarge');
    expect(variants).toContain('bodyMedium');
    expect(variants).toContain('bodySmall');
    expect(variants).toContain('labelLarge');
    expect(variants).toContain('labelMedium');
    expect(variants).toContain('labelSmall');
  });

  test('should return readonly array', () => {
    const variants = getAllTextStyleVariants();
    expect(Array.isArray(variants)).toBe(true);
  });
});

describe('TextStyleVariant validation', () => {
  test('should validate all defined text style variants', () => {
    const validVariants: TextStyleVariant[] = getAllTextStyleVariants();

    validVariants.forEach(variant => {
      const result = getTextStyle(variant, mockTokens);
      expect(result).toHaveProperty('fontSize');
      expect(result).toHaveProperty('fontWeight');
      expect(typeof result.fontSize).toBe('number');
      expect(typeof result.fontWeight).toBe('string');
    });
  });
});