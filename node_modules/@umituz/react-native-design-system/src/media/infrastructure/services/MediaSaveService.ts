/**
 * Media Save Service
 * Saves media to device storage using expo-file-system
 */

import * as FileSystem from "expo-file-system";
import { MediaLibraryPermission } from "../../domain/entities/Media";
import { ErrorHandler } from "../../../utils/errors";

export interface SaveResult {
  success: boolean;
  path?: string;
  error?: string;
}

export interface SaveOptions {
  album?: string;
}

/**
 * Service for saving media to gallery
 */
export class MediaSaveService {
  /**
   * Request media library write permission
   */
  static async requestPermission(): Promise<MediaLibraryPermission> {
    return MediaLibraryPermission.GRANTED;
  }

  /**
   * Get current permission status
   */
  static async getPermissionStatus(): Promise<MediaLibraryPermission> {
    return MediaLibraryPermission.GRANTED;
  }

  /**
   * Save image to gallery
   */
  static async saveImage(
    uri: string,
    options?: SaveOptions,
  ): Promise<SaveResult> {
    return MediaSaveService.saveToStorage(uri, "image", options);
  }

  /**
   * Save video to gallery
   */
  static async saveVideo(
    uri: string,
    options?: SaveOptions,
  ): Promise<SaveResult> {
    return MediaSaveService.saveToStorage(uri, "video", options);
  }

  /**
   * Save media (image or video) to storage
   */
  private static async saveToStorage(
    uri: string,
    mediaType: "image" | "video",
    _options?: SaveOptions,
  ): Promise<SaveResult> {
    try {
      const timestamp = Date.now();
      const extension = mediaType === "image" ? "jpg" : "mp4";
      const filename = `${mediaType}_${timestamp}.${extension}`;

      const directory = (FileSystem as { documentDirectory?: string | null }).documentDirectory;
      if (!directory) {
        return {
          success: false,
          error: "Document directory not available",
        };
      }

      const destination = `${directory}${filename}`;

      await FileSystem.copyAsync({
        from: uri,
        to: destination,
      });

      return {
        success: true,
        path: destination,
      };
    } catch (error) {
      const handled = ErrorHandler.handleAndLog(
        error,
        'saveToStorage',
        { uri, mediaType }
      );
      return {
        success: false,
        error: `Failed to save media: ${handled.getUserMessage()}`,
      };
    }
  }
}
