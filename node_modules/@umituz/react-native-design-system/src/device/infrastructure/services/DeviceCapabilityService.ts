/**
 * Device Capability Service
 *
 * Single Responsibility: Check device capabilities and features
 * Follows SOLID principles - only handles capability checks
 */

import { Platform } from 'react-native';
import { DeviceType } from '../../domain/entities/Device';
import { DeviceInfoService } from './DeviceInfoService';

/**
 * Service for checking device capabilities
 */
export class DeviceCapabilityService {
  /**
   * Check if device supports specific features
   */
  static async getDeviceCapabilities(): Promise<{
    isDevice: boolean;
    isTablet: boolean;
    hasNotch: boolean;
    totalMemoryGB: number | null;
  }> {
    const info = await DeviceInfoService.getDeviceInfo();

    return {
      isDevice: info.isDevice,
      isTablet: info.deviceType === DeviceType.TABLET,
      hasNotch: this.hasNotchFromInfo(info),
      totalMemoryGB: info.totalMemory
        ? info.totalMemory / (1024 * 1024 * 1024)
        : null,
    };
  }

  /**
   * Check if device has notch/dynamic island from existing info
   */
  private static hasNotchFromInfo(info: { modelName?: string | null }): boolean {
    if (Platform.OS !== 'ios') {
      return false;
    }
    const modelName = info.modelName?.toLowerCase() ?? '';
    return (
      modelName.includes('iphone x') ||
      modelName.includes('iphone 1') ||
      modelName.includes('pro')
    );
  }

  /**
   * Check if device has notch/dynamic island
   */
  static async hasNotch(): Promise<boolean> {
    try {
      const info = await DeviceInfoService.getDeviceInfo();
      return this.hasNotchFromInfo(info);
    } catch {
      return false;
    }
  }
}

