import { describe, it, expect } from '@jest/globals';
import { combineStyles, conditionalStyle, responsiveStyle } from '../helpers';

describe('helpers', () => {
  describe('combineStyles', () => {
    it('should combine multiple styles', () => {
      const style1 = { backgroundColor: 'red' };
      const style2 = { padding: 10 };
      const style3 = { margin: 5 };

      const result = combineStyles(style1, style2, style3);

      expect(result).toEqual({
        backgroundColor: 'red',
        padding: 10,
        margin: 5,
      });
    });

    it('should ignore undefined, null, and false styles', () => {
      const style1 = { backgroundColor: 'red' };
      const style2 = undefined;
      const style3 = null;
      const style4 = false;
      const style5 = { padding: 10 };

      const result = combineStyles(style1, style2, style3, style4, style5);

      expect(result).toEqual({
        backgroundColor: 'red',
        padding: 10,
      });
    });

    it('should return empty object when no styles provided', () => {
      const result = combineStyles();

      expect(result).toEqual({});
    });

    it('should handle empty array', () => {
      const result = combineStyles();

      expect(result).toEqual({});
    });
  });

  describe('conditionalStyle', () => {
    it('should return trueStyle when condition is true', () => {
      const trueStyle = { backgroundColor: 'red' };
      const falseStyle = { backgroundColor: 'blue' };

      const result = conditionalStyle(true, trueStyle, falseStyle);

      expect(result).toEqual(trueStyle);
    });

    it('should return falseStyle when condition is false', () => {
      const trueStyle = { backgroundColor: 'red' };
      const falseStyle = { backgroundColor: 'blue' };

      const result = conditionalStyle(false, trueStyle, falseStyle);

      expect(result).toEqual(falseStyle);
    });

    it('should return undefined when condition is false and no falseStyle provided', () => {
      const trueStyle = { backgroundColor: 'red' };

      const result = conditionalStyle(false, trueStyle);

      expect(result).toBeUndefined();
    });
  });

  describe('responsiveStyle', () => {
    it('should return small style (current implementation)', () => {
      const small = { padding: 8 };
      const medium = { padding: 12 };
      const large = { padding: 16 };

      const result = responsiveStyle(small, medium, large);

      expect(result).toEqual(small);
    });

    it('should work with only small style', () => {
      const small = { padding: 8 };

      const result = responsiveStyle(small);

      expect(result).toEqual(small);
    });
  });
});