/**
 * Directory Service
 * Single Responsibility: Manage directory operations
 */

import { Directory, Paths } from "expo-file-system";
import type { DirectoryType } from "../../domain/entities/File";
import { ErrorHandler, ErrorCodes } from "../../../utils/errors";

/**
 * Create directory
 */
export async function createDirectory(uri: string): Promise<boolean> {
  try {
    const dir = new Directory(uri);
    await dir.create({ intermediates: true, idempotent: true });
    return true;
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'createDirectory',
      { uri }
    );
    throw ErrorHandler.create(
      `Failed to create directory: ${handled.message}`,
      ErrorCodes.DIRECTORY_CREATE_ERROR,
      { uri, originalError: handled }
    );
  }
}

/**
 * List directory contents
 */
export async function listDirectory(uri: string): Promise<string[]> {
  try {
    const dir = new Directory(uri);
    const items = await dir.list();
    return items.map((item) => item.uri);
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'listDirectory',
      { uri }
    );
    throw ErrorHandler.create(
      `Failed to list directory contents: ${handled.message}`,
      ErrorCodes.FILE_READ_ERROR,
      { uri, originalError: handled }
    );
  }
}

/**
 * Get directory path by type
 */
export function getDirectoryPath(type: DirectoryType): string {
  try {
    switch (type) {
      case "documentDirectory":
        return Paths.document.uri;
      case "cacheDirectory":
        return Paths.cache.uri;
      default:
        throw ErrorHandler.create(
          `Unknown directory type: ${type}`,
          ErrorCodes.INVALID_INPUT,
          { type }
        );
    }
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'getDirectoryPath',
      { type }
    );
    throw handled;
  }
}

/**
 * Get document directory path
 */
export function getDocumentDirectory(): string {
  return getDirectoryPath("documentDirectory");
}

/**
 * Get cache directory path
 */
export function getCacheDirectory(): string {
  return getDirectoryPath("cacheDirectory");
}

