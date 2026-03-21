/**
 * File Media Utilities
 * Utilities for handling media files (base64, downloads, file operations)
 */

import { base64ToTempFile } from "../../../filesystem/infrastructure/utils/blob.utils";
import { downloadFile } from "../../../filesystem/infrastructure/services/download.service";

interface FileWithType {
  readonly type: string;
}

export async function getMediaDuration(file: FileWithType): Promise<number | undefined> {
  if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
    // Stub implementation - returns a random duration for demo purposes
    // In production, this should extract actual media duration using AVFoundation or MediaMetadataRetriever
    if (__DEV__) {
      console.warn('[getMediaDuration] Using stub implementation with random duration');
    }
    return Math.floor(Math.random() * 60) + 10;
  }
  return undefined;
}

export function generateThumbnail(file: FileWithType): string | undefined {
  if (file.type.startsWith("video/")) {
    return `https://picsum.photos/200/150?random=${Date.now()}`;
  }
  return undefined;
}

/**
 * Check if a string is a base64 data URL
 */
export const isBase64DataUrl = (str: string): boolean => {
  return str.startsWith("data:image/");
};

/**
 * Check if a string is raw base64 (not a URL and not a data URL)
 */
export const isRawBase64 = (str: string): boolean => {
  return !str.startsWith("http") && !str.startsWith("data:image/") && !str.startsWith("file://");
};

/**
 * Convert raw base64 to data URL format
 */
export const toDataUrl = (str: string): string => {
  if (isBase64DataUrl(str)) return str;
  if (isRawBase64(str)) return `data:image/jpeg;base64,${str}`;
  return str;
};

/**
 * Save base64 image to file system using internal filesystem service
 */
export const saveBase64ToFile = async (base64Data: string): Promise<string> => {
  return base64ToTempFile(base64Data);
};

/**
 * Download media from URL to local file using internal filesystem service
 */
export const downloadMediaToFile = async (url: string, _isVideo: boolean): Promise<string> => {
  const result = await downloadFile(url);

  if (!result.success || !result.uri) {
    throw new Error(`Failed to download media: ${result.error ?? "Unknown error"}`);
  }

  return result.uri;
};

export interface SaveToGalleryResult {
  readonly success: boolean;
  readonly error?: string;
}

/**
 * Save image to device gallery
 */
export const saveImageToGallery = async (uri: string): Promise<SaveToGalleryResult> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const MediaLibrary = require("expo-media-library");

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return { success: false, error: "Permission denied" };
    }

    const localUri = uri.startsWith("http") ? await downloadMediaToFile(uri, false) : uri;
    await MediaLibrary.saveToLibraryAsync(localUri);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save",
    };
  }
};

/**
 * Save video to device gallery
 */
export const saveVideoToGallery = async (uri: string): Promise<SaveToGalleryResult> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const MediaLibrary = require("expo-media-library");

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return { success: false, error: "Permission denied" };
    }

    const localUri = uri.startsWith("http") ? await downloadMediaToFile(uri, true) : uri;
    await MediaLibrary.saveToLibraryAsync(localUri);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to save",
    };
  }
};
