/**
 * Media Utilities
 * Utility functions for media operations
 */

import { ImageFormat, MEDIA_CONSTANTS, MediaType } from "../entities/Media";

/**
 * Image MIME type mappings
 */
export const IMAGE_MIME_TYPES = {
  [ImageFormat.PNG]: "image/png",
  [ImageFormat.JPEG]: "image/jpeg",
  [ImageFormat.WEBP]: "image/webp",
} as const;

/**
 * Media utility class
 */
export class MediaUtils {
  static isImage(uri: string): boolean {
    const extension = uri.split(".").pop()?.toLowerCase();
    return MEDIA_CONSTANTS.SUPPORTED_IMAGE_FORMATS.some(
      (format) => format.replace(".", "") === extension
    );
  }

  static isVideo(uri: string): boolean {
    const extension = uri.split(".").pop()?.toLowerCase();
    return MEDIA_CONSTANTS.SUPPORTED_VIDEO_FORMATS.some(
      (format) => format.replace(".", "") === extension
    );
  }

  static getImageMimeType(format: ImageFormat): string {
    return IMAGE_MIME_TYPES[format];
  }

  static calculateAspectRatio(width: number, height: number): number {
    return width / height;
  }

  static getScaledDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = MediaUtils.calculateAspectRatio(
      originalWidth,
      originalHeight
    );

    let width = originalWidth;
    let height = originalHeight;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return {
      width: Math.round(width),
      height: Math.round(height),
    };
  }

  static isValidDimensions(width: number, height: number): boolean {
    return width > 0 && height > 0 && width <= 8192 && height <= 8192;
  }

  static parseMediaType(mimeType: string): MediaType {
    if (mimeType.startsWith("image/")) return MediaType.IMAGE;
    if (mimeType.startsWith("video/")) return MediaType.VIDEO;
    return MediaType.ALL;
  }
}
