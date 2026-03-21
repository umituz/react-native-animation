/**
 * Camera Picker Strategy
 *
 * Strategy for capturing images/videos using device camera.
 */

import * as ImagePicker from 'expo-image-picker';
import { PermissionManager } from '../../infrastructure/utils/PermissionManager';
import type { PickerStrategy, LaunchOptions } from './PickerStrategy';
import type { MediaLibraryPermission } from '../entities/Media';

/**
 * Camera picker strategy configuration
 */
export interface CameraPickerConfig {
  mediaType: 'images' | 'videos';
}

/**
 * Camera picker strategy implementation
 */
export class CameraPickerStrategy implements PickerStrategy {
  readonly name = 'CameraPicker';

  constructor(
    private config: CameraPickerConfig,
    private permissionManager: typeof PermissionManager = PermissionManager
  ) {}

  async getPermission(): Promise<MediaLibraryPermission> {
    return this.permissionManager.requestCameraPermission();
  }

  async launch(options: LaunchOptions): Promise<any> {
    const mediaTypes: ImagePicker.MediaTypeOptions =
      this.config.mediaType === 'videos'
        ? ImagePicker.MediaTypeOptions.Videos
        : ImagePicker.MediaTypeOptions.Images;

    const launchOptions: ImagePicker.ImagePickerOptions = {
      mediaTypes,
      allowsEditing: options.allowsEditing ?? false,
      quality: options.quality ?? 1,
      base64: options.base64 ?? false,
    };

    // Add aspect ratio for images only
    if (this.config.mediaType === 'images' && options.aspect) {
      launchOptions.aspect = options.aspect;
    }

    // Add video-specific options
    if (this.config.mediaType === 'videos') {
      if (options.videoMaxDuration !== undefined) {
        launchOptions.videoMaxDuration = options.videoMaxDuration;
      }
    }

    return ImagePicker.launchCameraAsync(launchOptions);
  }
}
