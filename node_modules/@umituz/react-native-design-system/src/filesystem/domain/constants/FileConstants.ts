/**
 * File Constants
 * File-related constants for the filesystem package
 */

import type { FileEncoding } from '../types/FileTypes';

/**
 * File-related constants
 */
export const FILE_CONSTANTS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100 MB
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.pdf', '.txt', '.json', '.mp4', '.mp3'] as const,
  DEFAULT_ENCODING: 'utf8' as FileEncoding,
} as const;

/**
 * Allowed file extensions type
 */
export type AllowedExtension = typeof FILE_CONSTANTS.ALLOWED_EXTENSIONS[number];
