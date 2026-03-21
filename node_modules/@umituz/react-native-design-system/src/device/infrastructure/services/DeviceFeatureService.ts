/**
 * Device Feature Service
 *
 * Generic service for tracking device-based feature usage.
 * Apps configure feature limits via props, service tracks usage.
 *
 * @domain device
 * @layer infrastructure/services
 */

import { storageRepository, unwrap } from '../../../storage';
import type {
  DeviceFeatureConfig,
  DeviceFeatureUsage,
  DeviceFeatureAccess,
  ResetPeriod,
} from '../../domain/entities/DeviceFeatureConfig';
import { PersistentDeviceIdService } from './PersistentDeviceIdService';
import { ErrorHandler } from '../../../utils/errors/ErrorHandler';

export class DeviceFeatureService {
  private static config: DeviceFeatureConfig = { features: {} };

  // In-memory usage tracking for debouncing
  private static inMemoryUsage = new Map<string, number>();
  private static dirtyFeatures = new Set<string>();
  private static flushInterval: ReturnType<typeof setInterval> | null = null;
  private static FLUSH_DELAY = 5000; // 5 seconds

  static setConfig(config: DeviceFeatureConfig): void {
    this.config = config;
    this.startPeriodicFlush();
  }

  /**
   * Start periodic flush of in-memory usage to storage
   */
  private static startPeriodicFlush(): void {
    if (this.flushInterval) return;

    this.flushInterval = setInterval(() => {
      this.flushDirtyFeatures();
    }, this.FLUSH_DELAY);
  }

  /**
   * Flush dirty features to storage
   */
  private static async flushDirtyFeatures(): Promise<void> {
    if (this.dirtyFeatures.size === 0) return;

    const featuresToFlush = Array.from(this.dirtyFeatures);
    this.dirtyFeatures.clear();

    for (const featureKey of featuresToFlush) {
      const [deviceId, featureName] = featureKey.split(':');
      const increment = this.inMemoryUsage.get(featureKey) || 0;

      if (increment > 0) {
        try {
          const usage = await this.getFeatureUsage(deviceId, featureName);
          const updatedUsage: DeviceFeatureUsage = {
            ...usage,
            usageCount: usage.usageCount + increment,
          };

          await this.setFeatureUsage(deviceId, featureName, updatedUsage);
          this.inMemoryUsage.delete(featureKey);
        } catch (error) {
          ErrorHandler.log(error);
        }
      }
    }
  }

  /**
   * Stop periodic flush (call on app cleanup)
   */
  static async destroy(): Promise<void> {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }

    // Flush any remaining dirty features
    await this.flushDirtyFeatures();
    this.inMemoryUsage.clear();
  }

  static async checkFeatureAccess(
    featureName: string
  ): Promise<DeviceFeatureAccess> {
    const deviceId = await PersistentDeviceIdService.getDeviceId();
    const featureConfig = this.config.features[featureName];

    if (!featureConfig) {
      return {
        isAllowed: true,
        remainingUses: -1,
        usageCount: 0,
        resetAt: null,
        maxUses: -1,
      };
    }

    const usage = await this.getFeatureUsage(deviceId, featureName);
    const featureKey = `${deviceId}:${featureName}`;
    const inMemoryIncrement = this.inMemoryUsage.get(featureKey) || 0;
    const totalUsageCount = usage.usageCount + inMemoryIncrement;

    const shouldReset = this.shouldResetUsage(usage, featureConfig.resetPeriod);

    if (shouldReset) {
      await this.resetFeatureUsage(deviceId, featureName);
      // Clear in-memory counter on reset
      this.inMemoryUsage.delete(featureKey);
      this.dirtyFeatures.delete(featureKey);
      return {
        isAllowed: true,
        remainingUses: featureConfig.maxUses - 1,
        usageCount: 0,
        resetAt: this.calculateNextReset(featureConfig.resetPeriod),
        maxUses: featureConfig.maxUses,
      };
    }

    const isAllowed = totalUsageCount < featureConfig.maxUses;
    const remainingUses = Math.max(
      0,
      featureConfig.maxUses - totalUsageCount
    );

    return {
      isAllowed,
      remainingUses,
      usageCount: totalUsageCount,
      resetAt: this.calculateNextReset(featureConfig.resetPeriod),
      maxUses: featureConfig.maxUses,
    };
  }

  static async incrementFeatureUsage(featureName: string): Promise<void> {
    const deviceId = await PersistentDeviceIdService.getDeviceId();
    const featureKey = `${deviceId}:${featureName}`;

    // Increment in-memory counter
    const currentCount = this.inMemoryUsage.get(featureKey) || 0;
    this.inMemoryUsage.set(featureKey, currentCount + 1);

    // Mark as dirty for periodic flush
    this.dirtyFeatures.add(featureKey);

    // If this is the first increment, fetch current usage and set baseline
    if (currentCount === 0) {
      try {
        const usage = await this.getFeatureUsage(deviceId, featureName);
        // Store baseline to avoid double-counting
        this.inMemoryUsage.set(featureKey, 0);
      } catch (error) {
        ErrorHandler.log(error);
      }
    }
  }

  private static async getFeatureUsage(
    deviceId: string,
    featureName: string
  ): Promise<DeviceFeatureUsage> {
    const key = this.getStorageKey(deviceId, featureName);
    const now = Date.now();
    const defaultUsage: DeviceFeatureUsage = {
      usageCount: 0,
      lastResetAt: now,
      firstUsedAt: now,
    };

    try {
      const result = await storageRepository.getItem<DeviceFeatureUsage>(
        key,
        defaultUsage
      );
      return unwrap(result, defaultUsage);
    } catch (error) {
      ErrorHandler.log(error);
      return defaultUsage;
    }
  }

  private static async setFeatureUsage(
    deviceId: string,
    featureName: string,
    usage: DeviceFeatureUsage
  ): Promise<void> {
    const key = this.getStorageKey(deviceId, featureName);
    try {
      await storageRepository.setItem(key, usage);
    } catch (error) {
      if (__DEV__) {
        console.warn(`[DesignSystem] DeviceFeatureService: Failed to persist usage for "${featureName}"`, error);
      }
    }
  }

  private static async resetFeatureUsage(
    deviceId: string,
    featureName: string
  ): Promise<void> {
    const now = Date.now();
    const usage = await this.getFeatureUsage(deviceId, featureName);

    const resetUsage: DeviceFeatureUsage = {
      ...usage,
      usageCount: 0,
      lastResetAt: now,
    };

    await this.setFeatureUsage(deviceId, featureName, resetUsage);
  }

  private static shouldResetUsage(
    usage: DeviceFeatureUsage,
    resetPeriod: ResetPeriod
  ): boolean {
    if (resetPeriod === 'never') {
      return false;
    }

    const now = Date.now();
    const timeSinceReset = now - usage.lastResetAt;
    const periods: Record<ResetPeriod, number> = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      never: Infinity,
    };

    return timeSinceReset >= periods[resetPeriod];
  }

  private static calculateNextReset(resetPeriod: ResetPeriod): number | null {
    if (resetPeriod === 'never') {
      return null;
    }

    const now = Date.now();
    const periods: Record<ResetPeriod, number> = {
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      never: 0,
    };

    return now + periods[resetPeriod];
  }

  private static getStorageKey(deviceId: string, featureName: string): string {
    return `@device/feature/${deviceId}/${featureName}`;
  }
}
