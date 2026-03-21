/**
 * Image Infrastructure - Batch Processing Service
 *
 * Handles processing multiple images concurrently with progress tracking
 */

import type { ImageManipulationResult } from '../../domain/entities/ImageTypes';
import type { BatchOperation } from '../types/BatchTypes';
import { BatchProcessor } from '../utils/BatchProcessor';

export interface BatchProcessingOptions {
  concurrency?: number;
  onProgress?: (completed: number, total: number, currentUri?: string) => void;
  onError?: (error: Error, uri: string) => void;
}

export interface BatchProcessingResult {
  successful: Array<{
    uri: string;
    result: ImageManipulationResult;
  }>;
  failed: Array<{
    uri: string;
    error: Error;
  }>;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
}

export class ImageBatchService {
  static async processBatch(
    operations: BatchOperation[],
    options: BatchProcessingOptions = {}
  ): Promise<BatchProcessingResult> {
    const concurrency = options.concurrency || 3;
    const successful: Array<{ uri: string; result: ImageManipulationResult }> = [];
    const failed: Array<{ uri: string; error: Error }> = [];

    let completed = 0;
    const total = operations.length;

    // Process operations in chunks based on concurrency
    for (let i = 0; i < operations.length; i += concurrency) {
      const chunk = operations.slice(i, i + concurrency);

      const chunkResults = await Promise.all(
        chunk.map(operation => BatchProcessor.processBatchItem(operation))
      );

      // Process results
      for (const result of chunkResults) {
        completed++;

        options.onProgress?.(completed, total, result.uri);

        if (result.error) {
          failed.push({ uri: result.uri, error: result.error });
          options.onError?.(result.error, result.uri);
        } else if (result.result) {
          successful.push({ uri: result.uri, result: result.result });
        }
      }
    }

    return {
      successful,
      failed,
      totalProcessed: total,
      successCount: successful.length,
      failureCount: failed.length,
    };
  }

  static async resizeBatch(
    uris: string[],
    width?: number,
    height?: number,
    options: BatchProcessingOptions & { saveOptions?: Record<string, unknown> } = {}
  ): Promise<BatchProcessingResult> {
    const operations: BatchOperation[] = uris.map(uri => ({
      uri,
      type: 'resize' as const,
      params: { width, height },
      options: options.saveOptions,
    }));

    return this.processBatch(operations, options);
  }

  static async compressBatch(
    uris: string[],
    quality = 0.8,
    options: BatchProcessingOptions = {}
  ): Promise<BatchProcessingResult> {
    const operations: BatchOperation[] = uris.map(uri => ({
      uri,
      type: 'compress' as const,
      params: { quality },
    }));

    return this.processBatch(operations, options);
  }
}