/**
 * Encoding Service
 * Single Responsibility: Handle file encoding/decoding operations
 */

import type { FileEncoding } from "../../domain/entities/File";

/**
 * Encoding type for Expo FileSystem
 */
export type ExpoEncodingType = FileEncoding;

/**
 * Convert FileEncoding to Expo FileSystem encoding type
 */
export function getEncodingType(encoding: FileEncoding): ExpoEncodingType {
  return encoding;
}

/**
 * Validate encoding type
 */
export function isValidEncoding(encoding: string): encoding is FileEncoding {
  return encoding === "utf8" || encoding === "base64";
}
