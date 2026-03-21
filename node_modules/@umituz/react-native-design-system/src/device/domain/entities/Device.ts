/**
 * Device Domain - Core Entities
 *
 * This file defines core types and interfaces for device information.
 * All types are self-contained - no external dependencies for types.
 *
 * @domain device
 * @layer domain/entities
 */

/**
 * Device type enumeration (matches expo-device values)
 */
export enum DeviceType {
  UNKNOWN = 0,
  PHONE = 1,
  TABLET = 2,
  DESKTOP = 3,
  TV = 4,
}

/**
 * Device information interface
 */
export interface DeviceInfo {
  // Device identification
  brand: string | null;
  manufacturer: string | null;
  modelName: string | null;
  modelId: string | null;
  deviceName: string | null;
  deviceYearClass: number | null;

  // Device type
  deviceType: DeviceType | null;
  isDevice: boolean;

  // OS information
  osName: string | null;
  osVersion: string | null;
  osBuildId: string | null;
  platformApiLevel: number | null;

  // Memory
  totalMemory: number | null;

  // Platform
  platform: 'ios' | 'android' | 'web';

  // Localization
  timezone: string | null;
  region: string | null;
}

/**
 * Application information interface
 */
export interface ApplicationInfo {
  // App identification
  applicationName: string;
  applicationId: string;
  nativeApplicationVersion: string | null;
  nativeBuildVersion: string | null;

  // Installation
  installTime: Date | null;
  lastUpdateTime: Date | null;

  // Platform-specific
  androidId: string | null; // Android only
  iosIdForVendor: string | null; // iOS only
}

/**
 * Combined device and app info
 */
export interface SystemInfo {
  device: DeviceInfo;
  application: ApplicationInfo;
  timestamp: number;
  userId?: string;
}

/**
 * Device constants
 */
export const DEVICE_CONSTANTS = {
  DEVICE_TYPE: {
    UNKNOWN: 0,
    PHONE: 1,
    TABLET: 2,
    DESKTOP: 3,
    TV: 4,
  },
  PLATFORM: {
    IOS: 'ios',
    ANDROID: 'android',
    WEB: 'web',
  },
} as const;


