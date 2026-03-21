/**
 * Sharing Domain - useSharing Hook
 *
 * React hook for sharing files.
 * Provides system share sheet functionality with state management.
 *
 * @domain sharing
 * @layer presentation/hooks
 */

import { useCallback, useMemo } from 'react';
import { SharingService } from '../../infrastructure/services/SharingService';
import type { ShareOptions } from '../../domain/entities/Share';
import { useAsyncOperation } from '../../../../utils/hooks';

/**
 * useSharing hook for sharing files via system share sheet
 */
export const useSharing = () => {
  // Check availability on mount
  const availabilityOp = useAsyncOperation<boolean, string>(
    () => SharingService.isAvailable(),
    {
      immediate: true,
      initialData: false,
      errorHandler: () => 'Failed to check sharing availability',
    }
  );

  // Share operations
  const shareOp = useAsyncOperation<boolean, string>(
    async (uri: string, options?: ShareOptions) => {
      const result = await SharingService.shareFile(uri, options);
      if (!result.success) {
        throw new Error(result.error || 'Failed to share file');
      }
      return true;
    },
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to share file',
    }
  );

  const shareWithAutoTypeOp = useAsyncOperation<boolean, string>(
    async (uri: string, filename: string, dialogTitle?: string) => {
      const result = await SharingService.shareWithAutoType(uri, filename, dialogTitle);
      if (!result.success) {
        throw new Error(result.error || 'Failed to share file');
      }
      return true;
    },
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to share file',
    }
  );

  const shareMultipleOp = useAsyncOperation<boolean, string>(
    async (uris: string[], options?: ShareOptions) => {
      const result = await SharingService.shareMultipleFiles(uris, options);
      if (!result.success) {
        throw new Error(result.error || 'Failed to share files');
      }
      return true;
    },
    {
      immediate: false,
      errorHandler: (err) => err instanceof Error ? err.message : 'Failed to share files',
    }
  );

  const share = useCallback(
    async (uri: string, options?: ShareOptions): Promise<boolean> => {
      const result = await shareOp.execute(uri, options);
      return result ?? false;
    },
    [shareOp]
  );

  const shareWithAutoType = useCallback(
    async (uri: string, filename: string, dialogTitle?: string): Promise<boolean> => {
      const result = await shareWithAutoTypeOp.execute(uri, filename, dialogTitle);
      return result ?? false;
    },
    [shareWithAutoTypeOp]
  );

  const shareMultiple = useCallback(
    async (uris: string[], options?: ShareOptions): Promise<boolean> => {
      const result = await shareMultipleOp.execute(uris, options);
      return result ?? false;
    },
    [shareMultipleOp]
  );

  return useMemo(() => ({
    share,
    shareWithAutoType,
    shareMultiple,
    isAvailable: availabilityOp.data ?? false,
    isSharing: shareOp.isLoading || shareWithAutoTypeOp.isLoading || shareMultipleOp.isLoading,
    error: shareOp.error || shareWithAutoTypeOp.error || shareMultipleOp.error,
  }), [
    share,
    shareWithAutoType,
    shareMultiple,
    availabilityOp.data,
    shareOp.isLoading,
    shareWithAutoTypeOp.isLoading,
    shareMultipleOp.isLoading,
    shareOp.error,
    shareWithAutoTypeOp.error,
    shareMultipleOp.error,
  ]);
};
