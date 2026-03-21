/**
 * Application Info Service
 *
 * Single Responsibility: Get application information from native modules
 * Follows SOLID principles - only handles application info retrieval
 */

import * as Application from 'expo-application';
import { Platform } from 'react-native';
import type { ApplicationInfo } from '../../domain/entities/Device';
import { safeAccess, withTimeout } from '../utils/nativeModuleUtils';

/**
 * Service for retrieving application information
 */
export class ApplicationInfoService {
  /**
   * Get application information
   * SAFE: Returns minimal info if native modules are not ready
   */
  static async getApplicationInfo(): Promise<ApplicationInfo> {
    try {
      const [installTimeResult, lastUpdateTimeResult] = await Promise.all([
        withTimeout<Date>(() => Application.getInstallationTimeAsync(), 1000),
        withTimeout<Date>(() => Application.getLastUpdateTimeAsync(), 1000),
      ]);

      const installTime: Date | null = installTimeResult ?? null;
      const lastUpdateTime: Date | null = lastUpdateTimeResult ?? null;

      const applicationName = safeAccess(() => Application.applicationName, 'Unknown');
      const applicationId = safeAccess(() => Application.applicationId, 'Unknown');
      const nativeApplicationVersion = safeAccess(
        () => Application.nativeApplicationVersion,
        null,
      );
      const nativeBuildVersion = safeAccess(
        () => Application.nativeBuildVersion,
        null,
      );

      let androidId: string | null = null;
      let iosIdForVendor: string | null = null;

      if (Platform.OS === 'android') {
        const result = await withTimeout(async () => Application.getAndroidId(), 1000);
        androidId = result || null;
      }

      if (Platform.OS === 'ios') {
        const result = await withTimeout(
          async () => Application.getIosIdForVendorAsync(),
          1000,
        );
        iosIdForVendor = result || null;
      }

      return {
        applicationName: applicationName || 'Unknown',
        applicationId: applicationId || 'Unknown',
        nativeApplicationVersion,
        nativeBuildVersion,
        installTime,
        lastUpdateTime,
        androidId,
        iosIdForVendor,
      };
    } catch {
      return this.getMinimalApplicationInfo();
    }
  }

  /**
   * Get minimal application info (fallback)
   */
  private static getMinimalApplicationInfo(): ApplicationInfo {
    return {
      applicationName: 'Unknown',
      applicationId: 'Unknown',
      nativeApplicationVersion: null,
      nativeBuildVersion: null,
      installTime: null,
      lastUpdateTime: null,
      androidId: null,
      iosIdForVendor: null,
    };
  }
}

