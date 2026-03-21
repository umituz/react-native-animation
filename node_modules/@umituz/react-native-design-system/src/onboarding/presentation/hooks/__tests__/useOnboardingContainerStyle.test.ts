/**
 * OnboardingContainerStyle Hook Tests
 */

import { renderHook } from '@testing-library/react-native';
import { useOnboardingContainerStyle } from '../useOnboardingContainerStyle';

// Mock theme hook
jest.mock('../../../../theme/hooks/useAppDesignTokens', () => ({
  useAppDesignTokens: jest.fn(),
}));

// Mock safe area insets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn(),
}));

import { useAppDesignTokens } from '../../../../theme/hooks/useAppDesignTokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const mockUseAppDesignTokens = useAppDesignTokens as jest.MockedFunction<typeof useAppDesignTokens>;
const mockUseSafeAreaInsets = useSafeAreaInsets as jest.MockedFunction<typeof useSafeAreaInsets>;

describe('useOnboardingContainerStyle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseSafeAreaInsets.mockReturnValue({
      top: 44,
      bottom: 34,
      left: 0,
      right: 0,
    });

    mockUseAppDesignTokens.mockReturnValue({
      colors: {
        backgroundPrimary: '#ffffff',
      },
    } as any);
  });

  it('should return container style with custom background disabled', () => {
    const { result } = renderHook(() =>
      useOnboardingContainerStyle({ useCustomBackground: false })
    );

    expect(result.current.containerStyle).toEqual([
      {
        paddingTop: 44,
        backgroundColor: '#ffffff',
      },
    ]);
  });

  it('should return container style with custom background enabled', () => {
    const { result } = renderHook(() =>
      useOnboardingContainerStyle({ useCustomBackground: true })
    );

    expect(result.current.containerStyle).toEqual([
      {
        paddingTop: 44,
        backgroundColor: 'transparent',
      },
    ]);
  });

  it('should use correct top inset', () => {
    mockUseSafeAreaInsets.mockReturnValue({
      top: 50,
      bottom: 34,
      left: 0,
      right: 0,
    });

    const { result } = renderHook(() =>
      useOnboardingContainerStyle({ useCustomBackground: false })
    );

    expect(result.current.containerStyle[0].paddingTop).toBe(50);
  });

  it('should use theme background color', () => {
    mockUseAppDesignTokens.mockReturnValue({
      colors: {
        backgroundPrimary: '#f0f0f0',
      },
    } as any);

    const { result } = renderHook(() =>
      useOnboardingContainerStyle({ useCustomBackground: false })
    );

    expect(result.current.containerStyle[0].backgroundColor).toBe('#f0f0f0');
  });
});