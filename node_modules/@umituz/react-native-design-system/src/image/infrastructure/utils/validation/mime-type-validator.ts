/**
 * MIME Type Validator
 * Single Responsibility: Validate MIME types
 */

import type { ValidationResult } from '../../../domain/entities/ValidationResult';
import {
  SUPPORTED_IMAGE_MIME_TYPES,
  EXTENSION_TO_MIME_TYPE,
} from './mime-types.constants';

/**
 * Get file extension from URI
 */
export function getFileExtension(uri: string): string | null {
  const match = uri.match(/\.([a-z0-9]+)(?:\?|$)/i);
  return match?.[1]?.toLowerCase() ?? null;
}

/**
 * Get MIME type from file extension
 */
export function getMimeTypeFromExtension(uri: string): string | null {
  const extension = getFileExtension(uri);
  if (!extension) {
    return null;
  }
  return EXTENSION_TO_MIME_TYPE[extension] || null;
}

/**
 * Get MIME type from data URL
 */
export function getMimeTypeFromDataUrl(dataUrl: string): string | null {
  const match = dataUrl.match(/^data:([^;]+);/);
  return match?.[1] ?? null;
}

/**
 * Validate MIME type is supported image type
 */
export function validateImageMimeType(
  mimeType: string,
  fieldName: string = 'File'
): ValidationResult {
  if (!mimeType) {
    return { isValid: false, error: `${fieldName} MIME type is required` };
  }

  if (!(SUPPORTED_IMAGE_MIME_TYPES as readonly string[]).includes(mimeType)) {
    return {
      isValid: false,
      error: `${fieldName} must be an image (JPEG, PNG, WEBP, or GIF)`,
    };
  }

  return { isValid: true };
}

/**
 * Validate file extension is supported image type
 */
export function validateImageExtension(
  uri: string,
  fieldName: string = 'File'
): ValidationResult {
  const mimeType = getMimeTypeFromExtension(uri);
  if (!mimeType) {
    return {
      isValid: false,
      error: `${fieldName} must have a valid image extension (jpg, jpeg, png, webp, gif)`,
    };
  }

  return validateImageMimeType(mimeType, fieldName);
}

/**
 * Validate data URL is image type
 */
export function validateImageDataUrl(
  dataUrl: string,
  fieldName: string = 'File'
): ValidationResult {
  if (!dataUrl || !dataUrl.startsWith('data:')) {
    return {
      isValid: false,
      error: `${fieldName} must be a valid data URL`,
    };
  }

  const mimeType = getMimeTypeFromDataUrl(dataUrl);
  if (!mimeType) {
    return {
      isValid: false,
      error: `${fieldName} must have a valid MIME type`,
    };
  }

  return validateImageMimeType(mimeType, fieldName);
}
