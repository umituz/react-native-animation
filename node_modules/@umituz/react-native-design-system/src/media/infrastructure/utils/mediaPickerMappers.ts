/**
 * Media Picker Mapper Utilities
 * Mapping functions for media picker operations
 */

import * as ImagePicker from "expo-image-picker";
import {
  MediaLibraryPermission,
  MediaType,
  type MediaAsset,
  type MediaPickerResult,
} from "../../domain/entities/Media";

/**
 * Map expo-image-picker permission status to MediaLibraryPermission
 */
export const mapPermissionStatus = (
  status: string
): MediaLibraryPermission => {
  switch (status) {
    case 'granted':
      return MediaLibraryPermission.GRANTED;
    case 'denied':
    case 'undetermined':
    default:
      return MediaLibraryPermission.DENIED;
  }
};

/**
 * Map MediaType to expo-image-picker media types
 */
export const mapMediaType = (
  type?: MediaType
): ImagePicker.MediaType[] => {
  switch (type) {
    case MediaType.IMAGE:
      return ["images"];
    case MediaType.VIDEO:
      return ["videos"];
    case MediaType.ALL:
      return ["images", "videos"];
    default:
      return ["images"];
  }
};

/**
 * Map expo-image-picker result to MediaPickerResult
 */
export const mapPickerResult = (
  result: ImagePicker.ImagePickerResult
): MediaPickerResult => {
  if (result.canceled) {
    return { canceled: true };
  }

  const assets: MediaAsset[] = (result.assets ?? []).map((asset: ImagePicker.ImagePickerAsset) => ({
    uri: asset.uri,
    width: asset.width,
    height: asset.height,
    type: asset.type === "video" ? MediaType.VIDEO : MediaType.IMAGE,
    fileSize: asset.fileSize,
    fileName: asset.fileName ?? undefined,
    duration: asset.duration ?? undefined,
    base64: asset.base64 ?? undefined,
    mimeType: asset.mimeType ?? undefined,
  }));

  return {
    canceled: false,
    assets,
  };
};

/**
 * Map PickerStrategy result to MediaPickerResult
 */
export const mapPickerResultFromStrategy = (
  result: { canceled: boolean; assets?: Array<{ uri: string; width?: number; height?: number; type?: 'image' | 'video'; duration?: number; fileSize?: number }> }
): MediaPickerResult => {
  if (result.canceled) {
    return { canceled: true };
  }

  const assets: MediaAsset[] = (result.assets ?? []).map((asset) => ({
    uri: asset.uri,
    width: asset.width ?? 0,
    height: asset.height ?? 0,
    type: asset.type === 'video' ? MediaType.VIDEO : MediaType.IMAGE,
    fileSize: asset.fileSize,
    duration: asset.duration,
  }));

  return {
    canceled: false,
    assets,
  };
};
