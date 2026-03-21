/**
 * OnboardingStore Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingStore, useOnboarding } from '../OnboardingStore';

// Mock storage repository
jest.mock('@storage', () => ({
  storageRepository: {
    getString: jest.fn(),
    setString: jest.fn(),
    getObject: jest.fn(),
    setObject: jest.fn(),
    removeItem: jest.fn(),
  },
  StorageKey: {
    ONBOARDING_COMPLETED: '@onboarding_completed',
  },
  unwrap: jest.fn((result, defaultValue) => result.success ? result.data : defaultValue),
}));

describe('OnboardingStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useOnboardingStore', () => {
    it('should have initial state', () => {
      const { result } = renderHook(() => useOnboardingStore());

      expect(result.current.isOnboardingComplete).toBe(false);
      expect(result.current.currentStep).toBe(0);
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.userData).toEqual({ answers: {} });
    });

    it('should set current step', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setCurrentStep(5);
      });

      expect(result.current.currentStep).toBe(5);
    });

    it('should set loading state', () => {
      const { result } = renderHook(() => useOnboardingStore());

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.loading).toBe(false);
    });

    it('should set error state', () => {
      const { result } = renderHook(() => useOnboardingStore());
      const errorMessage = 'Test error';

      act(() => {
        result.current.setError(errorMessage);
      });

      expect(result.current.error).toBe(errorMessage);
    });
  });

  describe('useOnboarding', () => {
    it('should return all store properties and methods', () => {
      const { result } = renderHook(() => useOnboarding());

      expect(typeof result.current.initialize).toBe('function');
      expect(typeof result.current.complete).toBe('function');
      expect(typeof result.current.skip).toBe('function');
      expect(typeof result.current.reset).toBe('function');
      expect(typeof result.current.saveAnswer).toBe('function');
      expect(typeof result.current.getAnswer).toBe('function');
      expect(typeof result.current.getUserData).toBe('function');
      expect(typeof result.current.setUserData).toBe('function');
    });
  });
});