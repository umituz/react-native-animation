/**
 * Safe Area Module
 * Refactored: Simplified to only provide essential safe area utilities.
 * 
 * We use manual inset management in ScreenLayout for maximum stability
 * across different React Native versions and devices.
 */

export { useSafeAreaInsets } from './hooks/useSafeAreaInsets';

// Re-export essential components from react-native-safe-area-context
// This provides a single entry point for all safe area needs
export { 
  SafeAreaProvider, 
  initialWindowMetrics, 
  SafeAreaView 
} from 'react-native-safe-area-context';

export type { 
  Edge,
  SafeAreaProviderProps 
} from 'react-native-safe-area-context';
