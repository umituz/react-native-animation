/**
 * Device Info Service
 *
 * Single Responsibility: Get device information from native modules.
 * Uses expo-device (optional peer dep) with safe fallback.
 */

import { Platform } from 'react-native';
import * as Localization from 'expo-localization';
import type { DeviceInfo } from '../../domain/entities/Device';
import { safeAccess, withTimeout } from '../utils/nativeModuleUtils';

// Lazy-load expo-device to avoid crash when native module is not available
let _deviceModule: typeof import('expo-device') | null = null;

const getDeviceModule = (): typeof import('expo-device') | null => {
  if (_deviceModule !== null) return _deviceModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _deviceModule = require('expo-device') as typeof import('expo-device');
    return _deviceModule;
  } catch {
    return null;
  }
};

export class DeviceInfoService {
  // Static cache for device info (app-lifetime)
  private static cachedDeviceInfo: DeviceInfo | null = null;
  private static cachePromise: Promise<DeviceInfo> | null = null;

  static async getDeviceInfo(): Promise<DeviceInfo> {
    // Return cached data if available
    if (this.cachedDeviceInfo) {
      return this.cachedDeviceInfo;
    }

    // Return existing promise if cache is being populated
    if (this.cachePromise) {
      return this.cachePromise;
    }

    // Populate cache
    this.cachePromise = this.fetchDeviceInfo();

    try {
      const deviceInfo = await this.cachePromise;
      this.cachedDeviceInfo = deviceInfo;
      return deviceInfo;
    } finally {
      this.cachePromise = null;
    }
  }

  private static async fetchDeviceInfo(): Promise<DeviceInfo> {
    try {
      const Device = getDeviceModule();

      const totalMemory: number | null = Device
        ? (await withTimeout<number>(() => Device.getMaxMemoryAsync(), 1000)) ?? null
        : null;

      const brand = Device ? safeAccess(() => Device.brand, null) : null;
      const manufacturer = Device ? safeAccess(() => Device.manufacturer, null) : null;
      const modelName = Device ? safeAccess(() => Device.modelName, null) : null;
      const modelId = Device ? safeAccess(() => Device.modelId, null) : null;
      const deviceName = Device ? safeAccess(() => Device.deviceName, null) : null;
      const deviceYearClass = Device ? safeAccess(() => Device.deviceYearClass, null) : null;
      const deviceType = Device ? safeAccess(() => Device.deviceType, null) : null;
      const isDevice = Device ? safeAccess(() => Device.isDevice, false) : false;
      const osName = Device ? safeAccess(() => Device.osName, null) : null;
      const osVersion = Device ? safeAccess(() => Device.osVersion, null) : null;
      const osBuildId = Device ? safeAccess(() => Device.osBuildId, null) : null;
      const platformApiLevel = Device ? safeAccess(() => Device.platformApiLevel, null) : null;

      const calendars = Localization.getCalendars();
      const locales = Localization.getLocales();
      const timezone = calendars?.[0]?.timeZone ?? null;
      const region = locales?.[0]?.regionCode ?? null;

      return {
        brand,
        manufacturer,
        modelName,
        modelId,
        deviceName,
        deviceYearClass,
        deviceType,
        isDevice,
        osName,
        osVersion,
        osBuildId,
        platformApiLevel,
        totalMemory,
        platform: Platform.OS as 'ios' | 'android' | 'web',
        timezone,
        region,
      };
    } catch {
      return this.getMinimalDeviceInfo();
    }
  }

  // Clear cache (useful for testing)
  static clearCache(): void {
    this.cachedDeviceInfo = null;
    this.cachePromise = null;
  }

  private static getMinimalDeviceInfo(): DeviceInfo {
    return {
      brand: null,
      manufacturer: null,
      modelName: null,
      modelId: null,
      deviceName: null,
      deviceYearClass: null,
      deviceType: null,
      isDevice: false,
      osName: null,
      osVersion: null,
      osBuildId: null,
      platformApiLevel: null,
      totalMemory: null,
      platform: Platform.OS as 'ios' | 'android' | 'web',
      timezone: null,
      region: null,
    };
  }
}
