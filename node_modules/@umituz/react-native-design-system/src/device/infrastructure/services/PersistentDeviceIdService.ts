import { generateUUID } from '../../../uuid';
import { SecureDeviceIdRepository } from '../repositories/SecureDeviceIdRepository';
import { DeviceIdService } from './DeviceIdService';

let cachedDeviceId: string | null = null;
let initializationPromise: Promise<string> | null = null;

/**
 * Persistent Device ID Service
 *
 * Provides a stable device identifier that survives app reinstalls.
 * Priority: SecureStore (true keychain persistence) > Migration > Native ID > Generated UUID
 *
 * @domain device
 * @layer infrastructure/services
 */
export class PersistentDeviceIdService {
  private static secureRepo = new SecureDeviceIdRepository();

  /**
   * Get device ID with caching and concurrent request handling
   */
  static async getDeviceId(): Promise<string> {
    if (cachedDeviceId) {
      return cachedDeviceId;
    }

    if (initializationPromise) {
      return initializationPromise;
    }

    initializationPromise = this.initializeDeviceId();
    return initializationPromise;
  }

  /**
   * Logic to establish a persistent ID
   */
  private static async initializeDeviceId(): Promise<string> {
    try {
      // 1. Try secure repository (Keychain)
      const secureId = await this.secureRepo.get();

      if (secureId) {
        if (__DEV__) {
          console.log(`[DesignSystem] Device ID: Using secure ID: ${secureId}`);
        }
        cachedDeviceId = secureId;
        return secureId;
      }

      // 2. Create brand new ID
      const newId = await this.createNewDeviceId();
      await this.secureRepo.set(newId);

      if (__DEV__) {
        console.log(`[DesignSystem] Device ID: Created new ID: ${newId}`);
      }

      cachedDeviceId = newId;
      return newId;
    } catch (error) {
      if (__DEV__) {
        console.error('[DesignSystem] Device ID: Initialization failed', error);
      }
      const fallbackId = `fallback_${generateUUID()}`;
      cachedDeviceId = fallbackId;
      return fallbackId;
    }
  }

  /**
   * Generates a new ID based on platform info if possible
   */
  private static async createNewDeviceId(): Promise<string> {
    const nativeId = await DeviceIdService.getDeviceId();

    if (nativeId) {
      return `device_${nativeId}`;
    }

    return `gen_${generateUUID()}`;
  }

  /**
   * Check if an ID exists without initializing
   */
  static async hasStoredId(): Promise<boolean> {
    try {
      const secureId = await this.secureRepo.get();
      return secureId !== null;
    } catch {
      return false;
    }
  }

  /**
   * Fully clear all stored identifiers
   */
  static async clearStoredId(): Promise<void> {
    try {
      // Wait for pending initialization to prevent race condition
      if (initializationPromise) {
        await initializationPromise.catch((error) => {
          if (__DEV__) {
            console.warn('[DesignSystem] Device ID: Initialization failed while clearing ID', error);
          }
        });
      }
      await this.secureRepo.remove();
      cachedDeviceId = null;
      initializationPromise = null;
      if (__DEV__) {
        console.log('[DesignSystem] Device ID: Stored ID cleared');
      }
    } catch (error) {
      if (__DEV__) {
        console.warn('[DesignSystem] Device ID: Failed to clear stored ID', error);
      }
    }
  }

  /**
   * Get current cached ID synchronously
   */
  static getCachedId(): string | null {
    return cachedDeviceId;
  }
}
