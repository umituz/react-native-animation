/**
 * File Reader Service
 * Single Responsibility: Read files from device storage
 */

import { File } from "expo-file-system";
import type { FileEncoding } from "../../domain/entities/File";

/**
 * Read file as string with encoding
 */
export async function readFile(
  uri: string,
  encoding: FileEncoding = "utf8",
): Promise<string | null> {
  try {
    const file = new File(uri);
    if (encoding === "base64") {
      return await file.base64();
    }
    return await file.text();
  } catch {
    return null;
  }
}

/**
 * Read file as base64 string
 */
export async function readFileAsBase64(uri: string): Promise<string | null> {
  return readFile(uri, "base64");
}
