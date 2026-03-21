/**
 * Loading Module
 * Global loading state management and auto-detection
 */

export type {
  LoadingSource,
  LoadingState,
  LoadingActions,
  LoadingStore,
  LoadingProviderProps,
  LoadingOverlayProps,
} from './domain/types/loading.types';

export { useLoadingStore } from './infrastructure/store/LoadingStore';
export { LoadingOverlay } from './presentation/components/LoadingOverlay';
export { useGlobalLoading } from './presentation/hooks/useGlobalLoading';
export { LoadingProvider } from './presentation/providers/LoadingProvider';
