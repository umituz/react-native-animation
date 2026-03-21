/**
 * OnboardingNavigation Hook Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import { useOnboardingNavigation } from '../useOnboardingNavigation';

describe('useOnboardingNavigation', () => {
  const mockOnComplete = jest.fn();
  const mockOnSkip = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with first slide', () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(3, mockOnComplete, mockOnSkip)
    );

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isFirstSlide).toBe(true);
    expect(result.current.isLastSlide).toBe(false);
  });

  it('should navigate to next slide', () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(3, mockOnComplete, mockOnSkip)
    );

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isFirstSlide).toBe(false);
    expect(result.current.isLastSlide).toBe(false);
  });

  it('should navigate to previous slide', () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(3, mockOnComplete, mockOnSkip)
    );

    act(() => {
      result.current.goToNext();
    });
    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isFirstSlide).toBe(true);
  });

  it('should handle last slide correctly', () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(2, mockOnComplete, mockOnSkip)
    );

    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isLastSlide).toBe(true);
  });

  it('should not go beyond last slide', () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(2, mockOnComplete, mockOnSkip)
    );

    act(() => {
      result.current.goToNext();
    });
    act(() => {
      result.current.goToNext();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.isLastSlide).toBe(true);
  });

  it('should not go before first slide', () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(2, mockOnComplete, mockOnSkip)
    );

    act(() => {
      result.current.goToPrevious();
    });

    expect(result.current.currentIndex).toBe(0);
    expect(result.current.isFirstSlide).toBe(true);
  });

  it('should call onComplete when completing', async () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(1, mockOnComplete, mockOnSkip)
    );

    await act(async () => {
      await result.current.complete();
    });

    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('should call onSkip when skipping', async () => {
    const { result } = renderHook(() =>
      useOnboardingNavigation(1, mockOnComplete, mockOnSkip)
    );

    await act(async () => {
      await result.current.skip();
    });

    expect(mockOnSkip).toHaveBeenCalled();
  });
});