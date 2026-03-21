/**
 * Media Collection Utilities
 * Generic utilities for working with media collections
 */

import { formatFileSize as formatFileSizeUtil } from "../../../utils/formatters/stringFormatter";

type MediaType = "image" | "audio" | "video";

/**
 * Interface for media items with type property
 */
interface MediaWithType {
  type: MediaType;
}

/**
 * Interface for media items with file size
 */
interface MediaWithSize {
  fileSize: number;
}

export function extractMediaTypes(
  media: readonly MediaWithType[]
): MediaType[] {
  const types = new Set<MediaType>();
  media.forEach((m) => types.add(m.type));
  return Array.from(types);
}

export function calculateTotalSize(
  media: readonly MediaWithSize[]
): number {
  return media.reduce((total, m) => total + m.fileSize, 0);
}

/**
 * Format file size in bytes to human-readable format
 *
 * @param bytes - File size in bytes
 * @returns Formatted file size string (e.g., "1.5 MB")
 */
export function formatFileSize(bytes: number): string {
  return formatFileSizeUtil(bytes, { decimals: 2 });
}
