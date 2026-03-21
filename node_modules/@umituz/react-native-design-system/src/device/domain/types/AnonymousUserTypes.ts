/**
 * Anonymous User Types
 *
 * Type definitions for device-based anonymous user identification.
 * Device ID is persistent across app reinstalls but device-specific.
 *
 * @domain device
 * @layer domain/types
 */

/**
 * Anonymous user data with persistent device-based identification
 */
export interface AnonymousUser {
  /** Persistent device-based user ID (stable across sessions and reinstalls) */
  userId: string;
  /** User-friendly device name (e.g., "iPhone13-A8F2") */
  deviceName: string;
  /** Display name for the anonymous user */
  displayName: string;
  /** Always true for anonymous users */
  isAnonymous: boolean;
}

/**
 * Options for anonymous user hook
 */
export interface UseAnonymousUserOptions {
  /** Custom display name for anonymous user */
  anonymousDisplayName?: string;
  /** Fallback user ID if device ID generation fails */
  fallbackUserId?: string;
}

/**
 * Return type for useAnonymousUser hook
 */
export interface UseAnonymousUserResult {
  /** Anonymous user data with persistent device-based ID */
  anonymousUser: AnonymousUser | null;
  /** Loading state */
  isLoading: boolean;
  /** Error message if ID generation failed */
  error: string | null;
  /** Refresh function to reload user data */
  refresh: () => Promise<void>;
}
