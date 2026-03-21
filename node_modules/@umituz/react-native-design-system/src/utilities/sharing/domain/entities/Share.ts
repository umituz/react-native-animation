/**
 * Sharing Domain - Core Entities
 *
 * This file defines core types and interfaces for sharing functionality.
 * Handles system share sheet using expo-sharing.
 *
 * @domain sharing
 * @layer domain/entities
 */

/**
 * Share options for sharing content
 */
export interface ShareOptions {
  /**
   * Dialog title (Android only)
   */
  dialogTitle?: string;

  /**
   * MIME type of the file being shared
   */
  mimeType?: string;

  /**
   * UTI (Uniform Type Identifier) for the file (iOS only)
   */
  UTI?: string;
}

/**
 * Share result
 */
export interface ShareResult {
  success: boolean;
  error?: string;
}

/**
 * Common MIME types for sharing
 */
export const MIME_TYPES = {
  // Images
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_WEBP: 'image/webp',

  // Videos
  VIDEO_MP4: 'video/mp4',
  VIDEO_QUICKTIME: 'video/quicktime',
  VIDEO_AVI: 'video/avi',

  // Audio
  AUDIO_MP3: 'audio/mpeg',
  AUDIO_WAV: 'audio/wav',
  AUDIO_AAC: 'audio/aac',

  // Documents
  PDF: 'application/pdf',
  TEXT: 'text/plain',
  JSON: 'application/json',
  ZIP: 'application/zip',

  // Generic
  OCTET_STREAM: 'application/octet-stream',
} as const;

/**
 * iOS UTI (Uniform Type Identifiers)
 */
export const UTI_TYPES = {
  // Images
  IMAGE: 'public.image',
  JPEG: 'public.jpeg',
  PNG: 'public.png',

  // Videos
  VIDEO: 'public.video',
  MOVIE: 'public.movie',

  // Audio
  AUDIO: 'public.audio',
  MP3: 'public.mp3',

  // Documents
  PDF: 'com.adobe.pdf',
  TEXT: 'public.text',
  JSON: 'public.json',

  // Generic
  DATA: 'public.data',
  CONTENT: 'public.content',
} as const;

/**
 * Sharing constants
 */
export const SHARING_CONSTANTS = {
  DEFAULT_DIALOG_TITLE: 'Share',
  DEFAULT_MIME_TYPE: MIME_TYPES.OCTET_STREAM,
} as const;


