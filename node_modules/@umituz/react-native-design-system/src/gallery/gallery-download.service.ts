/**
 * Gallery Download Service
 * Single Responsibility: Download remote media to local storage
 */

import { FileSystemService } from "../filesystem";
import { validateImageUri, getFileExtension } from "../image";
import { timezoneService } from "../timezone";
import type { DownloadMediaResult } from "./types";

const generateFilename = (uri: string, prefix: string): string => {
  const extension = getFileExtension(uri) || "jpg";
  const timestamp = timezoneService.formatDateToString(new Date());
  const randomId = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${timestamp}_${randomId}.${extension}`;
};

class GalleryDownloadService {
  async downloadMedia(
    mediaUri: string,
    prefix: string = "media",
  ): Promise<DownloadMediaResult> {
    try {
      const validationResult = validateImageUri(mediaUri, "Media");
      if (!validationResult.isValid) {
        return {
          success: false,
          error: validationResult.error || "Invalid media file",
        };
      }

      const filename = generateFilename(mediaUri, prefix);
      const documentDir = FileSystemService.getDocumentDirectory();
      const fileUri = `${documentDir}${filename}`;

      const downloadResult = await FileSystemService.downloadFile(
        mediaUri,
        fileUri,
      );

      if (!downloadResult.success || !downloadResult.uri) {
        return {
          success: false,
          error: downloadResult.error || "Download failed",
        };
      }

      return {
        success: true,
        localUri: downloadResult.uri,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Download failed",
      };
    }
  }

  isRemoteUrl(uri: string): boolean {
    return uri.startsWith("http://") || uri.startsWith("https://");
  }

  async cleanupFile(fileUri: string): Promise<void> {
    await FileSystemService.deleteFile(fileUri);
  }
}

export const galleryDownloadService = new GalleryDownloadService();
