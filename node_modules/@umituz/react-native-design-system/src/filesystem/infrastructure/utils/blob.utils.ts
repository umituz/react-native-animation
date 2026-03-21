/**
 * Blob Utils
 * Base64 and file utility functions for React Native
 */

import { File, Paths } from "expo-file-system";

declare function atob(data: string): string;

/**
 * Extract raw base64 from data URI
 */
export function extractBase64FromDataUri(dataUri: string): string {
  if (!dataUri.startsWith("data:")) {
    return dataUri;
  }
  const parts = dataUri.split(",");
  return parts.length > 1 ? parts[1]! : dataUri;
}

/**
 * Detect MIME type from data URI or base64
 */
export function detectMimeType(base64: string): string {
  if (base64.includes("data:image/png")) return "image/png";
  if (base64.includes("data:image/webp")) return "image/webp";
  if (base64.includes("data:image/gif")) return "image/gif";
  return "image/jpeg";
}

/**
 * Get file extension from MIME type
 */
export function getExtensionFromMimeType(mimeType: string): string {
  const ext = mimeType.split("/")[1] ?? "jpg";
  if (ext === "jpeg") return "jpg";
  return ext;
}

/**
 * Convert base64 string to Uint8Array
 * Required for binary file writing in new expo-file-system API
 */
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Write base64 to a temp file and return the file URI
 * This is React Native compatible (no Blob/ArrayBuffer needed)
 */
export async function base64ToTempFile(
  base64: string,
  filename?: string,
): Promise<string> {
  const mimeType = detectMimeType(base64);
  const extension = getExtensionFromMimeType(mimeType);
  const cleanBase64 = extractBase64FromDataUri(base64);
  const name = filename ?? `temp_${Date.now()}.${extension}`;

  const file = new File(Paths.cache, name);
  await file.create();

  // Convert base64 to Uint8Array for binary writing
  const binaryData = base64ToUint8Array(cleanBase64);
  file.write(binaryData);

  return file.uri;
}

/**
 * Delete a temp file
 */
export async function deleteTempFile(uri: string): Promise<void> {
  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch {
    // Ignore deletion errors
  }
}

/**
 * Get file size from URI
 */
export function getFileSize(uri: string): number {
  try {
    const file = new File(uri);
    return file.exists ? (file.size ?? 0) : 0;
  } catch {
    return 0;
  }
}
