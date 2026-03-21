import { NavigationCleanupManager } from '../NavigationCleanup';

describe('NavigationCleanup', () => {
  describe('NavigationCleanupManager', () => {
    describe('createMultiCleanup', () => {
      it('should create a cleanup function that calls all unsubscribers', () => {
        const unsubscribe1 = jest.fn();
        const unsubscribe2 = jest.fn();
        const unsubscribe3 = jest.fn();
        
        const cleanup = NavigationCleanupManager.createMultiCleanup([unsubscribe1, unsubscribe2, unsubscribe3]);
        
        expect(typeof cleanup).toBe('function');
        
        cleanup();
        
        expect(unsubscribe1).toHaveBeenCalledTimes(1);
        expect(unsubscribe2).toHaveBeenCalledTimes(1);
        expect(unsubscribe3).toHaveBeenCalledTimes(1);
      });

      it('should handle empty array of unsubscribers', () => {
        const cleanup = NavigationCleanupManager.createMultiCleanup([]);
        
        expect(() => cleanup()).not.toThrow();
      });

      it('should handle single unsubscribe function', () => {
        const unsubscribe = jest.fn();
        const cleanup = NavigationCleanupManager.createMultiCleanup([unsubscribe]);
        
        cleanup();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
      });

      it('should handle errors in individual unsubscribe functions', () => {
        const originalDev = __DEV__;
        (global as any).__DEV__ = true;
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        
        const unsubscribe1 = jest.fn();
        const unsubscribe2 = jest.fn(() => {
          throw new Error('Unsubscribe failed');
        });
        const unsubscribe3 = jest.fn();
        
        const cleanup = NavigationCleanupManager.createMultiCleanup([unsubscribe1, unsubscribe2, unsubscribe3]);
        
        cleanup();
        
        expect(unsubscribe1).toHaveBeenCalledTimes(1);
        expect(unsubscribe2).toHaveBeenCalledTimes(1);
        expect(unsubscribe3).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(
          '[NavigationCleanupManager] Error during cleanup:',
          expect.any(Error)
        );
        
        (global as any).__DEV__ = originalDev;
        consoleSpy.mockRestore();
      });

      it('should not log errors in production', () => {
        const originalDev = __DEV__;
        (global as any).__DEV__ = false;
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        
        const unsubscribe = jest.fn(() => {
          throw new Error('Unsubscribe failed');
        });
        
        const cleanup = NavigationCleanupManager.createMultiCleanup([unsubscribe]);
        
        cleanup();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
        expect(consoleSpy).not.toHaveBeenCalled();
        
        (global as any).__DEV__ = originalDev;
        consoleSpy.mockRestore();
      });

      it('should handle multiple errors', () => {
        const originalDev = __DEV__;
        (global as any).__DEV__ = true;
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        
        const unsubscribe1 = jest.fn(() => {
          throw new Error('Error 1');
        });
        const unsubscribe2 = jest.fn(() => {
          throw new Error('Error 2');
        });
        
        const cleanup = NavigationCleanupManager.createMultiCleanup([unsubscribe1, unsubscribe2]);
        
        cleanup();
        
        expect(unsubscribe1).toHaveBeenCalledTimes(1);
        expect(unsubscribe2).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledTimes(2);
        
        (global as any).__DEV__ = originalDev;
        consoleSpy.mockRestore();
      });
    });

    describe('safeCleanup', () => {
      it('should create a safe cleanup wrapper', () => {
        const unsubscribe = jest.fn();
        const safeUnsubscribe = NavigationCleanupManager.safeCleanup(unsubscribe);
        
        expect(typeof safeUnsubscribe).toBe('function');
        
        safeUnsubscribe();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
      });

      it('should handle errors in unsubscribe function', () => {
        const originalDev = __DEV__;
        (global as any).__DEV__ = true;
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        
        const unsubscribe = jest.fn(() => {
          throw new Error('Unsubscribe failed');
        });
        
        const safeUnsubscribe = NavigationCleanupManager.safeCleanup(unsubscribe);
        
        expect(() => safeUnsubscribe()).not.toThrow();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith(
          '[NavigationCleanupManager] Error during cleanup:',
          expect.any(Error)
        );
        
        (global as any).__DEV__ = originalDev;
        consoleSpy.mockRestore();
      });

      it('should not log errors in production', () => {
        const originalDev = __DEV__;
        (global as any).__DEV__ = false;
        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
        
        const unsubscribe = jest.fn(() => {
          throw new Error('Unsubscribe failed');
        });
        
        const safeUnsubscribe = NavigationCleanupManager.safeCleanup(unsubscribe);
        
        safeUnsubscribe();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
        expect(consoleSpy).not.toHaveBeenCalled();
        
        (global as any).__DEV__ = originalDev;
        consoleSpy.mockRestore();
      });

      it('should handle successful unsubscribe', () => {
        const unsubscribe = jest.fn();
        const safeUnsubscribe = NavigationCleanupManager.safeCleanup(unsubscribe);
        
        safeUnsubscribe();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
      });

      it('should handle unsubscribe that returns a value', () => {
        const unsubscribe = jest.fn().mockReturnValue('cleanup result');
        const safeUnsubscribe = NavigationCleanupManager.safeCleanup(unsubscribe);
        
        const result = safeUnsubscribe();
        
        expect(unsubscribe).toHaveBeenCalledTimes(1);
        expect(result).toBeUndefined(); // safeCleanup doesn't return the value
      });
    });
  });

  describe('integration scenarios', () => {
    it('should work with nested cleanup functions', () => {
      const innerUnsubscribe1 = jest.fn();
      const innerUnsubscribe2 = jest.fn();
      const outerUnsubscribe = jest.fn();
      
      const innerCleanup = NavigationCleanupManager.createMultiCleanup([innerUnsubscribe1, innerUnsubscribe2]);
      const outerCleanup = NavigationCleanupManager.createMultiCleanup([innerCleanup, outerUnsubscribe]);
      
      outerCleanup();
      
      expect(innerUnsubscribe1).toHaveBeenCalledTimes(1);
      expect(innerUnsubscribe2).toHaveBeenCalledTimes(1);
      expect(outerUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should work with mixed safe and unsafe cleanup functions', () => {
      const unsafeUnsubscribe = jest.fn();
      const safeUnsubscribe = NavigationCleanupManager.safeCleanup(jest.fn());
      
      const cleanup = NavigationCleanupManager.createMultiCleanup([unsafeUnsubscribe, safeUnsubscribe]);
      
      cleanup();
      
      expect(unsafeUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should handle cleanup functions that throw different types of errors', () => {
      const originalDev = __DEV__;
      (global as any).__DEV__ = true;
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const stringError = jest.fn(() => {
        throw 'String error';
      });
      const objectError = jest.fn(() => {
        throw { code: 500, message: 'Object error' };
      });
      const errorInstance = jest.fn(() => {
        throw new Error('Error instance');
      });
      
      const cleanup = NavigationCleanupManager.createMultiCleanup([stringError, objectError, errorInstance]);
      
      cleanup();
      
      expect(stringError).toHaveBeenCalledTimes(1);
      expect(objectError).toHaveBeenCalledTimes(1);
      expect(errorInstance).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalledTimes(3);
      
      (global as any).__DEV__ = originalDev;
      consoleSpy.mockRestore();
    });
  });

  describe('edge cases', () => {
    it('should handle null/undefined in unsubscribe array', () => {
      const unsubscribe = jest.fn();
      
      expect(() => {
        const cleanup = NavigationCleanupManager.createMultiCleanup([unsubscribe, null, undefined] as any);
        cleanup();
      }).not.toThrow();
      
      expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should handle non-function unsubscribe', () => {
      const originalDev = __DEV__;
      (global as any).__DEV__ = true;
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const validUnsubscribe = jest.fn();
      
      expect(() => {
        const cleanup = NavigationCleanupManager.createMultiCleanup([validUnsubscribe, 'not-a-function'] as any);
        cleanup();
      }).not.toThrow();
      
      expect(validUnsubscribe).toHaveBeenCalledTimes(1);
      
      (global as any).__DEV__ = originalDev;
      consoleSpy.mockRestore();
    });
  });
});