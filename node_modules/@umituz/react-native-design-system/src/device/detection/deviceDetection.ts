/**
 * Device Detection Utilities
 *
 * Uses expo-device (optional) for primary device type detection.
 * Falls back to Platform.isPad + screen dimensions when expo-device is not installed.
 */

import { Dimensions, Platform } from 'react-native';
import { DEVICE_BREAKPOINTS, LAYOUT_CONSTANTS } from '../../responsive/config';
import { validateScreenDimensions } from '../../responsive/validation';

// Lazy-load expo-device to avoid crash when native module is not available
let _deviceModule: typeof import('expo-device') | null = null;

const getDeviceModule = (): typeof import('expo-device') | null => {
  if (_deviceModule !== null) return _deviceModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _deviceModule = require('expo-device') as typeof import('expo-device');
    return _deviceModule;
  } catch (error) {
    if (__DEV__) {
      console.warn('[deviceDetection] expo-device not available:', error);
    }
    return null;
  }
};

export enum DeviceType {
  SMALL_PHONE = 'SMALL_PHONE',
  MEDIUM_PHONE = 'MEDIUM_PHONE',
  LARGE_PHONE = 'LARGE_PHONE',
  TABLET = 'TABLET',
}

export const getScreenDimensions = () => {
  const { width, height } = Dimensions.get('window');
  try {
    validateScreenDimensions(width, height);
    return { width, height };
  } catch (error) {
    if (__DEV__) {
      console.warn('[deviceDetection] Invalid screen dimensions, using fallback:', error);
    }
    return { width: 414, height: 896 };
  }
};

export const isTablet = (): boolean => {
  const Device = getDeviceModule();
  if (Device) {
    return Device.deviceType === Device.DeviceType.TABLET;
  }
  // Fallback: Platform.isPad (iOS) or screen width >= 600dp (Android)
  // Platform.isPad is not in React Native types but exists on iOS
  const platformWithIsPad = Platform as { isPad?: boolean };
  if (Platform.OS === 'ios' && platformWithIsPad.isPad) return true;
  const { width, height } = getScreenDimensions();
  return Math.min(width, height) >= 600;
};

export const isPhone = (): boolean => {
  return !isTablet();
};

export const isSmallPhone = (offset?: { width: number }): boolean => {
  if (!isPhone()) return false;
  const { width } = offset || getScreenDimensions();
  return width <= DEVICE_BREAKPOINTS.SMALL_PHONE;
};

export const isLargePhone = (offset?: { width: number }): boolean => {
  if (!isPhone()) return false;
  const { width } = offset || getScreenDimensions();
  return width >= DEVICE_BREAKPOINTS.MEDIUM_PHONE;
};

export const isLandscape = (offset?: { width: number; height: number }): boolean => {
  const { width, height } = offset || getScreenDimensions();
  return width > height;
};

export const getDeviceType = (offset?: { width: number }): DeviceType => {
  if (isTablet()) {
    return DeviceType.TABLET;
  }
  const { width } = offset || getScreenDimensions();
  if (width <= DEVICE_BREAKPOINTS.SMALL_PHONE) {
    return DeviceType.SMALL_PHONE;
  } else if (width <= DEVICE_BREAKPOINTS.MEDIUM_PHONE) {
    return DeviceType.MEDIUM_PHONE;
  }
  return DeviceType.LARGE_PHONE;
};

export const getSpacingMultiplier = (offset?: { width: number }): number => {
  if (isTablet()) {
    return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_TABLET;
  }
  if (isSmallPhone(offset)) {
    return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_SMALL;
  }
  return LAYOUT_CONSTANTS.SPACING_MULTIPLIER_STANDARD;
};
