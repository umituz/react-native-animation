/**
 * Image Infrastructure - Batch Processor Utilities
 *
 * Helper functions for batch processing operations
 */

import type { ImageManipulationResult, ImageCropArea, SaveFormat } from '../../domain/entities/ImageTypes';
import type { BatchOperation } from '../types/BatchTypes';
import { ImageTransformService } from '../services/ImageTransformService';
import { ImageConversionService } from '../services/ImageConversionService';
import { ImageValidator } from './ImageValidator';
import { ImageErrorHandler, IMAGE_ERROR_CODES } from './ImageErrorHandler';

export class BatchProcessor {
  static async processBatchItem(
    operation: BatchOperation
  ): Promise<{ uri: string; result: ImageManipulationResult | null; error?: Error }> {
    try {
      const uriValidation = ImageValidator.validateUri(operation.uri);
      if (!uriValidation.isValid) {
        throw ImageErrorHandler.createError(uriValidation.error!, IMAGE_ERROR_CODES.INVALID_URI, 'batchProcess');
      }

      let result: ImageManipulationResult;

      switch (operation.type) {
        case 'resize':
          result = await ImageTransformService.resize(
            operation.uri,
            operation.params.width as number | undefined,
            operation.params.height as number | undefined,
            operation.options
          );
          break;

        case 'crop':
          result = await ImageTransformService.crop(
            operation.uri,
            operation.params as unknown as ImageCropArea,
            operation.options
          );
          break;

        case 'compress':
          result = await ImageConversionService.compress(
            operation.uri,
            operation.params.quality as number
          );
          break;

        case 'convert':
          result = await ImageConversionService.convertFormat(
            operation.uri,
            operation.params.format as SaveFormat,
            operation.params.quality as number
          );
          break;

        default:
          throw ImageErrorHandler.createError(
            `Unknown operation type: ${operation.type}`,
            IMAGE_ERROR_CODES.VALIDATION_ERROR,
            'batchProcess'
          );
      }

      return { uri: operation.uri, result };
    } catch (error) {
      return {
        uri: operation.uri,
        result: null,
        error: error instanceof Error ? error : new Error('Unknown error')
      };
    }
  }

  static async processBatchInChunks<T>(
    items: T[],
    processor: (item: T) => Promise<unknown>,
    concurrency: number,
    onProgress?: (completed: number, total: number) => void
  ): Promise<void> {
    let completed = 0;
    const total = items.length;

    for (let i = 0; i < items.length; i += concurrency) {
      const chunk = items.slice(i, i + concurrency);
      await Promise.all(chunk.map(processor));
      completed += chunk.length;
      onProgress?.(completed, total);
    }
  }
}

