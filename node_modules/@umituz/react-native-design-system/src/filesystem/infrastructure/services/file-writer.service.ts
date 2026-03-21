/**
 * File Writer Service
 * Single Responsibility: Write files to device storage
 */

import { File } from "expo-file-system";
import type { FileEncoding, FileOperationResult } from "../../domain/entities/File";
import { getEncodingType, type ExpoEncodingType } from "./encoding.service";
import { ErrorHandler } from "../../../utils/errors";

/**
 * Write string to file
 */
export async function writeFile(
  uri: string,
  content: string,
  encoding: FileEncoding = "utf8",
): Promise<FileOperationResult> {
  try {
    const encodingType = getEncodingType(encoding);
    const file = new File(uri);
    await file.write(content, {
      encoding: encodingType as ExpoEncodingType,
    });
    return { success: true, uri };
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'writeFile',
      { uri, encoding, contentLength: content.length }
    );
    return {
      success: false,
      error: handled.getUserMessage(),
    };
  }
}
