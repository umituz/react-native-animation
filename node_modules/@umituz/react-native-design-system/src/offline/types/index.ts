/**
 * Type Definitions
 * Network connectivity state types for React Native apps
 */

/**
 * Network state from expo-network
 */
export interface NetworkState {
  readonly type: string;
  readonly isConnected: boolean | null;
  readonly isInternetReachable: boolean | null;
  readonly details: unknown;
}

/**
 * Configuration for offline behavior
 */
export interface OfflineConfig {
  /** Enable persistent storage of network state */
  persist?: boolean;
  /** Enable debug logging */
  debug?: boolean;
  /** Health check interval in ms (0 = disabled) */
  healthCheckInterval?: number;
  /** Health check timeout in ms */
  healthCheckTimeout?: number;
  /** Health check URL to ping */
  healthCheckUrl?: string;
}

/**
 * Connection quality metrics
 */
export interface ConnectionQuality {
  readonly latency: number | null;
  readonly effectiveType: '2g' | '3g' | '4g' | '5g' | 'unknown' | null;
  readonly isSlow: boolean;
}

/**
 * Offline state representation
 */
export interface OfflineState {
  readonly isOnline: boolean;
  readonly isOffline: boolean;
  readonly connectionType: string | null;
  readonly isInternetReachable: boolean | null;
  readonly lastOnlineAt: Date | null;
  readonly lastOfflineAt: Date | null;
  readonly connectionQuality: ConnectionQuality;
}

/**
 * Offline store actions
 */
export interface OfflineActions {
  readonly updateNetworkState: (state: NetworkState) => void;
  readonly setOnline: () => void;
  readonly setOffline: () => void;
  readonly reset: () => void;
}

/**
 * Offline store with state and actions
 */
export interface OfflineStore extends OfflineState, OfflineActions {}
