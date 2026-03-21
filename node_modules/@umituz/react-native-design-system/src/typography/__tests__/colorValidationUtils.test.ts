/**
 * Tests for color validation utilities
 */

import {
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  isValidNamedColor,
  isValidColor,
  getColorFormat,
  normalizeColor,
} from '../presentation/utils/colorValidationUtils';

describe('isValidHexColor', () => {
  test('should return true for valid 3-digit hex colors', () => {
    expect(isValidHexColor('#fff')).toBe(true);
    expect(isValidHexColor('#000')).toBe(true);
    expect(isValidHexColor('#abc')).toBe(true);
    expect(isValidHexColor('#123')).toBe(true);
  });

  test('should return true for valid 6-digit hex colors', () => {
    expect(isValidHexColor('#ffffff')).toBe(true);
    expect(isValidHexColor('#000000')).toBe(true);
    expect(isValidHexColor('#abcdef')).toBe(true);
    expect(isValidHexColor('#123456')).toBe(true);
    expect(isValidHexColor('#FF5733')).toBe(true);
  });

  test('should return false for invalid hex colors', () => {
    expect(isValidHexColor('#ff')).toBe(false);
    expect(isValidHexColor('#ffff')).toBe(false);
    expect(isValidHexColor('#ggg')).toBe(false);
    expect(isValidHexColor('ffffff')).toBe(false);
    expect(isValidHexColor('#12345')).toBe(false);
  });
});

describe('isValidRgbColor', () => {
  test('should return true for valid RGB colors', () => {
    expect(isValidRgbColor('rgb(255, 0, 0)')).toBe(true);
    expect(isValidRgbColor('rgb(0, 255, 0)')).toBe(true);
    expect(isValidRgbColor('rgb(0, 0, 255)')).toBe(true);
    expect(isValidRgbColor('rgb(128, 128, 128)')).toBe(true);
  });

  test('should return true for valid RGBA colors', () => {
    expect(isValidRgbColor('rgba(255, 0, 0, 0.5)')).toBe(true);
    expect(isValidRgbColor('rgba(0, 255, 0, 1)')).toBe(true);
    expect(isValidRgbColor('rgba(0, 0, 255, 0)')).toBe(true);
  });

  test('should return true for RGB colors with percentages', () => {
    expect(isValidRgbColor('rgb(100%, 0%, 0%)')).toBe(true);
    expect(isValidRgbColor('rgb(50%, 50%, 50%)')).toBe(true);
  });

  test('should return false for invalid RGB colors', () => {
    expect(isValidRgbColor('rgb(256, 0, 0)')).toBe(false);
    expect(isValidRgbColor('rgb(255, -1, 0)')).toBe(false);
    expect(isValidRgbColor('rgb(255, 0)')).toBe(false);
    expect(isValidRgbColor('255, 0, 0')).toBe(false);
  });
});

describe('isValidHslColor', () => {
  test('should return true for valid HSL colors', () => {
    expect(isValidHslColor('hsl(0, 100%, 50%)')).toBe(true);
    expect(isValidHslColor('hsl(120, 100%, 50%)')).toBe(true);
    expect(isValidHslColor('hsl(240, 100%, 50%)')).toBe(true);
    expect(isValidHslColor('hsl(180, 50%, 50%)')).toBe(true);
  });

  test('should return true for valid HSLA colors', () => {
    expect(isValidHslColor('hsla(0, 100%, 50%, 0.5)')).toBe(true);
    expect(isValidHslColor('hsla(120, 100%, 50%, 1)')).toBe(true);
    expect(isValidHslColor('hsla(240, 100%, 50%, 0)')).toBe(true);
  });

  test('should return false for invalid HSL colors', () => {
    expect(isValidHslColor('hsl(361, 100%, 50%)')).toBe(false);
    expect(isValidHslColor('hsl(120, 101%, 50%)')).toBe(false);
    expect(isValidHslColor('hsl(120, 100%, 101%)')).toBe(false);
    expect(isValidHslColor('hsl(120, 100%)')).toBe(false);
    expect(isValidHslColor('120, 100%, 50%')).toBe(false);
  });
});

describe('isValidNamedColor', () => {
  test('should return true for valid CSS color names', () => {
    expect(isValidNamedColor('red')).toBe(true);
    expect(isValidNamedColor('blue')).toBe(true);
    expect(isValidNamedColor('green')).toBe(true);
    expect(isValidNamedColor('transparent')).toBe(true);
    expect(isValidNamedColor('currentColor')).toBe(true);
  });

  test('should return false for invalid color names', () => {
    expect(isValidNamedColor('notacolor')).toBe(false);
    expect(isValidNamedColor('color123')).toBe(false);
    expect(isValidNamedColor('')).toBe(false);
    expect(isValidNamedColor('red-blue')).toBe(false);
  });
});

describe('isValidColor', () => {
  test('should return true for any valid color format', () => {
    expect(isValidColor('#fff')).toBe(true);
    expect(isValidColor('#ffffff')).toBe(true);
    expect(isValidColor('rgb(255, 0, 0)')).toBe(true);
    expect(isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true);
    expect(isValidColor('hsl(0, 100%, 50%)')).toBe(true);
    expect(isValidColor('hsla(0, 100%, 50%, 0.5)')).toBe(true);
    expect(isValidColor('red')).toBe(true);
  });

  test('should return false for invalid colors', () => {
    expect(isValidColor('invalid')).toBe(false);
    expect(isValidColor('#ggg')).toBe(false);
    expect(isValidColor('rgb(256, 0, 0)')).toBe(false);
    expect(isValidColor('')).toBe(false);
  });
});

describe('getColorFormat', () => {
  test('should return correct format for hex colors', () => {
    expect(getColorFormat('#fff')).toBe('hex');
    expect(getColorFormat('#ffffff')).toBe('hex');
  });

  test('should return correct format for RGB colors', () => {
    expect(getColorFormat('rgb(255, 0, 0)')).toBe('rgb');
    expect(getColorFormat('rgba(255, 0, 0, 0.5)')).toBe('rgb');
  });

  test('should return correct format for HSL colors', () => {
    expect(getColorFormat('hsl(0, 100%, 50%)')).toBe('hsl');
    expect(getColorFormat('hsla(0, 100%, 50%, 0.5)')).toBe('hsl');
  });

  test('should return correct format for named colors', () => {
    expect(getColorFormat('red')).toBe('named');
    expect(getColorFormat('blue')).toBe('named');
  });

  test('should return unknown for invalid colors', () => {
    expect(getColorFormat('invalid')).toBe('unknown');
    expect(getColorFormat('')).toBe('unknown');
  });
});

describe('normalizeColor', () => {
  test('should convert 3-digit hex to 6-digit', () => {
    expect(normalizeColor('#fff')).toBe('#ffffff');
    expect(normalizeColor('#abc')).toBe('#aabbcc');
    expect(normalizeColor('#123')).toBe('#112233');
  });

  test('should keep 6-digit hex unchanged', () => {
    expect(normalizeColor('#ffffff')).toBe('#ffffff');
    expect(normalizeColor('#abcdef')).toBe('#abcdef');
  });

  test('should convert to lowercase', () => {
    expect(normalizeColor('#FFFFFF')).toBe('#ffffff');
    expect(normalizeColor('#ABCDEF')).toBe('#abcdef');
    expect(normalizeColor('RED')).toBe('red');
  });

  test('should return unchanged for invalid colors', () => {
    expect(normalizeColor('invalid')).toBe('invalid');
    expect(normalizeColor('')).toBe('');
  });

  test('should return unchanged for non-hex colors', () => {
    expect(normalizeColor('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    expect(normalizeColor('hsl(0, 100%, 50%)')).toBe('hsl(0, 100%, 50%)');
  });
});