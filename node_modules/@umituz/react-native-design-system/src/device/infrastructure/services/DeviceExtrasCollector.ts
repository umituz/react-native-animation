/**
 * Device Extras Collector
 *
 * Collects device and application information for user documents.
 * Used with @umituz/react-native-auth's UserDocumentService.
 *
 * @domain device
 * @layer infrastructure/services
 */

import { Dimensions } from 'react-native';
import * as Localization from 'expo-localization';
import { DeviceInfoService } from './DeviceInfoService';
import { ApplicationInfoService } from './ApplicationInfoService';
import { DeviceIdService } from './DeviceIdService';
import { PersistentDeviceIdService } from './PersistentDeviceIdService';

/**
 * Device extras for user documents
 * Compatible with UserDocumentExtras from @umituz/react-native-auth
 * Index signature added for Record<string, unknown> compatibility
 */
export interface DeviceExtras {
  [key: string]: string | number | boolean | undefined;
  /** The stable ID stored in Keychain/SecureStore */
  deviceId: string;
  /** Alias for deviceId for clarity in Firestore */
  persistentDeviceId: string;
  /** The raw native platform ID (IDFV on iOS, Android ID on Android) */
  nativeDeviceId: string;
  platform: string;
  deviceModel: string;
  deviceBrand: string;
  deviceName: string;
  deviceType: number | string;
  deviceYearClass: number | string;
  isDevice: boolean;
  osName: string;
  osVersion: string;
  osBuildId: string;
  totalMemory: number | string;
  appVersion: string;
  buildNumber: string;
  locale: string;
  region: string;
  timezone: string;
  screenWidth: number;
  screenHeight: number;
  screenScale: number;
  fontScale: number;
  isLandscape: boolean;
}

/**
 * Get device locale code
 */
function getDeviceLocale(): string {
  try {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      const locale = locales[0];
      return locale?.languageTag || '-';
    }
    return '-';
  } catch {
    return '-';
  }
}

/**
 * Collect device extras for user documents
 *
 * @example
 * ```typescript
 * import { collectDeviceExtras } from '@umituz/react-native-design-system';
 * import { initializeAuth } from '@umituz/react-native-auth';
 *
 * await initializeAuth({
 *   userCollection: 'users',
 *   collectExtras: collectDeviceExtras,
 * });
 * ```
 */
export async function collectDeviceExtras(): Promise<DeviceExtras> {
  try {
    const [deviceInfo, appInfo, deviceId, nativeDeviceId] = await Promise.all([
      DeviceInfoService.getDeviceInfo(),
      ApplicationInfoService.getApplicationInfo(),
      PersistentDeviceIdService.getDeviceId(),
      DeviceIdService.getDeviceId(),
    ]);

    const locale = getDeviceLocale();
    const { width, height, scale, fontScale } = Dimensions.get('screen');

    return {
      deviceId: deviceId || '-',
      persistentDeviceId: deviceId || '-',
      nativeDeviceId: nativeDeviceId || '-',
      platform: deviceInfo.platform || '-',
      deviceModel: deviceInfo.modelName || '-',
      deviceBrand: deviceInfo.brand || '-',
      deviceName: deviceInfo.deviceName || '-',
      deviceType: deviceInfo.deviceType ?? '-',
      deviceYearClass: deviceInfo.deviceYearClass ?? '-',
      isDevice: deviceInfo.isDevice ?? false,
      osName: deviceInfo.osName || '-',
      osVersion: deviceInfo.osVersion || '-',
      osBuildId: deviceInfo.osBuildId || '-',
      totalMemory: deviceInfo.totalMemory ?? '-',
      appVersion: appInfo.nativeApplicationVersion || '-',
      buildNumber: appInfo.nativeBuildVersion || '-',
      locale,
      region: deviceInfo.region || '-',
      timezone: deviceInfo.timezone || '-',
      screenWidth: Math.round(width) || 0,
      screenHeight: Math.round(height) || 0,
      screenScale: scale || 1,
      fontScale: fontScale || 1,
      isLandscape: width > height,
    };
  } catch {
    return {
      deviceId: '-',
      persistentDeviceId: '-',
      nativeDeviceId: '-',
      platform: '-',
      deviceModel: '-',
      deviceBrand: '-',
      deviceName: '-',
      deviceType: '-',
      deviceYearClass: '-',
      isDevice: false,
      osName: '-',
      osVersion: '-',
      osBuildId: '-',
      totalMemory: '-',
      appVersion: '-',
      buildNumber: '-',
      locale: '-',
      region: '-',
      timezone: '-',
      screenWidth: 0,
      screenHeight: 0,
      screenScale: 1,
      fontScale: 1,
      isLandscape: false,
    };
  }
}
