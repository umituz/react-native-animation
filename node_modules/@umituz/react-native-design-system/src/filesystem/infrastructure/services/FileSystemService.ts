/**
 * FileSystem Service - Facade
 */

import { readFile, readFileAsBase64 } from "./file-reader.service";
import { writeFile } from "./file-writer.service";
import { deleteFile, copyFile, moveFile } from "./file-manager.service";
import { createDirectory, listDirectory, getDirectoryPath, getDocumentDirectory, getCacheDirectory } from "./directory.service";
import { getFileInfo, fileExists, getFileSize } from "./file-info.service";
import { downloadFile } from "./download.service";
import { clearCache, getDirectorySize } from "./cache.service";
import { generateFilePath } from "./file-path.service";
import { FileUtils } from "../../domain/entities/File";
import type { FileOperationResult } from "../../domain/entities/File";

export class FileSystemService {
  static readFile = readFile;
  static readFileAsBase64 = readFileAsBase64;
  static writeFile = writeFile;
  static deleteFile = deleteFile;
  static copyFile = copyFile;
  static moveFile = moveFile;
  static createDirectory = createDirectory;
  static listDirectory = listDirectory;
  static getDirectoryPath = getDirectoryPath;
  static getDocumentDirectory = getDocumentDirectory;
  static getCacheDirectory = getCacheDirectory;
  static getFileInfo = getFileInfo;
  static exists = fileExists;
  static getFileSize = getFileSize;
  static downloadFile = downloadFile;
  static clearCache = clearCache;
  static getDirectorySize = getDirectorySize;
  static generateFilePath = generateFilePath;

  static async copyToCache(sourceUri: string, filename?: string): Promise<FileOperationResult> {
    const dest = FileUtils.joinPaths(getCacheDirectory(), FileUtils.generateUniqueFilename(filename || sourceUri.split("/").pop() || "file"));
    return copyFile(sourceUri, dest);
  }

  static async copyToDocuments(sourceUri: string, filename?: string): Promise<FileOperationResult> {
    const dest = FileUtils.joinPaths(getDocumentDirectory(), FileUtils.generateUniqueFilename(filename || sourceUri.split("/").pop() || "file"));
    return copyFile(sourceUri, dest);
  }
}
