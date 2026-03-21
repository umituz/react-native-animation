/**
 * @umituz/react-native-offline
 * Network connectivity state management for React Native apps
 */

// Types
export type {
  NetworkState,
  OfflineState,
  OfflineStore,
  OfflineConfig,
  ConnectionQuality,
} from './types';

// Store
export { useOfflineStore } from './infrastructure/storage/OfflineStore';
export { useOfflineConfigStore } from './infrastructure/storage/OfflineConfigStore';

// Hooks
export { useOffline } from './presentation/hooks/useOffline';
export { useOfflineState } from './presentation/hooks/useOfflineState';
export { useOfflineWithMutations } from './presentation/hooks/useOfflineWithMutations';

// Components
export { OfflineBanner } from './presentation/components/OfflineBanner';
export type { OfflineBannerProps } from './presentation/components/OfflineBanner';

// Providers
export { NetworkProvider } from './presentation/providers/NetworkProvider';

// Events
export { networkEvents } from './infrastructure/events/NetworkEvents';
export type { NetworkEventListener, NetworkEvents } from './infrastructure/events/NetworkEvents';

// Utils
export { HealthCheck } from './infrastructure/utils/healthCheck';
