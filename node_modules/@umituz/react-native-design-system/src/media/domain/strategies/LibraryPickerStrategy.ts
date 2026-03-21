/**
 * Library Picker Strategy
 *
 * Strategy for picking images/videos from device gallery.
 */

import * as ImagePicker from 'expo-image-picker';
import { PermissionManager } from '../../infrastructure/utils/PermissionManager';
import { MediaType } from '../entities/Media';
import type { PickerStrategy, LaunchOptions } from './PickerStrategy';
import type { MediaLibraryPermission } from '../entities/Media';

/**
 * Helper to map media type to ImagePicker format
 */
function mapMediaType(mediaType?: string): ImagePicker.MediaType[] {
  if (!mediaType || mediaType === MediaType.ALL) {
    return ['images', 'videos'];
  }

  if (mediaType === MediaType.VIDEO) {
    return ['videos'];
  }

  return ['images'];
}

/**
 * Library picker strategy implementation
 */
export class LibraryPickerStrategy implements PickerStrategy {
  readonly name = 'LibraryPicker';

  constructor(
    private permissionManager: typeof PermissionManager = PermissionManager
  ) {}

  async getPermission(): Promise<MediaLibraryPermission> {
    return this.permissionManager.requestMediaLibraryPermission();
  }

  async launch(options: LaunchOptions): Promise<any> {
    return ImagePicker.launchImageLibraryAsync({
      mediaTypes: mapMediaType(options.mediaTypes),
      allowsEditing: options.allowsEditing ?? false,
      allowsMultipleSelection: options.allowsMultipleSelection ?? false,
      aspect: options.aspect,
      quality: options.quality ?? 1,
      selectionLimit: options.selectionLimit ?? 1,
      base64: options.base64 ?? false,
      exif: options.exif ?? false,
    });
  }
}
