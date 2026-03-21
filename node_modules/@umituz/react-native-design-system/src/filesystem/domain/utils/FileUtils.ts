/**
 * File Utils
 * File utility functions for common operations
 */

import { FILE_CONSTANTS, type AllowedExtension } from '../constants/FileConstants';

/**
 * File utility functions
 */
export class FileUtils {
  /**
   * Format file size in bytes to human-readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Generate unique filename with timestamp
   */
  static generateUniqueFilename(filename: string): string {
    const timestamp = Date.now();
    const extension = filename.includes('.') ? filename.substring(filename.lastIndexOf('.')) : '';
    const nameWithoutExt = filename.includes('.')
      ? filename.substring(0, filename.lastIndexOf('.'))
      : filename;
    return `${nameWithoutExt}_${timestamp}${extension}`;
  }

  /**
   * Sanitize filename by removing invalid characters
   */
  static sanitizeFilename(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  }

  /**
   * Join path segments
   */
  static joinPaths(...segments: string[]): string {
    return segments
      .map((segment, index) => {
        if (index === 0) {
          return segment.replace(/\/+$/, '');
        }
        return segment.replace(/^\/+/, '').replace(/\/+$/, '');
      })
      .filter(segment => segment.length > 0)
      .join('/');
  }

  /**
   * Get file extension from filename
   */
  static getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    // Check dot is not at position 0 (dotfile like .gitignore) and not at end
    if (lastDot > 0 && lastDot < filename.length - 1) {
      return filename.substring(lastDot);
    }
    return '';
  }

  /**
   * Check if file extension is allowed
   */
  static isAllowedExtension(filename: string): boolean {
    const extension = this.getFileExtension(filename).toLowerCase();
    return FILE_CONSTANTS.ALLOWED_EXTENSIONS.includes(extension as AllowedExtension);
  }

  /**
   * Get filename from URI
   */
  static getFilenameFromUri(uri: string): string {
    return uri.split('/').pop() || '';
  }

  /**
   * Validate file size
   */
  static isValidFileSize(size: number): boolean {
    return size > 0 && size <= FILE_CONSTANTS.MAX_FILE_SIZE;
  }
}
