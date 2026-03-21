/**
 * Sharing Utilities
 * Helper functions for sharing functionality
 */

import { MIME_TYPES, UTI_TYPES, SHARING_CONSTANTS, ShareOptions } from './Share';

export class SharingUtils {
  /**
   * Get MIME type from file extension
   */
  static getMimeTypeFromExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      // Images
      case 'jpg':
      case 'jpeg':
        return MIME_TYPES.IMAGE_JPEG;
      case 'png':
        return MIME_TYPES.IMAGE_PNG;
      case 'gif':
        return MIME_TYPES.IMAGE_GIF;
      case 'webp':
        return MIME_TYPES.IMAGE_WEBP;

      // Videos
      case 'mp4':
        return MIME_TYPES.VIDEO_MP4;
      case 'mov':
        return MIME_TYPES.VIDEO_QUICKTIME;
      case 'avi':
        return MIME_TYPES.VIDEO_AVI;

      // Audio
      case 'mp3':
        return MIME_TYPES.AUDIO_MP3;
      case 'wav':
        return MIME_TYPES.AUDIO_WAV;
      case 'aac':
        return MIME_TYPES.AUDIO_AAC;

      // Documents
      case 'pdf':
        return MIME_TYPES.PDF;
      case 'txt':
        return MIME_TYPES.TEXT;
      case 'json':
        return MIME_TYPES.JSON;
      case 'zip':
        return MIME_TYPES.ZIP;

      default:
        return MIME_TYPES.OCTET_STREAM;
    }
  }

  /**
   * Get UTI from file extension (iOS)
   */
  static getUTIFromExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      // Images
      case 'jpg':
      case 'jpeg':
        return UTI_TYPES.JPEG;
      case 'png':
        return UTI_TYPES.PNG;
      case 'gif':
      case 'webp':
        return UTI_TYPES.IMAGE;

      // Videos
      case 'mp4':
      case 'mov':
      case 'avi':
        return UTI_TYPES.VIDEO;

      // Audio
      case 'mp3':
        return UTI_TYPES.MP3;
      case 'wav':
      case 'aac':
        return UTI_TYPES.AUDIO;

      // Documents
      case 'pdf':
        return UTI_TYPES.PDF;
      case 'txt':
        return UTI_TYPES.TEXT;
      case 'json':
        return UTI_TYPES.JSON;

      default:
        return UTI_TYPES.DATA;
    }
  }

  /**
   * Prepare share options from filename
   */
  static prepareShareOptions(filename: string, dialogTitle?: string): ShareOptions {
    return {
      dialogTitle: dialogTitle || SHARING_CONSTANTS.DEFAULT_DIALOG_TITLE,
      mimeType: SharingUtils.getMimeTypeFromExtension(filename),
      UTI: SharingUtils.getUTIFromExtension(filename),
    };
  }
}
