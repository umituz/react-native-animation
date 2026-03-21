/**
 * @umituz/react-native-design-system/hooks - Centralized Hooks Export
 *
 * Re-exports all commonly used hooks from the design system
 *
 * Usage:
 *   import {
 *     useAppDesignTokens,
 *     useTheme,
 *     useInfiniteScroll,
 *     useOffline,
 *     useResponsive,
 *     useSafeArea
 *   } from '@umituz/react-native-design-system/hooks';
 */

// =============================================================================
// THEME HOOKS
// =============================================================================

export {
  useAppDesignTokens,
} from '../theme/hooks/useAppDesignTokens';

export { useTheme as useThemeStore } from '../theme/infrastructure/stores/themeStore';

// =============================================================================
// RESPONSIVE HOOKS
// =============================================================================

export {
  useResponsive,
  useScreenWidth,
  useScreenHeight,
  useScreenDimensions,
  type UseResponsiveReturn,
} from '../responsive';

// =============================================================================
// SAFE AREA HOOKS
// =============================================================================

export {
  useSafeAreaInsets,
} from '../safe-area';

// =============================================================================
// INFINITE SCROLL HOOKS
// =============================================================================

export {
  useInfiniteScroll,
  type InfiniteScrollConfig,
  type UseInfiniteScrollReturn,
} from '../infinite-scroll';

// =============================================================================
// OFFLINE HOOKS
// =============================================================================

export {
  useOffline,
  type NetworkState,
} from '../offline';

// =============================================================================
// DEVICE HOOKS
// =============================================================================

export {
  useDeviceInfo,
  useDeviceCapabilities,
  useDeviceId,
  type DeviceInfo,
  type AnonymousUser,
} from '../device';

// =============================================================================
// STORAGE HOOKS
// =============================================================================

export {
  useStorage,
  useStorageState,
  useStore,
  usePersistentCache,
  useCache,
  useCachedValue,
  useCacheState,
  type PersistentCacheOptions,
  type PersistentCacheResult,
} from '../storage';

// =============================================================================
// MEDIA HOOKS
// =============================================================================

export {
  useMedia,
  type MediaPickerResult,
} from '../media';

// =============================================================================
// TIMEZONE HOOKS
// =============================================================================

export {
  useTimezone,
  type TimezoneInfo,
} from '../timezone';

// =============================================================================
// HAPTICS HOOKS
// =============================================================================

export {
  useHaptics,
} from '../haptics';

// =============================================================================
// LOADING HOOKS
// =============================================================================

export {
  useGlobalLoading,
  type LoadingState,
} from '../loading';
