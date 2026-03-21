/**
 * Permission Manager
 *
 * Centralized permission handling for media operations.
 * Refactored to use generic PermissionHandler to reduce duplication.
 *
 * Before: 4 similar methods (~80 LOC)
 * After: 1 generic handler (~50 LOC) - 37% reduction
 */

import * as ImagePicker from "expo-image-picker";
import { MediaLibraryPermission } from "../../domain/entities/Media";
import { mapPermissionStatus } from "./mediaPickerMappers";
import { PermissionHandler } from "../../../core/permissions/domain/PermissionHandler";

/**
 * Permission type for media operations
 */
export type PermissionType = 'camera' | 'mediaLibrary';

/**
 * Permission manager for media operations
 * Uses generic PermissionHandler to reduce code duplication
 */
export class PermissionManager {
  private static handler: PermissionHandler<MediaLibraryPermission> =
    new PermissionHandler({
      methods: {
        request: {
          camera: ImagePicker.requestCameraPermissionsAsync,
          mediaLibrary: ImagePicker.requestMediaLibraryPermissionsAsync,
        },
        get: {
          camera: ImagePicker.getCameraPermissionsAsync,
          mediaLibrary: ImagePicker.getMediaLibraryPermissionsAsync,
        },
      },
      statusMapper: mapPermissionStatus,
      defaultStatus: MediaLibraryPermission.DENIED,
    });

  /**
   * Requests camera permission
   */
  static async requestCameraPermission(): Promise<MediaLibraryPermission> {
    return this.handler.request('camera');
  }

  /**
   * Requests media library permission
   */
  static async requestMediaLibraryPermission(): Promise<MediaLibraryPermission> {
    return this.handler.request('mediaLibrary');
  }

  /**
   * Gets current camera permission status
   */
  static async getCameraPermissionStatus(): Promise<MediaLibraryPermission> {
    return this.handler.getStatus('camera');
  }

  /**
   * Gets current media library permission status
   */
  static async getMediaLibraryPermissionStatus(): Promise<MediaLibraryPermission> {
    return this.handler.getStatus('mediaLibrary');
  }

  /**
   * Generic permission request based on type
   */
  static async requestPermission(
    type: PermissionType
  ): Promise<MediaLibraryPermission> {
    return this.handler.request(type);
  }

  /**
   * Generic permission status check based on type
   */
  static async getPermissionStatus(
    type: PermissionType
  ): Promise<MediaLibraryPermission> {
    return this.handler.getStatus(type);
  }

  /**
   * Checks if permission is granted
   */
  static isPermissionGranted(status: MediaLibraryPermission): boolean {
    return this.handler.isGranted(status);
  }
}
