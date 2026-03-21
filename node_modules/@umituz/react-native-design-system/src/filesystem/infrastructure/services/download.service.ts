/**
 * Download Service
 */

import { File, Paths, Directory } from "expo-file-system";
import type { FileOperationResult } from "../../domain/entities/File";
import { FileUtils } from "../../domain/entities/File";
import { SUPPORTED_DOWNLOAD_EXTENSIONS, DEFAULT_DOWNLOAD_EXTENSION } from "./download.constants";
import type { DownloadProgressCallback, DownloadWithProgressResult } from "./download.types";
import { ErrorHandler, ErrorCodes } from "../../../utils/errors";
import { retryWithBackoff, isNetworkError } from "../../../utils/async";

const hashUrl = (url: string) => {
  let hash = 0;
  for (let i = 0; i < url.length; i++) hash = ((hash << 5) - hash + url.charCodeAt(i)) | 0;
  return Math.abs(hash).toString(36);
};

const getExt = (url: string) => {
  const parts = url.split("?")[0]?.split(".") || [];
  const ext = parts.length > 1 ? parts.pop()?.toLowerCase() || DEFAULT_DOWNLOAD_EXTENSION : DEFAULT_DOWNLOAD_EXTENSION;
  return (SUPPORTED_DOWNLOAD_EXTENSIONS as readonly string[]).includes(ext) ? ext : DEFAULT_DOWNLOAD_EXTENSION;
};

const getCacheUri = (url: string, dir: string) => FileUtils.joinPaths(dir, `cached_${hashUrl(url)}.${getExt(url)}`);

export async function downloadFile(url: string, dest?: string): Promise<FileOperationResult> {
  try {
    const destination = dest ? new File(dest) : new File(Paths.document, FileUtils.generateUniqueFilename("download"));

    // Retry download with exponential backoff
    const res = await retryWithBackoff(
      () => File.downloadFileAsync(url, destination, { idempotent: true }),
      {
        maxRetries: 3,
        baseDelay: 1000,
        shouldRetry: (error) => isNetworkError(error as Error),
      }
    );

    return { success: true, uri: res.uri };
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'downloadFile',
      { url, dest }
    );
    return {
      success: false,
      error: handled.getUserMessage(),
    };
  }
}

export async function downloadFileWithProgress(
  url: string,
  cacheDir: string,
  onProgress?: DownloadProgressCallback,
  signal?: AbortSignal
): Promise<DownloadWithProgressResult> {
  try {
    const dir = new Directory(cacheDir);
    if (!dir.exists) await dir.create({ intermediates: true, idempotent: true });

    const destUri = getCacheUri(url, cacheDir);
    if (new File(destUri).exists) return { success: true, uri: destUri, fromCache: true };

    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw ErrorHandler.create(
        `HTTP ${response.status}: ${response.statusText}`,
        ErrorCodes.NETWORK_ERROR,
        { url, status: response.status }
      );
    }

    const totalBytes = parseInt(response.headers.get("content-length") || "0", 10);
    const body = (response as unknown as { body?: { getReader(): ReadableStreamDefaultReader<Uint8Array> } }).body;
    if (!body || typeof body.getReader !== "function") {
      return { ...(await downloadFile(url, destUri)), fromCache: false };
    }

    const reader = body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    try {
      while (true) {
        if (signal?.aborted) {
          await reader.cancel();
          throw ErrorHandler.create(
            'Download aborted by user',
            ErrorCodes.NETWORK_ERROR,
            { url }
          );
        }

        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        onProgress?.({ totalBytesWritten: received, totalBytesExpectedToWrite: totalBytes || received });
      }

      const all = new Uint8Array(received);
      let pos = 0;
      for (const c of chunks) { all.set(c, pos); pos += c.length; }
      await new File(destUri).write(all);

      return { success: true, uri: destUri, fromCache: false };
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    const handled = ErrorHandler.handleAndLog(
      error,
      'downloadFileWithProgress',
      { url, cacheDir }
    );
    return {
      success: false,
      error: handled.getUserMessage(),
    };
  }
}

export const isUrlCached = (url: string, dir: string) => new File(getCacheUri(url, dir)).exists;
export const getCachedFileUri = (url: string, dir: string) => isUrlCached(url, dir) ? getCacheUri(url, dir) : null;
export const deleteCachedFile = async (url: string, dir: string): Promise<boolean> => {
  try {
    const f = new File(getCacheUri(url, dir));
    if (f.exists) await f.delete();
    return true;
  } catch (error) {
    ErrorHandler.handleAndLog(
      error,
      'deleteCachedFile',
      { url, dir }
    );
    return false;
  }
};
