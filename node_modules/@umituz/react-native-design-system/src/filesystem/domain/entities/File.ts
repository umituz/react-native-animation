/**
 * File Entity - Module Index
 * Domain layer exports for file operations
 */

// Types
export type {
  FileEncoding,
  DirectoryType,
  FileOperationResult,
  FileInfo,
  DownloadProgress,
} from '../types/FileTypes';

// Constants
export { FILE_CONSTANTS } from '../constants/FileConstants';
export type { AllowedExtension } from '../constants/FileConstants';

// Utils
export { FileUtils } from '../utils/FileUtils';
