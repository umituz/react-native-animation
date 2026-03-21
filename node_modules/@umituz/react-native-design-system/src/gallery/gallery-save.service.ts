/**
 * Gallery Save Service
 * Single Responsibility: Save media to device gallery
 */

import * as MediaLibrary from "expo-media-library";
import { validateImageUri } from "../image";
import { galleryDownloadService } from "./gallery-download.service";
import type { SaveMediaResult } from "./types";

const requestMediaPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  } catch {
    return false;
  }
};

class GallerySaveService {
  async saveToGallery(
    mediaUri: string,
    prefix?: string,
  ): Promise<SaveMediaResult> {
    try {
      const validationResult = validateImageUri(mediaUri, "Media");
      if (!validationResult.isValid) {
        return {
          success: false,
          error: validationResult.error || "Invalid media file",
        };
      }

      const hasPermission = await requestMediaPermissions();
      if (!hasPermission) {
        return {
          success: false,
          error: "Media library permission denied",
        };
      }

      let localUri = mediaUri;
      const isRemote = galleryDownloadService.isRemoteUrl(mediaUri);

      if (isRemote) {
        const downloadResult = await galleryDownloadService.downloadMedia(
          mediaUri,
          prefix,
        );

        if (!downloadResult.success || !downloadResult.localUri) {
          return {
            success: false,
            error: downloadResult.error || "Download failed",
          };
        }

        localUri = downloadResult.localUri;
      }

      const asset = await MediaLibrary.createAssetAsync(localUri);

      if (isRemote && localUri) {
        await galleryDownloadService.cleanupFile(localUri);
      }

      return {
        success: true,
        fileUri: asset.uri,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Save failed",
      };
    }
  }
}

export const gallerySaveService = new GallerySaveService();
