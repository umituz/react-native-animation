/**
 * @umituz/react-native-design-system
 *
 * Sub-path imports ONLY. Barrel import is disabled to prevent
 * bundling unused modules with optional peer dependencies.
 *
 * Usage:
 *   import { DesignSystemProvider, useAppDesignTokens } from "@umituz/react-native-design-system/theme";
 *   import { AtomicText, AtomicButton } from "@umituz/react-native-design-system/atoms";
 *   import { FormField } from "@umituz/react-native-design-system/molecules";
 *   import { generateUUID } from "@umituz/react-native-design-system/uuid";
 *
 * Available sub-paths:
 *   /atoms        - AtomicText, AtomicButton, AtomicIcon, AtomicSpinner, etc.
 *   /molecules    - FormField, AppNavigation, AlertContainer, BottomSheet, etc.
 *   /organisms    - Complex screen-level components
 *   /theme        - DesignSystemProvider, useAppDesignTokens, useTheme
 *   /typography   - Typography utilities
 *   /responsive   - useResponsive
 *   /layouts      - ScreenLayout
 *   /safe-area    - useSafeAreaInsets
 *   /exception    - ErrorBoundary, ExceptionErrorState
 *   /infinite-scroll - useInfiniteScroll, InfiniteScrollList
 *   /uuid         - generateUUID, isValidUUID
 *   /timezone     - useTimezone, date utilities
 *   /offline      - useOffline, OfflineBanner
 *   /storage      - storageRepository, useStorageState
 *   /filesystem   - useFilesystem, Directory
 *   /media        - MediaPickerService
 *   /image        - AtomicImage, ImageGallery
 *   /tanstack     - TanstackProvider
 *   /loading      - LoadingProvider, useGlobalLoading
 *   /haptics      - HapticService, useHaptics
 *   /onboarding   - OnboardingScreen, ChatOnboardingScreen (chat-based)
 *   /gallery      - gallerySaveService
 *   /carousel     - Carousel components
 *   /init         - createAppInitializer, createEnvConfig
 *   /device       - DeviceService, useDeviceInfo
 *   /core         - UnifiedCache, PermissionHandler, Repository utilities
 */

if (__DEV__) {
  console.warn(
    '[@umituz/react-native-design-system] Barrel import is disabled. ' +
    'Use sub-path imports instead: e.g. "@umituz/react-native-design-system/theme"'
  );
}

export {};
