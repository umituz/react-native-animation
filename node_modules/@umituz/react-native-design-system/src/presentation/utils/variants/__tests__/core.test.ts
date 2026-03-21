import { describe, it, expect } from '@jest/globals';
import { createVariants, type VariantConfig } from '../core';

describe('createVariants', () => {
  it('should return base style when no variants provided', () => {
    const config: VariantConfig<{ size: Record<string, any> }> = {
      base: { backgroundColor: 'red' },
    };

    const getStyles = createVariants(config);
    const result = getStyles();

    expect(result).toEqual({ backgroundColor: 'red' });
  });

  it('should apply variant styles based on props', () => {
    const config: VariantConfig<{ size: Record<string, any> }> = {
      base: { backgroundColor: 'red' },
      variants: {
        size: {
          small: { padding: 8 },
          large: { padding: 16 },
        },
      },
    };

    const getStyles = createVariants(config);
    const smallResult = getStyles({ size: 'small' });
    const largeResult = getStyles({ size: 'large' });

    expect(smallResult).toEqual({ backgroundColor: 'red', padding: 8 });
    expect(largeResult).toEqual({ backgroundColor: 'red', padding: 16 });
  });

  it('should apply default variants when no props provided', () => {
    const config: VariantConfig<{ size: Record<string, any> }> = {
      base: { backgroundColor: 'red' },
      variants: {
        size: {
          small: { padding: 8 },
          large: { padding: 16 },
        },
      },
      defaultVariants: {
        size: 'large',
      },
    };

    const getStyles = createVariants(config);
    const result = getStyles();

    expect(result).toEqual({ backgroundColor: 'red', padding: 16 });
  });

  it('should override default variants with props', () => {
    const config: VariantConfig<{ size: Record<string, any> }> = {
      base: { backgroundColor: 'red' },
      variants: {
        size: {
          small: { padding: 8 },
          large: { padding: 16 },
        },
      },
      defaultVariants: {
        size: 'large',
      },
    };

    const getStyles = createVariants(config);
    const result = getStyles({ size: 'small' });

    expect(result).toEqual({ backgroundColor: 'red', padding: 8 });
  });

  it('should handle multiple variants', () => {
    const config: VariantConfig<{
      size: Record<string, any>;
      color: Record<string, any>;
    }> = {
      base: { borderRadius: 4 },
      variants: {
        size: {
          small: { padding: 8 },
          large: { padding: 16 },
        },
        color: {
          primary: { backgroundColor: 'blue' },
          secondary: { backgroundColor: 'gray' },
        },
      },
    };

    const getStyles = createVariants(config);
    const result = getStyles({ size: 'large', color: 'primary' });

    expect(result).toEqual({
      borderRadius: 4,
      padding: 16,
      backgroundColor: 'blue',
    });
  });
});