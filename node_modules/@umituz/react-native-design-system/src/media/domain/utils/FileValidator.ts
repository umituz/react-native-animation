/**
 * File Validator
 *
 * File size and format validation utilities for media operations.
 */

import type { MediaAsset } from "../entities/Media";
import { MediaValidationError, MEDIA_CONSTANTS } from "../entities/Media";

/**
 * File validation options
 */
export interface FileValidationOptions {
  maxFileSizeMB?: number;
  allowedFormats?: string[];
}

/**
 * File validation result
 */
export interface FileValidationResult {
  valid: boolean;
  error?: MediaValidationError;
  errorMessage?: string;
}

/**
 * File validator for media operations
 */
export class FileValidator {
  /**
   * Validates file size against maximum limit
   *
   * @param fileSize - File size in bytes
   * @param maxSizeMB - Maximum file size in megabytes
   * @returns Validation result
   */
  static validateFileSize(
    fileSize: number,
    maxSizeMB: number = MEDIA_CONSTANTS.MAX_IMAGE_SIZE_MB
  ): FileValidationResult {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (fileSize > maxSizeBytes) {
      return {
        valid: false,
        error: MediaValidationError.FILE_TOO_LARGE,
        errorMessage: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    return { valid: true };
  }

  /**
   * Validates file format against allowed formats
   *
   * @param fileName - File name to check
   * @param allowedFormats - Array of allowed file extensions
   * @returns Validation result
   */
  static validateFileFormat(
    fileName: string,
    allowedFormats?: string[]
  ): FileValidationResult {
    const formats = allowedFormats ?? [...MEDIA_CONSTANTS.SUPPORTED_IMAGE_FORMATS];
    const fileExtension = fileName
      .substring(fileName.lastIndexOf("."))
      .toLowerCase();

    if (!formats.includes(fileExtension)) {
      return {
        valid: false,
        error: MediaValidationError.INVALID_FORMAT,
        errorMessage: `File format ${fileExtension} is not supported`,
      };
    }

    return { valid: true };
  }

  /**
   * Validates a media asset
   *
   * @param asset - Media asset to validate
   * @param options - Validation options
   * @returns Validation result
   */
  static validateAsset(
    asset: MediaAsset,
    options: FileValidationOptions = {}
  ): FileValidationResult {
    // Validate file size if present
    if (asset.fileSize !== undefined) {
      const maxSizeMB = options.maxFileSizeMB ?? MEDIA_CONSTANTS.MAX_IMAGE_SIZE_MB;
      const sizeValidation = this.validateFileSize(asset.fileSize, maxSizeMB);
      if (!sizeValidation.valid) {
        return sizeValidation;
      }
    }

    // Validate file format if file name is present
    if (asset.fileName && options.allowedFormats) {
      const formatValidation = this.validateFileFormat(
        asset.fileName,
        options.allowedFormats
      );
      if (!formatValidation.valid) {
        return formatValidation;
      }
    }

    return { valid: true };
  }

  /**
   * Validates multiple media assets
   *
   * @param assets - Array of media assets to validate
   * @param options - Validation options
   * @returns First validation error found, or { valid: true } if all pass
   */
  static validateAssets(
    assets: MediaAsset[],
    options: FileValidationOptions = {}
  ): FileValidationResult {
    for (const asset of assets) {
      const validation = this.validateAsset(asset, options);
      if (!validation.valid) {
        return validation;
      }
    }

    return { valid: true };
  }

  /**
   * Formats file size for display
   *
   * @param fileSize - File size in bytes
   * @returns Formatted file size string (e.g., "1.5 MB")
   */
  static formatFileSize(fileSize: number): string {
    const bytes = fileSize;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;

    if (megabytes >= 1) {
      return `${megabytes.toFixed(1)} MB`;
    } else if (kilobytes >= 1) {
      return `${kilobytes.toFixed(0)} KB`;
    } else {
      return `${bytes} B`;
    }
  }
}
