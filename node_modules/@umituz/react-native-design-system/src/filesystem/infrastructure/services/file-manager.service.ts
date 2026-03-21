/**
 * File Manager Service
 * Single Responsibility: Manage file operations (delete, copy, move)
 */

import { File, Directory } from "expo-file-system";
import type { FileOperationResult } from "../../domain/entities/File";
import { ErrorHandler, ErrorCodes } from "../../../utils/errors";

/**
 * Delete file or directory
 */
export async function deleteFile(uri: string): Promise<boolean> {
  try {
    // Try as file first
    try {
      const file = new File(uri);
      if (file.exists) {
        await file.delete();
        return true;
      }
    } catch (_fileError) {
      // Not a file, try as directory
      if (__DEV__) {
        console.log('[deleteFile] Not a file, trying as directory:', uri);
      }
    }

    // Try as directory
    try {
      const dir = new Directory(uri);
      if (dir.exists) {
        await dir.delete();
        return true;
      }
    } catch (_dirError) {
      // Not a directory either
      if (__DEV__) {
        console.log('[deleteFile] Not a directory:', uri);
      }
    }

    // File/directory doesn't exist
    throw ErrorHandler.create(
      `File or directory not found: ${uri}`,
      ErrorCodes.FILE_NOT_FOUND,
      { uri }
    );
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'deleteFile',
      { uri }
    );
    throw ErrorHandler.create(
      `Failed to delete file: ${handled.message}`,
      ErrorCodes.FILE_DELETE_ERROR,
      { uri, originalError: handled }
    );
  }
}

/**
 * Copy file
 */
export async function copyFile(
  sourceUri: string,
  destinationUri: string,
): Promise<FileOperationResult> {
  try {
    const sourceFile = new File(sourceUri);
    const destination = new File(destinationUri);
    await sourceFile.copy(destination);
    return { success: true, uri: destinationUri };
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'copyFile',
      { sourceUri, destinationUri }
    );
    return {
      success: false,
      error: handled.getUserMessage(),
    };
  }
}

/**
 * Move file
 */
export async function moveFile(
  sourceUri: string,
  destinationUri: string,
): Promise<FileOperationResult> {
  try {
    const sourceFile = new File(sourceUri);
    const destination = new File(destinationUri);
    await sourceFile.move(destination);
    return { success: true, uri: destinationUri };
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'moveFile',
      { sourceUri, destinationUri }
    );
    return {
      success: false,
      error: handled.getUserMessage(),
    };
  }
}

