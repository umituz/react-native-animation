/**
 * Generic Permission Handler
 *
 * Generic permission handling using strategy pattern.
 * Reduces permission method duplication from 4 methods → 1 generic handler.
 *
 * @example
 * ```ts
 * const handler = new PermissionHandler({
 *   methods: {
 *     request: {
 *       camera: ImagePicker.requestCameraPermissionsAsync,
 *       mediaLibrary: ImagePicker.requestMediaLibraryPermissionsAsync,
 *     },
 *     get: {
 *       camera: ImagePicker.getCameraPermissionsAsync,
 *       mediaLibrary: ImagePicker.getMediaLibraryPermissionsAsync,
 *     },
 *   },
 *   statusMapper: mapPermissionStatus,
 *   defaultStatus: MediaLibraryPermission.DENIED,
 * });
 *
 * // Request permission
 * const status = await handler.handle('request', 'camera');
 *
 * // Check if granted
 * if (handler.isGranted(status)) {
 *   // Proceed with operation
 * }
 * ```
 */

import type {
  PermissionMethod,
  PermissionStatus,
  PermissionHandlerConfig,
  PermissionMethods,
} from './types';

/**
 * Generic permission handler with configurable methods and status mapping
 */
export class PermissionHandler<TPermission extends PermissionStatus = PermissionStatus> {
  private methods: PermissionMethods;
  private statusMapper: (apiStatus: string) => TPermission;
  private defaultStatus: TPermission;

  constructor(config: PermissionHandlerConfig<TPermission>) {
    this.methods = config.methods;
    this.statusMapper = config.statusMapper;
    this.defaultStatus = config.defaultStatus ?? ('denied' as TPermission);
  }

  /**
   * Handle permission request or status check
   *
   * @param method - 'request' or 'get'
   * @param type - Permission type key (e.g., 'camera', 'mediaLibrary')
   * @returns Permission status
   */
  async handle(
    method: PermissionMethod,
    type: string
  ): Promise<TPermission> {
    const permissionFn = this.methods[method]?.[type];

    if (!permissionFn) {
      if (__DEV__) {
        console.warn(
          `[PermissionHandler] No ${method} method found for permission type: ${type}`
        );
      }
      return this.defaultStatus;
    }

    try {
      const result = await permissionFn();
      return this.statusMapper(result.status);
    } catch (error) {
      if (__DEV__) {
        console.warn(
          `[PermissionHandler] Failed to ${method} ${type} permission:`,
          error
        );
      }
      return this.defaultStatus;
    }
  }

  /**
   * Check if permission status is granted
   *
   * @param status - Permission status to check
   * @returns true if permission is granted or limited
   */
  isGranted(status: TPermission): boolean {
    return (
      status === 'granted' ||
      status === 'limited' ||
      (status as string) === 'granted' ||
      (status as string) === 'limited'
    );
  }

  /**
   * Check if permission status is denied
   *
   * @param status - Permission status to check
   * @returns true if permission is denied
   */
  isDenied(status: TPermission): boolean {
    return !this.isGranted(status);
  }

  /**
   * Request permission by type
   *
   * @example
   * ```ts
   * const status = await handler.request('camera');
   * ```
   */
  async request(type: string): Promise<TPermission> {
    return this.handle('request', type);
  }

  /**
   * Get permission status by type
   *
   * @example
   * ```ts
   * const status = await handler.getStatus('camera');
   * ```
   */
  async getStatus(type: string): Promise<TPermission> {
    return this.handle('get', type);
  }
}
