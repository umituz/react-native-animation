/**
 * Device Type Utilities
 *
 * Utility functions for device type detection
 */

import type { DeviceType } from './Device';
import { DEVICE_CONSTANTS } from './Device';

/**
 * Device type utilities
 */
export class DeviceTypeUtils {
  /**
   * Check if device is a tablet
   */
  static isTablet(deviceType: DeviceType | null): boolean {
    return deviceType === DEVICE_CONSTANTS.DEVICE_TYPE.TABLET;
  }

  /**
   * Check if device is a phone
   */
  static isPhone(deviceType: DeviceType | null): boolean {
    return deviceType === DEVICE_CONSTANTS.DEVICE_TYPE.PHONE;
  }

  /**
   * Check if device is desktop
   */
  static isDesktop(deviceType: DeviceType | null): boolean {
    return deviceType === DEVICE_CONSTANTS.DEVICE_TYPE.DESKTOP;
  }

  /**
   * Check if device is TV
   */
  static isTV(deviceType: DeviceType | null): boolean {
    return deviceType === DEVICE_CONSTANTS.DEVICE_TYPE.TV;
  }

  /**
   * Check if device type is unknown
   */
  static isUnknown(deviceType: DeviceType | null): boolean {
    return deviceType === DEVICE_CONSTANTS.DEVICE_TYPE.UNKNOWN;
  }

  /**
   * Get device type name
   */
  static getDeviceTypeName(deviceType: DeviceType | null): string {
    switch (deviceType) {
      case DEVICE_CONSTANTS.DEVICE_TYPE.PHONE:
        return 'Phone';
      case DEVICE_CONSTANTS.DEVICE_TYPE.TABLET:
        return 'Tablet';
      case DEVICE_CONSTANTS.DEVICE_TYPE.DESKTOP:
        return 'Desktop';
      case DEVICE_CONSTANTS.DEVICE_TYPE.TV:
        return 'TV';
      default:
        return 'Unknown';
    }
  }
}