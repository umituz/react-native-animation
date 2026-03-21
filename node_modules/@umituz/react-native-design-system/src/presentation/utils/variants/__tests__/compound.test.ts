import { describe, it, expect } from '@jest/globals';
import { createAdvancedVariants, type AdvancedVariantConfig } from '../compound';

describe('createAdvancedVariants', () => {
  it('should behave like createVariants when no compound variants provided', () => {
    const config: AdvancedVariantConfig<{
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

    const getStyles = createAdvancedVariants(config);
    const result = getStyles({ size: 'large', color: 'primary' });

    expect(result).toEqual({
      borderRadius: 4,
      padding: 16,
      backgroundColor: 'blue',
    });
  });

  it('should apply compound variants when conditions are met', () => {
    const config: AdvancedVariantConfig<{
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
      compoundVariants: [
        {
          conditions: { size: 'large', color: 'primary' },
          style: { borderWidth: 2, borderColor: 'darkblue' },
        },
      ],
    };

    const getStyles = createAdvancedVariants(config);
    const result = getStyles({ size: 'large', color: 'primary' });

    expect(result).toEqual({
      borderRadius: 4,
      padding: 16,
      backgroundColor: 'blue',
      borderWidth: 2,
      borderColor: 'darkblue',
    });
  });

  it('should not apply compound variants when conditions are not met', () => {
    const config: AdvancedVariantConfig<{
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
      compoundVariants: [
        {
          conditions: { size: 'large', color: 'primary' },
          style: { borderWidth: 2, borderColor: 'darkblue' },
        },
      ],
    };

    const getStyles = createAdvancedVariants(config);
    const result = getStyles({ size: 'small', color: 'primary' });

    expect(result).toEqual({
      borderRadius: 4,
      padding: 8,
      backgroundColor: 'blue',
    });
  });

  it('should apply multiple compound variants when conditions are met', () => {
    const config: AdvancedVariantConfig<{
      size: Record<string, any>;
      color: Record<string, any>;
      variant: Record<string, any>;
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
        variant: {
          outlined: { borderWidth: 1 },
          filled: { borderWidth: 0 },
        },
      },
      compoundVariants: [
        {
          conditions: { size: 'large', color: 'primary' },
          style: { borderWidth: 2, borderColor: 'darkblue' },
        },
        {
          conditions: { color: 'secondary', variant: 'outlined' },
          style: { borderStyle: 'dashed' },
        },
      ],
    };

    const getStyles = createAdvancedVariants(config);
    const result1 = getStyles({ size: 'large', color: 'primary', variant: 'filled' });
    const result2 = getStyles({ size: 'small', color: 'secondary', variant: 'outlined' });

    expect(result1).toEqual({
      borderRadius: 4,
      padding: 16,
      backgroundColor: 'blue',
      borderWidth: 2,
      borderColor: 'darkblue',
    });

    expect(result2).toEqual({
      borderRadius: 4,
      padding: 8,
      backgroundColor: 'gray',
      borderWidth: 1,
      borderStyle: 'dashed',
    });
  });
});