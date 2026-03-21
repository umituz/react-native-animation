/**
 * Secure Device ID Repository
 *
 * Uses iOS Keychain with AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY for:
 * - Persistence across app reinstalls
 * - Device-specific (no backup migration)
 * - Accessible after first unlock (background tasks)
 *
 * @domain device
 * @layer infrastructure/repositories
 */

import * as SecureStore from 'expo-secure-store';

const DEVICE_ID_KEY = '@device/persistent_id';
const MIGRATION_FLAG_KEY = '@device/migration_completed';

const KEYCHAIN_OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
};

export class SecureDeviceIdRepository {
  async get(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(DEVICE_ID_KEY, KEYCHAIN_OPTIONS);
    } catch {
      return null;
    }
  }

  async set(deviceId: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(DEVICE_ID_KEY, deviceId, KEYCHAIN_OPTIONS);
    } catch {
      // Silent fail
    }
  }

  async hasMigrated(): Promise<boolean> {
    try {
      const flag = await SecureStore.getItemAsync(MIGRATION_FLAG_KEY, KEYCHAIN_OPTIONS);
      return flag === 'true';
    } catch {
      return false;
    }
  }

  async setMigrated(): Promise<void> {
    try {
      await SecureStore.setItemAsync(MIGRATION_FLAG_KEY, 'true', KEYCHAIN_OPTIONS);
    } catch {
      // Silent fail
    }
  }

  async remove(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(DEVICE_ID_KEY, KEYCHAIN_OPTIONS);
    } catch {
      // Silent fail
    }
  }
}
