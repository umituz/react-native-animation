/**
 * @filesystem
 */

// Domain - Types and Utilities
export type { FileEncoding, DirectoryType, FileOperationResult, FileInfo, DownloadProgress } from "./domain/entities/File";
export { FILE_CONSTANTS, FileUtils } from "./domain/entities/File";

// Services - Download Operations
export type { DownloadProgressCallback, DownloadWithProgressResult } from "./infrastructure/services/download.types";
export { downloadFile, downloadFileWithProgress, isUrlCached, getCachedFileUri, deleteCachedFile } from "./infrastructure/services/download.service";

// Services - Directory Operations
export { getCacheDirectory, getDocumentDirectory, createDirectory } from "./infrastructure/services/directory.service";

// Services - File Operations
export { FileSystemService } from "./infrastructure/services/FileSystemService";
export { fileExists, getFileInfo } from "./infrastructure/services/file-info.service";
export { deleteFile } from "./infrastructure/services/file-manager.service";
export { clearCache } from "./infrastructure/services/cache.service";

// Services - File Reading
export { readFile, readFileAsBase64 } from "./infrastructure/services/file-reader.service";

// Utils - Base64 and File Operations
export {
  extractBase64FromDataUri,
  detectMimeType,
  getExtensionFromMimeType,
  base64ToTempFile,
  deleteTempFile,
  getFileSize,
} from "./infrastructure/utils/blob.utils";
