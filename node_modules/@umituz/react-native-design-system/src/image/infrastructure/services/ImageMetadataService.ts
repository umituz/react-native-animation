/**
 * Image Infrastructure - Metadata Service
 *
 * Extracts and manages image metadata including EXIF data
 */

import type { ImageMetadataExtended } from '../../domain/entities/ImageFilterTypes';
import { ImageValidator } from '../utils/ImageValidator';
import { ImageErrorHandler, IMAGE_ERROR_CODES } from '../utils/ImageErrorHandler';
import { MetadataExtractor } from '../utils/MetadataExtractor';

export interface ImageMetadataExtractionOptions {
  includeExif?: boolean;
  includeGPS?: boolean;
  includeCamera?: boolean;
}

export class ImageMetadataService {

  static async extractMetadata(
    uri: string,
    options: ImageMetadataExtractionOptions = {}
  ): Promise<ImageMetadataExtended> {
    try {
      const uriValidation = ImageValidator.validateUri(uri);
      if (!uriValidation.isValid) {
        throw ImageErrorHandler.createError(uriValidation.error!, IMAGE_ERROR_CODES.INVALID_URI, 'extractMetadata');
      }

      const {
        includeExif = true,
        includeGPS = true,
        includeCamera = true,
      } = options;

      // Get basic image info
      const dimensions = await MetadataExtractor.getImageDimensions(uri);
      const size = await MetadataExtractor.getFileSize(uri);
      const format = MetadataExtractor.detectFormat(uri);

      // Build metadata object
      const metadata: ImageMetadataExtended = {
        format,
        size,
        dimensions,
        colorSpace: 'sRGB',
        hasAlpha: format === 'PNG' || format === 'WebP',
        orientation: 1,
      };

      // Extract EXIF data if requested
      if (includeExif) {
        const exifData = await MetadataExtractor.extractExifData(uri);
        if (exifData) {
          metadata.creationDate = exifData.DateTimeOriginal ? new Date(exifData.DateTimeOriginal) : undefined;
          metadata.modificationDate = new Date();

          if (includeCamera) {
            metadata.camera = {
              make: exifData.Make,
              model: exifData.Model,
              iso: exifData.ISO,
              flash: exifData.Flash,
              focalLength: exifData.FocalLength,
            };
          }
        }
      }

      // Extract GPS data if requested
      if (includeGPS) {
        const gps = await MetadataExtractor.extractGPSData(uri);
        metadata.gps = gps || undefined;
      }

      return metadata;
    } catch (error) {
      throw ImageErrorHandler.handleUnknownError(error, 'extractMetadata');
    }
  }

  static async getBasicInfo(uri: string): Promise<{
    format: string;
    size: number;
    dimensions: { width: number; height: number };
  }> {
    try {
      const uriValidation = ImageValidator.validateUri(uri);
      if (!uriValidation.isValid) {
        throw ImageErrorHandler.createError(uriValidation.error!, IMAGE_ERROR_CODES.INVALID_URI, 'getBasicInfo');
      }

      const dimensions = await MetadataExtractor.getImageDimensions(uri);
      const size = await MetadataExtractor.getFileSize(uri);
      const format = MetadataExtractor.detectFormat(uri);

      return {
        format,
        size,
        dimensions,
      };
    } catch (error) {
      throw ImageErrorHandler.handleUnknownError(error, 'getBasicInfo');
    }
  }

  static async hasMetadata(uri: string): Promise<boolean> {
    const exifData = await MetadataExtractor.extractExifData(uri);
    const gpsData = await MetadataExtractor.extractGPSData(uri);
    return !!(exifData || gpsData);
  }
}