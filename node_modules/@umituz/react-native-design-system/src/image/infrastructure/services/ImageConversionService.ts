/**
 * Image Infrastructure - Conversion Service
 *
 * Handles format conversion, compression, and thumbnail generation
 * Lazy loads expo-image-manipulator to reduce bundle size
 */

import type {
    ImageSaveOptions,
    ImageManipulationResult,
    SaveFormat,
} from '../../domain/entities/ImageTypes';
import { IMAGE_CONSTANTS } from '../../domain/entities/ImageConstants';
import { ImageTransformService } from './ImageTransformService';
import { ImageValidator } from '../utils/ImageValidator';
import { ImageErrorHandler } from '../utils/ImageErrorHandler';
import { ImageTransformUtils } from '../utils/ImageTransformUtils';

// Cached module to avoid repeated imports
let ImageManipulatorModule: typeof import('expo-image-manipulator') | null = null;

async function getImageManipulator() {
    if (!ImageManipulatorModule) {
        ImageManipulatorModule = await import('expo-image-manipulator');
    }
    return ImageManipulatorModule;
}

export class ImageConversionService {
    static async compress(
        uri: string,
        quality: number = IMAGE_CONSTANTS.defaultQuality
    ): Promise<ImageManipulationResult> {
        try {
            ImageValidator.validateUri(uri);
            ImageValidator.validateQuality(quality);

            const ImageManipulator = await getImageManipulator();
            return await ImageManipulator.manipulateAsync(
                uri,
                [],
                { compress: quality }
            );
        } catch (error) {
            throw ImageErrorHandler.handleUnknownError(error, 'compress');
        }
    }

    static async convertFormat(
        uri: string,
        format: SaveFormat,
        quality?: number
    ): Promise<ImageManipulationResult> {
        try {
            ImageValidator.validateUri(uri);
            const compressQuality = quality ?? IMAGE_CONSTANTS.defaultQuality;
            const ImageManipulator = await getImageManipulator();

            return await ImageManipulator.manipulateAsync(
                uri,
                [],
                {
                    compress: compressQuality,
                    format: ImageTransformUtils.mapFormat(format),
                }
            );
        } catch (error) {
            throw ImageErrorHandler.handleUnknownError(error, 'convertFormat');
        }
    }

    static async createThumbnail(
        uri: string,
        size: number = IMAGE_CONSTANTS.thumbnailSize,
        options?: ImageSaveOptions
    ): Promise<ImageManipulationResult> {
        try {
            ImageValidator.validateUri(uri);
            return await ImageTransformService.resizeToFit(uri, size, size, {
                ...options,
                compress: options?.compress ?? IMAGE_CONSTANTS.compressQuality.medium,
            });
        } catch (error) {
            throw ImageErrorHandler.handleUnknownError(error, 'createThumbnail');
        }
    }
}
