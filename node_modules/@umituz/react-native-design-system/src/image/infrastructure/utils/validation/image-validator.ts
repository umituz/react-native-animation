/**
 * Image Validator
 * Single Responsibility: Validate image files and URIs
 */

import type { ValidationResult } from '../../../domain/entities/ValidationResult';
import {
  validateImageExtension,
  validateImageDataUrl,
  getMimeTypeFromExtension,
  getMimeTypeFromDataUrl,
} from './mime-type-validator';

/**
 * Check if URI is a local file path
 */
function isLocalFileUrl(uri: string): boolean {
  return uri.startsWith('file://');
}

/**
 * Check if URI is a public URL
 */
function isPublicUrl(uri: string): boolean {
  return uri.startsWith('http://') || uri.startsWith('https://');
}

/**
 * Check if URI is a data URL
 */
function isDataUrl(uri: string): boolean {
  return uri.startsWith('data:');
}

/**
 * Validate image URI (supports file://, http://, https://, and data: URLs)
 */
export function validateImageUri(
  uri: string,
  fieldName: string = 'Image'
): ValidationResult {
  if (!uri || uri.trim() === '') {
    return { isValid: false, error: `${fieldName} is required` };
  }

  // Validate public URLs (assume they're images if they have image extension)
  if (isPublicUrl(uri)) {
    return validateImageExtension(uri, fieldName);
  }

  // Validate data URLs
  if (isDataUrl(uri)) {
    return validateImageDataUrl(uri, fieldName);
  }

  // Validate local file URLs
  if (isLocalFileUrl(uri)) {
    return validateImageExtension(uri, fieldName);
  }

  // Unknown format
  return {
    isValid: false,
    error: `${fieldName} must be a valid image URL or file path`,
  };
}

/**
 * Get MIME type from URI (supports all URI types)
 */
export function getImageMimeType(uri: string): string | null {
  if (isDataUrl(uri)) {
    return getMimeTypeFromDataUrl(uri);
  }

  return getMimeTypeFromExtension(uri);
}
