/**
 * useSafeAreaInsets Hook
 * Get safe area insets with fallback for race conditions
 *
 * This wrapper catches the case where the hook is called before
 * SafeAreaProvider is fully initialized, returning safe default values
 * instead of throwing an error.
 */

import { useSafeAreaInsets as useNativeSafeAreaInsets } from 'react-native-safe-area-context';
import type { EdgeInsets } from 'react-native-safe-area-context';

const DEFAULT_INSETS: EdgeInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export const useSafeAreaInsets = (): EdgeInsets => {
  try {
    return useNativeSafeAreaInsets();
  } catch (error) {
    // Log in development only to help debugging
    if (__DEV__) {
      console.warn(
        '[useSafeAreaInsets] SafeAreaProvider not available yet. Using default values (all zeros). ' +
        'This is likely due to a timing issue during initialization and should resolve quickly.'
      );
    }
    return DEFAULT_INSETS;
  }
};

