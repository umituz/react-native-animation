/**
 * Media Domain - useMedia Hook
 *
 * React hook for media picking operations (images, videos).
 * Provides camera, gallery picking functionality.
 */

import { useCallback } from "react";
import { MediaPickerService } from "../../infrastructure/services/MediaPickerService";
import { PermissionManager } from "../../infrastructure/utils/PermissionManager";
import type {
  MediaPickerOptions,
  MediaPickerResult,
  CameraOptions,
} from "../../domain/entities/Media";
import { MediaLibraryPermission } from "../../domain/entities/Media";
import { useAsyncOperation } from "../../../utils/hooks";

/**
 * useMedia hook for complete media workflow
 */
export const useMedia = () => {
  // Create async operations for each media picker function
  const pickImageOp = useAsyncOperation<MediaPickerResult, string>(
    (options?: MediaPickerOptions) => MediaPickerService.pickSingleImage(options),
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to pick image',
    }
  );

  const pickMultipleImagesOp = useAsyncOperation<MediaPickerResult, string>(
    (options?: MediaPickerOptions) => MediaPickerService.pickMultipleImages(options),
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to pick images',
    }
  );

  const pickVideoOp = useAsyncOperation<MediaPickerResult, string>(
    (options?: MediaPickerOptions) => MediaPickerService.pickVideo(options),
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to pick video',
    }
  );

  const launchCameraOp = useAsyncOperation<MediaPickerResult, string>(
    (options?: CameraOptions) => MediaPickerService.launchCamera(options),
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to launch camera',
    }
  );

  const launchCameraVideoOp = useAsyncOperation<MediaPickerResult, string>(
    (options?: CameraOptions) => MediaPickerService.launchCameraForVideo(options),
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to record video',
    }
  );

  // Wrap execute calls to handle MediaPickerResult validation
  const pickImage = useCallback(
    async (options?: MediaPickerOptions): Promise<MediaPickerResult> => {
      const result = await pickImageOp.execute(options);
      if (result?.errorMessage) {
        pickImageOp.setError(result.errorMessage);
      }
      return result ?? { canceled: true };
    },
    [pickImageOp]
  );

  const pickMultipleImages = useCallback(
    async (options?: MediaPickerOptions): Promise<MediaPickerResult> => {
      const result = await pickMultipleImagesOp.execute(options);
      if (result?.errorMessage) {
        pickMultipleImagesOp.setError(result.errorMessage);
      }
      return result ?? { canceled: true };
    },
    [pickMultipleImagesOp]
  );

  const pickVideo = useCallback(
    async (options?: MediaPickerOptions): Promise<MediaPickerResult> => {
      const result = await pickVideoOp.execute(options);
      if (result?.errorMessage) {
        pickVideoOp.setError(result.errorMessage);
      }
      return result ?? { canceled: true };
    },
    [pickVideoOp]
  );

  const launchCamera = useCallback(
    async (options?: CameraOptions): Promise<MediaPickerResult> => {
      const result = await launchCameraOp.execute(options);
      if (result?.errorMessage) {
        launchCameraOp.setError(result.errorMessage);
      }
      return result ?? { canceled: true };
    },
    [launchCameraOp]
  );

  const launchCameraForVideo = useCallback(
    async (options?: CameraOptions): Promise<MediaPickerResult> => {
      const result = await launchCameraVideoOp.execute(options);
      if (result?.errorMessage) {
        launchCameraVideoOp.setError(result.errorMessage);
      }
      return result ?? { canceled: true };
    },
    [launchCameraVideoOp]
  );

  const requestCameraPermission =
    useCallback(async (): Promise<MediaLibraryPermission> => {
      try {
        return await PermissionManager.requestCameraPermission();
      } catch (error) {
        if (__DEV__) {
          console.warn('[useMedia] Failed to request camera permission:', error);
        }
        return MediaLibraryPermission.DENIED;
      }
    }, []);

  const requestMediaLibraryPermission =
    useCallback(async (): Promise<MediaLibraryPermission> => {
      try {
        return await PermissionManager.requestMediaLibraryPermission();
      } catch (error) {
        if (__DEV__) {
          console.warn('[useMedia] Failed to request media library permission:', error);
        }
        return MediaLibraryPermission.DENIED;
      }
    }, []);

  const getCameraPermissionStatus =
    useCallback(async (): Promise<MediaLibraryPermission> => {
      try {
        return await PermissionManager.getCameraPermissionStatus();
      } catch (error) {
        if (__DEV__) {
          console.warn('[useMedia] Failed to get camera permission status:', error);
        }
        return MediaLibraryPermission.DENIED;
      }
    }, []);

  const getMediaLibraryPermissionStatus =
    useCallback(async (): Promise<MediaLibraryPermission> => {
      try {
        return await PermissionManager.getMediaLibraryPermissionStatus();
      } catch (error) {
        if (__DEV__) {
          console.warn('[useMedia] Failed to get media library permission status:', error);
        }
        return MediaLibraryPermission.DENIED;
      }
    }, []);

  return {
    pickImage,
    pickMultipleImages,
    pickVideo,
    launchCamera,
    launchCameraForVideo,
    requestCameraPermission,
    requestMediaLibraryPermission,
    getCameraPermissionStatus,
    getMediaLibraryPermissionStatus,
    isLoading: pickImageOp.isLoading || pickMultipleImagesOp.isLoading ||
               pickVideoOp.isLoading || launchCameraOp.isLoading ||
               launchCameraVideoOp.isLoading,
    error: pickImageOp.error || pickMultipleImagesOp.error ||
           pickVideoOp.error || launchCameraOp.error ||
           launchCameraVideoOp.error,
  };
};
