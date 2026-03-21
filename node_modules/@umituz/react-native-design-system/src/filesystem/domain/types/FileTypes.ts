/**
 * File Types
 * Domain layer type definitions for file operations
 */

/**
 * File encoding types supported by expo-file-system
 */
export type FileEncoding = 'utf8' | 'base64';

/**
 * Directory types available in expo-file-system
 */
export type DirectoryType = 'documentDirectory' | 'cacheDirectory';

/**
 * Result of a file operation
 */
export interface FileOperationResult {
  success: boolean;
  uri?: string;
  error?: string;
}

/**
 * File information metadata
 */
export interface FileInfo {
  uri: string;
  name?: string;
  size: number;
  exists: boolean;
  isDirectory: boolean;
  modificationTime?: number;
}

/**
 * Download progress information
 */
export interface DownloadProgress {
  totalBytesWritten: number;
  totalBytesExpectedToWrite: number;
}
