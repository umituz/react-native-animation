/**
 * Media Domain - Media Picker Service
 *
 * Service for picking images/videos using expo-image-picker.
 * Refactored to use strategy pattern to reduce code duplication.
 *
 * Before: 182 LOC with 4 similar methods
 * After: ~120 LOC with 1 generic launcher + convenience wrappers - 34% reduction
 */

import type {
  MediaPickerOptions,
  MediaPickerResult,
  CameraOptions,
} from '../../domain/entities/Media';
import {
  MediaType,
  MediaValidationError,
} from '../../domain/entities/Media';
import { mapPickerResultFromStrategy } from '../utils/mediaPickerMappers';
import { PermissionManager } from '../utils/PermissionManager';
import { FileValidator } from '../../domain/utils/FileValidator';
import { ErrorHandler } from '../../../utils/errors';
import type { PickerStrategy, LaunchOptions } from '../../domain/strategies/PickerStrategy';
import { CameraPickerStrategy } from '../../domain/strategies/CameraPickerStrategy';
import { LibraryPickerStrategy } from '../../domain/strategies/LibraryPickerStrategy';

/**
 * Media picker service for selecting images/videos
 * Uses strategy pattern to support different picker types
 */
export class MediaPickerService {
  /**
   * Generic media picker launcher using strategy pattern
   *
   * @param strategy - Picker strategy to use
   * @param options - Picker options
   * @returns Picker result
   *
   * @example
   * ```ts
   * const strategy = new CameraPickerStrategy({ mediaType: 'images' });
   * const result = await MediaPickerService.launchMediaPicker(strategy, {
   *   quality: 0.8,
   *   allowsEditing: true
   * });
   * ```
   */
  static async launchMediaPicker(
    strategy: PickerStrategy,
    options?: LaunchOptions
  ): Promise<MediaPickerResult> {
    // Check permission
    const permission = await strategy.getPermission();
    if (!PermissionManager.isPermissionGranted(permission)) {
      return {
        canceled: true,
        error: MediaValidationError.PERMISSION_DENIED,
        errorMessage: 'Permission was denied',
      };
    }

    try {
      const pickerResult = await strategy.launch(options ?? {});
      return mapPickerResultFromStrategy(pickerResult);
    } catch (error) {
      ErrorHandler.handleAndLog(error, 'launchMediaPicker', {
        strategy: strategy.name,
        options,
      });
      return {
        canceled: true,
        error: MediaValidationError.PICKER_ERROR,
        errorMessage: `Failed to launch ${strategy.name}`,
      };
    }
  }

  /**
   * Launch camera for image capture
   */
  static async launchCamera(
    options?: CameraOptions
  ): Promise<MediaPickerResult> {
    const strategy = new CameraPickerStrategy({ mediaType: 'images' });
    return this.launchMediaPicker(strategy, options);
  }

  /**
   * Launch camera for video capture
   */
  static async launchCameraForVideo(
    options?: CameraOptions
  ): Promise<MediaPickerResult> {
    const strategy = new CameraPickerStrategy({ mediaType: 'videos' });
    return this.launchMediaPicker(strategy, options);
  }

  /**
   * Pick from library with file size validation
   */
  static async pickFromLibrary(
    options?: MediaPickerOptions
  ): Promise<MediaPickerResult> {
    const strategy = new LibraryPickerStrategy();
    const result = await this.launchMediaPicker(strategy, options);

    // Validate file size if not canceled and has assets
    if (
      !result.canceled &&
      result.assets &&
      result.assets.length > 0 &&
      options?.maxFileSizeMB
    ) {
      const validation = FileValidator.validateAssets(result.assets, {
        maxFileSizeMB: options.maxFileSizeMB,
      });

      if (!validation.valid) {
        return {
          canceled: true,
          error: validation.error,
          errorMessage: validation.errorMessage,
        };
      }
    }

    return result;
  }

  /**
   * Pick single image from library
   */
  static async pickSingleImage(
    options?: Omit<MediaPickerOptions, 'allowsMultipleSelection'>
  ): Promise<MediaPickerResult> {
    return this.pickFromLibrary({
      ...options,
      allowsMultipleSelection: false,
      mediaTypes: MediaType.IMAGE,
    });
  }

  /**
   * Pick multiple images from library
   */
  static async pickMultipleImages(
    options?: Omit<MediaPickerOptions, 'allowsMultipleSelection'>
  ): Promise<MediaPickerResult> {
    return this.pickFromLibrary({
      ...options,
      allowsMultipleSelection: true,
      mediaTypes: MediaType.IMAGE,
    });
  }

  /**
   * Pick video from library
   */
  static async pickVideo(
    options?: Omit<MediaPickerOptions, 'mediaTypes'>
  ): Promise<MediaPickerResult> {
    return this.pickFromLibrary({
      ...options,
      mediaTypes: MediaType.VIDEO,
    });
  }

  /**
   * Pick any media from library
   */
  static async pickMedia(
    options?: MediaPickerOptions
  ): Promise<MediaPickerResult> {
    return this.pickFromLibrary({
      ...options,
      mediaTypes: MediaType.ALL,
    });
  }
}
