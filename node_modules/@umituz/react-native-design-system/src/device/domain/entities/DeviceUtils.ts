/**
 * Device Utilities
 * Helper functions for processing device information
 */

import { DeviceInfo, ApplicationInfo } from './Device';

export class DeviceUtils {
  /**
   * Check if running on physical device (not simulator/emulator)
   */
  static isPhysicalDevice(isDevice: boolean): boolean {
    return isDevice;
  }

  /**
   * Get device display name
   */
  static getDeviceDisplayName(info: DeviceInfo): string {
    if (info.deviceName) return info.deviceName;
    if (info.modelName) return info.modelName;
    if (info.brand && info.manufacturer) return `${info.brand} ${info.manufacturer}`;
    return 'Unknown Device';
  }

  /**
   * Get OS display string
   */
  static getOSDisplayString(info: DeviceInfo): string {
    if (info.osName && info.osVersion) {
      return `${info.osName} ${info.osVersion}`;
    }
    return info.osName || 'Unknown OS';
  }

  /**
   * Get app version string
   */
  static getAppVersionString(info: ApplicationInfo): string {
    if (info.nativeApplicationVersion && info.nativeBuildVersion) {
      return `${info.nativeApplicationVersion} (${info.nativeBuildVersion})`;
    }
    return info.nativeApplicationVersion || 'Unknown Version';
  }

  /**
   * Check if device meets minimum requirements
   */
  static meetsMinimumRequirements(info: DeviceInfo, minMemoryGB: number = 1): {
    meets: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];

    if (!info.isDevice) {
      reasons.push('Running on simulator/emulator');
    }

    if (info.totalMemory) {
      const memoryGB = info.totalMemory / (1024 * 1024 * 1024);
      if (memoryGB < minMemoryGB) {
        reasons.push(`Insufficient memory: ${memoryGB.toFixed(2)}GB (minimum: ${minMemoryGB}GB)`);
      }
    }

    if (info.deviceYearClass && info.deviceYearClass < 2018) {
      reasons.push(`Device too old: ${info.deviceYearClass} (minimum: 2018)`);
    }

    return {
      meets: reasons.length === 0,
      reasons,
    };
  }

  /**
   * Get device tier (low/mid/high) based on specs
   */
  static getDeviceTier(info: DeviceInfo): 'low' | 'mid' | 'high' {
    if (info.deviceYearClass) {
      if (info.deviceYearClass >= 2022) return 'high';
      if (info.deviceYearClass >= 2019) return 'mid';
      return 'low';
    }

    if (info.totalMemory) {
      const memoryGB = info.totalMemory / (1024 * 1024 * 1024);
      if (memoryGB >= 6) return 'high';
      if (memoryGB >= 3) return 'mid';
      return 'low';
    }

    return 'mid';
  }
}
