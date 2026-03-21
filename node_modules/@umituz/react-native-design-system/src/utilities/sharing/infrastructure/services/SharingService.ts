/**
 * Sharing Domain - Sharing Service
 *
 * Service for sharing files using expo-sharing.
 * Provides abstraction layer for system share sheet.
 *
 * @domain sharing
 * @layer infrastructure/services
 */

import * as Sharing from 'expo-sharing';
import { FileSystemService } from '../../../../filesystem';
import type { ShareOptions, ShareResult } from '../../domain/entities/Share';
import { SharingUtils } from '../../domain/entities/SharingUtils';

/**
 * Sharing service for sharing files via system share sheet
 */
export class SharingService {
  /**
   * Check if sharing is available on device
   */
  static async isAvailable(): Promise<boolean> {
    try {
      return await Sharing.isAvailableAsync();
    } catch {
      return false;
    }
  }

  /**
   * Share a file via system share sheet
   *
   * @param uri - File URI to share (can be local or remote http/https)
   * @param options - Share options (dialog title, MIME type, UTI)
   * @returns ShareResult with success status
   *
   * USAGE:
   * ```typescript
   * // Basic share (local)
   * await SharingService.shareFile('file:///path/to/image.jpg');
   *
   * // Remote file (will be downloaded)
   * await SharingService.shareFile('https://example.com/image.jpg');
   * ```
   */
  static async shareFile(uri: string, options?: ShareOptions): Promise<ShareResult> {
    try {
      // Check availability
      const available = await SharingService.isAvailable();
      if (!available) {
        return {
          success: false,
          error: 'Sharing is not available on this device',
        };
      }

      let shareUri = uri;

      // Handle remote URLs
      if (uri.startsWith('http://') || uri.startsWith('https://')) {
        try {
          const filename = uri.split('/').pop()?.split('?')[0] || `share-${Date.now()}`;
          // Ensure we have an extension if possible, or default to bin/jpg? 
          // Better to rely on what we have, or let the caller specify mimeType to infer extension?
          // For now, nice and simple:
          const localUri = FileSystemService.generateFilePath(filename);
          const result = await FileSystemService.downloadFile(uri, localUri);

          if (!result.success) {
            return { success: false, error: result.error || 'Failed to download file' };
          }
          shareUri = result.uri!;
        } catch (downloadError) {
          return {
            success: false,
            error: downloadError instanceof Error ? downloadError.message : 'Failed to download file'
          };
        }
      }

      // Share file
      await Sharing.shareAsync(shareUri, options);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to share file',
      };
    }
  }

  /**
   * Share a file with automatic MIME type detection
   *
   * @param uri - File URI to share
   * @param filename - Filename (used for MIME type detection)
   * @param dialogTitle - Optional dialog title (Android)
   * @returns ShareResult with success status
   *
   * USAGE:
   * ```typescript
   * // Auto-detect MIME type from filename
   * await SharingService.shareWithAutoType(
   *   'file:///path/to/file.jpg',
   *   'photo.jpg',
   *   'Share Photo'
   * );
   * ```
   */
  static async shareWithAutoType(
    uri: string,
    filename: string,
    dialogTitle?: string
  ): Promise<ShareResult> {
    const options = SharingUtils.prepareShareOptions(filename, dialogTitle);
    return await SharingService.shareFile(uri, options);
  }

  /**
   * Share multiple files (if supported)
   *
   * NOTE: expo-sharing currently only supports sharing one file at a time.
   * This method shares files sequentially.
   *
   * @param uris - Array of file URIs to share
   * @param options - Share options
   * @returns ShareResult with success status
   */
  static async shareMultipleFiles(
    uris: string[],
    options?: ShareOptions
  ): Promise<ShareResult> {
    try {
      if (uris.length === 0) {
        return {
          success: false,
          error: 'No files to share',
        };
      }

      // Check availability
      const available = await SharingService.isAvailable();
      if (!available) {
        return {
          success: false,
          error: 'Sharing is not available on this device',
        };
      }

      // Share files sequentially
      for (const uri of uris) {
        await Sharing.shareAsync(uri, options);
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to share files',
      };
    }
  }
}
