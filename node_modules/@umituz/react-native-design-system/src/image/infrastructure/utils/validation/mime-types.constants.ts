/**
 * MIME Type Constants
 * Single Responsibility: Define supported MIME types for validation
 */

/**
 * Supported image MIME types
 */
export const IMAGE_MIME_TYPES = {
  JPEG: 'image/jpeg',
  JPG: 'image/jpeg',
  PNG: 'image/png',
  WEBP: 'image/webp',
  GIF: 'image/gif',
} as const;

/**
 * All supported image MIME types as array
 */
export const SUPPORTED_IMAGE_MIME_TYPES = Object.values(IMAGE_MIME_TYPES);

/**
 * File extension to MIME type mapping
 */
export const EXTENSION_TO_MIME_TYPE: Record<string, string> = {
  jpg: IMAGE_MIME_TYPES.JPEG,
  jpeg: IMAGE_MIME_TYPES.JPEG,
  png: IMAGE_MIME_TYPES.PNG,
  webp: IMAGE_MIME_TYPES.WEBP,
  gif: IMAGE_MIME_TYPES.GIF,
};

/**
 * MIME type to file extension mapping
 */
export const MIME_TYPE_TO_EXTENSION: Record<string, string> = {
  [IMAGE_MIME_TYPES.JPEG]: 'jpg',
  [IMAGE_MIME_TYPES.PNG]: 'png',
  [IMAGE_MIME_TYPES.WEBP]: 'webp',
  [IMAGE_MIME_TYPES.GIF]: 'gif',
};
