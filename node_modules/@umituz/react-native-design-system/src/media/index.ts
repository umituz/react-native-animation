/**
 * @umituz/react-native-media - Public API
 *
 * Media picking capabilities for React Native apps
 *
 * Usage:
 *   import {
 *     useMedia,
 *     MediaPickerService,
 *     type MediaAsset,
 *     type MediaPickerResult,
 *   } from '@umituz/react-native-media';
 */

// Domain Layer - Original Media Entities
export {
  MediaType,
  ImageFormat as MediaImageFormat,
  MediaQuality,
  MediaLibraryPermission,
  MediaValidationError,
  MEDIA_CONSTANTS,
} from "./domain/entities/Media";

export { IMAGE_MIME_TYPES as MEDIA_IMAGE_MIME_TYPES, MediaUtils } from "./domain/utils/MediaUtils";

export type {
  MediaAsset,
  MediaPickerResult,
  MediaPickerOptions,
  CameraOptions,
  ImageDimensions as MediaImageDimensions,
  ImageManipulationActions,
  ImageSaveOptions as MediaImageSaveOptions,
} from "./domain/entities/Media";

// Infrastructure Layer - Original Media Services
export { MediaPickerService } from "./infrastructure/services/MediaPickerService";
export { MediaSaveService } from "./infrastructure/services/MediaSaveService";
export type { SaveResult, SaveOptions } from "./infrastructure/services/MediaSaveService";

// Presentation Layer - Original Media Hooks
export { useMedia } from "./presentation/hooks/useMedia";

// URL Media Detection
export {
  getMediaTypeFromUrl,
  isVideoUrl,
  isImageUrl,
  isAudioUrl,
  type UrlMediaType,
} from "./infrastructure/utils/url-media-detector";

// MIME Type Detection
export {
  getMediaTypeFromMime,
  isVideoMime,
  isImageMime,
  isAudioMime,
  type MimeMediaType,
} from "./infrastructure/utils/mime-type-detector";

// Media URL Extraction
export {
  extractMediaUrl,
  extractVideoUrl,
  extractImageUrl,
  type MediaUrlResult,
} from "./infrastructure/utils/media-url-extractor";

// Media Collection Utilities
export {
  extractMediaTypes,
  calculateTotalSize,
  formatFileSize,
} from "./infrastructure/utils/media-collection-utils";

// File Media Utilities
export {
  getMediaDuration,
  generateThumbnail,
  isBase64DataUrl,
  isRawBase64,
  toDataUrl,
  saveBase64ToFile,
  downloadMediaToFile,
  saveImageToGallery,
  saveVideoToGallery,
  type SaveToGalleryResult,
} from "./infrastructure/utils/file-media-utils";
