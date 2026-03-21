/**
 * Media Domain - Core Entities
 *
 * Core types and interfaces for media operations.
 * Handles images, videos, and media library interactions.
 */


/**
 * Media type enumeration
 */
export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
  ALL = "all",
}

/**
 * Image format enumeration
 */
export enum ImageFormat {
  PNG = "png",
  JPEG = "jpeg",
  WEBP = "webp",
}

/**
 * Media quality enumeration
 */
export enum MediaQuality {
  LOW = 0.3,
  MEDIUM = 0.7,
  HIGH = 1.0,
}

/**
 * Media library permissions
 */
export enum MediaLibraryPermission {
  GRANTED = "granted",
  DENIED = "denied",
  LIMITED = "limited",
}

/**
 * Image dimensions interface
 */
export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Image manipulation actions
 */
export interface ImageManipulationActions {
  resize?: ImageDimensions;
  crop?: {
    originX: number;
    originY: number;
    width: number;
    height: number;
  };
  rotate?: number;
  flip?: {
    horizontal?: boolean;
    vertical?: boolean;
  };
}

/**
 * Image save options
 */
export interface ImageSaveOptions {
  quality?: MediaQuality;
  format?: ImageFormat;
  base64?: boolean;
}

/**
 * Media picker options
 */
export interface MediaPickerOptions {
  mediaTypes?: MediaType;
  allowsEditing?: boolean;
  allowsMultipleSelection?: boolean;
  aspect?: [number, number];
  quality?: MediaQuality;
  selectionLimit?: number;
  base64?: boolean;
  maxFileSizeMB?: number;
}

/**
 * Media validation error types
 */
export enum MediaValidationError {
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FORMAT = "INVALID_FORMAT",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  PICKER_ERROR = "PICKER_ERROR",
}

/**
 * Media asset interface
 */
export interface MediaAsset {
  uri: string;
  width: number;
  height: number;
  type: MediaType;
  fileSize?: number;
  fileName?: string;
  duration?: number;
  base64?: string;
  mimeType?: string;
}

/**
 * Media picker result
 */
export interface MediaPickerResult {
  canceled: boolean;
  assets?: MediaAsset[];
  error?: MediaValidationError;
  errorMessage?: string;
}

/**
 * Camera options
 */
export interface CameraOptions {
  quality?: MediaQuality;
  allowsEditing?: boolean;
  aspect?: [number, number];
  base64?: boolean;
  videoMaxDuration?: number;
}

/**
 * Media constants
 */
export const MEDIA_CONSTANTS = {
  MAX_IMAGE_SIZE_MB: 5,
  MAX_VIDEO_SIZE_MB: 100,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
  MAX_VIDEO_SIZE: 100 * 1024 * 1024,
  DEFAULT_QUALITY: MediaQuality.HIGH,
  DEFAULT_FORMAT: ImageFormat.JPEG,
  DEFAULT_ASPECT_RATIO: [4, 3] as [number, number],
  DEFAULT_SELECTION_LIMIT: 10,
  SUPPORTED_IMAGE_FORMATS: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  SUPPORTED_VIDEO_FORMATS: [".mp4", ".mov"],
} as const;
