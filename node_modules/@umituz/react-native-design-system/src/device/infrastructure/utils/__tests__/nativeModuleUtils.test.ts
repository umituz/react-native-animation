/**
 * Native Module Utils Tests
 */

import { withTimeout, safeAccess, withTimeoutAll } from '../nativeModuleUtils';

describe('Native Module Utils', () => {
  describe('withTimeout', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should resolve with operation result when successful', async () => {
      const operation = jest.fn().mockResolvedValue('success');
      const promise = withTimeout(operation, 1000);

      jest.advanceTimersByTime(0);
      await expect(promise).resolves.toBe('success');
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it('should return null when operation times out', async () => {
      const operation = jest.fn().mockImplementation(() => new Promise(() => {}));
      const promise = withTimeout(operation, 1000);

      jest.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeNull();
    });

    it('should return null when operation throws', async () => {
      const operation = jest.fn().mockRejectedValue(new Error('Test error'));
      const promise = withTimeout(operation, 1000);

      jest.advanceTimersByTime(0);
      await expect(promise).resolves.toBeNull();
    });

    it('should use default timeout when not specified', async () => {
      const operation = jest.fn().mockImplementation(() => new Promise(() => {}));
      const promise = withTimeout(operation);

      jest.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeNull();
    });
  });

  describe('safeAccess', () => {
    it('should return value when accessor succeeds', () => {
      const accessor = () => 'test value';
      const result = safeAccess(accessor, 'fallback');
      expect(result).toBe('test value');
    });

    it('should return fallback when accessor throws', () => {
      const accessor = () => {
        throw new Error('Test error');
      };
      const result = safeAccess(accessor, 'fallback');
      expect(result).toBe('fallback');
    });

    it('should return fallback when accessor returns null/undefined', () => {
      const accessor1 = () => null;
      const accessor2 = () => undefined;
      
      expect(safeAccess(accessor1, 'fallback')).toBe('fallback');
      expect(safeAccess(accessor2, 'fallback')).toBe('fallback');
    });

    it('should return value when accessor returns falsy but not null/undefined', () => {
      const accessor1 = () => '';
      const accessor2 = () => 0;
      const accessor3 = () => false;
      
      expect(safeAccess(accessor1, 'fallback')).toBe('');
      expect(safeAccess(accessor2, 'fallback')).toBe(0);
      expect(safeAccess(accessor3, 'fallback')).toBe(false);
    });
  });

  describe('withTimeoutAll', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should resolve all operations when successful', async () => {
      const operations = [
        jest.fn().mockResolvedValue('result1'),
        jest.fn().mockResolvedValue('result2'),
        jest.fn().mockResolvedValue('result3'),
      ];
      const promise = withTimeoutAll(operations, 1000);

      jest.advanceTimersByTime(0);
      const results = await promise;
      
      expect(results).toEqual(['result1', 'result2', 'result3']);
      operations.forEach(op => expect(op).toHaveBeenCalledTimes(1));
    });

    it('should handle individual operation failures', async () => {
      const operations = [
        jest.fn().mockResolvedValue('result1'),
        jest.fn().mockRejectedValue(new Error('Test error')),
        jest.fn().mockResolvedValue('result3'),
      ];
      const promise = withTimeoutAll(operations, 1000);

      jest.advanceTimersByTime(0);
      const results = await promise;
      
      expect(results).toEqual(['result1', null, 'result3']);
    });

    it('should return null for all operations when timeout occurs', async () => {
      const operations = [
        jest.fn().mockImplementation(() => new Promise(() => {})),
        jest.fn().mockResolvedValue('result2'),
      ];
      const promise = withTimeoutAll(operations, 1000);

      jest.advanceTimersByTime(1000);
      const results = await promise;
      
      expect(results).toEqual([null, null]);
    });

    it('should use default timeout when not specified', async () => {
      const operations = [
        jest.fn().mockImplementation(() => new Promise(() => {})),
      ];
      const promise = withTimeoutAll(operations);

      jest.advanceTimersByTime(2000);
      const results = await promise;
      
      expect(results).toEqual([null]);
    });

    it('should handle empty operations array', async () => {
      const operations: Array<() => Promise<string>> = [];
      const promise = withTimeoutAll(operations, 1000);

      jest.advanceTimersByTime(0);
      const results = await promise;
      
      expect(results).toEqual([]);
    });
  });
});