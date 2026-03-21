/**
 * Image Infrastructure - Metadata Extractor Utilities
 *
 * Helper functions for extracting metadata from images.
 * NOTE: These methods require a native image library (e.g. expo-image-manipulator,
 * expo-file-system) to be implemented. They throw until a real implementation is provided.
 */

import { ImageErrorHandler, IMAGE_ERROR_CODES } from './ImageErrorHandler';

export interface ExifData {
  DateTimeOriginal?: string;
  Make?: string;
  Model?: string;
  ISO?: number;
  FocalLength?: number;
  Flash?: boolean;
  ExposureTime?: string;
  FNumber?: number;
}

export class MetadataExtractor {

  static async getImageDimensions(_uri: string): Promise<{ width: number; height: number }> {
    throw ImageErrorHandler.createError(
      'getImageDimensions is not implemented. Provide a native image library.',
      IMAGE_ERROR_CODES.MANIPULATION_FAILED,
      'getDimensions'
    );
  }

  static async getFileSize(_uri: string): Promise<number> {
    throw ImageErrorHandler.createError(
      'getFileSize is not implemented. Provide a native file system library.',
      IMAGE_ERROR_CODES.MANIPULATION_FAILED,
      'getFileSize'
    );
  }

  static async extractExifData(_uri: string): Promise<ExifData | null> {
    throw ImageErrorHandler.createError(
      'extractExifData is not implemented. Provide a native EXIF reader library.',
      IMAGE_ERROR_CODES.MANIPULATION_FAILED,
      'extractExifData'
    );
  }

  static async extractGPSData(_uri: string): Promise<{ latitude: number; longitude: number } | null> {
    throw ImageErrorHandler.createError(
      'extractGPSData is not implemented. Provide a native EXIF reader library.',
      IMAGE_ERROR_CODES.MANIPULATION_FAILED,
      'extractGPSData'
    );
  }

  static detectFormat(uri: string): string {
    const extension = uri.toLowerCase().split('.').pop();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'JPEG';
      case 'png':
        return 'PNG';
      case 'webp':
        return 'WebP';
      case 'gif':
        return 'GIF';
      default:
        return 'Unknown';
    }
  }
}
