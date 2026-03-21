/**
 * useDeviceFeatures Hook
 *
 * Hook for checking and tracking device-based feature usage.
 * Main app provides feature configuration via DesignSystemProvider.
 *
 * @param featureName - Name of the feature to track
 * @returns Feature access status and usage tracking functions
 */

import { useState, useEffect, useCallback } from 'react';
import { DeviceFeatureService } from '../../infrastructure/services/DeviceFeatureService';
import type { DeviceFeatureAccess } from '../../domain/entities/DeviceFeatureConfig';

interface UseDeviceFeaturesResult extends DeviceFeatureAccess {
  incrementUsage: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useDeviceFeatures(
  featureName: string
): UseDeviceFeaturesResult {
  const [access, setAccess] = useState<DeviceFeatureAccess>({
    isAllowed: true,
    remainingUses: -1,
    usageCount: 0,
    resetAt: null,
    maxUses: -1,
  });

  const checkAccess = useCallback(async () => {
    try {
      const result = await DeviceFeatureService.checkFeatureAccess(featureName);
      setAccess(result);
    } catch (error) {
      if (__DEV__) {
        console.warn(`[DesignSystem] useDeviceFeatures: Failed to check access for "${featureName}"`, error);
      }
    }
  }, [featureName]);

  const incrementUsage = useCallback(async () => {
    try {
      await DeviceFeatureService.incrementFeatureUsage(featureName);
      await checkAccess();
    } catch (error) {
      if (__DEV__) {
        console.warn(`[DesignSystem] useDeviceFeatures: Failed to increment usage for "${featureName}"`, error);
      }
    }
  }, [featureName, checkAccess]);

  const refresh = useCallback(async () => {
    await checkAccess();
  }, [checkAccess]);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  return {
    ...access,
    incrementUsage,
    refresh,
  };
}
