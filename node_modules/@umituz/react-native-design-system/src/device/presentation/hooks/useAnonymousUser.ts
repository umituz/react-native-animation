/**
 * Anonymous User Hook
 *
 * Provides persistent device-based user ID for anonymous users.
 * Uses iOS Keychain with AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY for:
 * - Stable ID across app restarts and reinstalls
 * - Device-specific (no backup migration)
 * - Compatible with Firebase Anonymous Auth
 *
 * @domain device
 * @layer presentation/hooks
 */

import { useMemo, useCallback } from 'react';
import { PersistentDeviceIdService } from '../../infrastructure/services/PersistentDeviceIdService';
import { DeviceService } from '../../infrastructure/services/DeviceService';
import type {
  AnonymousUser,
  UseAnonymousUserOptions,
  UseAnonymousUserResult,
} from '../../domain/types/AnonymousUserTypes';
import { useAsyncOperation } from '../../../utils/hooks';

/**
 * useAnonymousUser hook for persistent device-based user identification
 *
 * USAGE:
 * ```typescript
 * import { useAnonymousUser } from '@umituz/react-native-design-system';
 *
 * const { anonymousUser, isLoading } = useAnonymousUser();
 *
 * // Use for subscription services
 * await subscriptionService.initialize(anonymousUser?.userId);
 *
 * // Use in SettingsScreen
 * <UserProfileHeader
 *   userId={anonymousUser?.userId}
 *   displayName={anonymousUser?.displayName}
 *   isAnonymous={anonymousUser?.isAnonymous}
 * />
 * ```
 */
export const useAnonymousUser = (
  options?: UseAnonymousUserOptions
): UseAnonymousUserResult => {
  const {
    anonymousDisplayName = 'Anonymous',
  } = options || {};

  const { data: anonymousUser, isLoading, error, execute } = useAsyncOperation<AnonymousUser, string>(
    async () => {
      const [userId, deviceName] = await Promise.all([
        PersistentDeviceIdService.getDeviceId(),
        DeviceService.getUserFriendlyId(),
      ]);

      // No fallback - if we can't get ID, let it error
      if (!userId) {
        throw new Error('Failed to generate device ID');
      }

      return {
        userId,
        deviceName: deviceName ?? 'Device',
        displayName: anonymousDisplayName,
        isAnonymous: true,
      };
    },
    {
      immediate: true,
      initialData: null,
      errorHandler: (err) => `Failed to generate device ID: ${err instanceof Error ? err.message : String(err)}`,
    }
  );

  const refresh = useCallback(async () => {
    await execute();
  }, [execute]);

  return useMemo(() => ({
    anonymousUser,
    isLoading,
    error,
    refresh,
  }), [anonymousUser, isLoading, error, refresh]);
};
