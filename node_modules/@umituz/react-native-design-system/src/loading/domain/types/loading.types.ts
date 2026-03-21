/**
 * Loading Types
 * Type definitions for global loading system
 */

export type LoadingSource = 'navigation' | 'fetch' | 'manual';

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  source?: LoadingSource;
  count: number;
}

export interface LoadingActions {
  show: (message?: string, source?: LoadingSource) => void;
  hide: (source?: LoadingSource) => void;
  reset: () => void;
}

export interface LoadingStore extends LoadingState, LoadingActions {}

export interface LoadingProviderProps {
  children: React.ReactNode;
  spinnerColor?: string;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
  overlayColor?: string;
  defaultMessage?: string;
  detectNavigation?: boolean;
  detectFetching?: boolean;
  minDisplayTime?: number;
}

export interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
  spinnerColor?: string;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
  overlayColor?: string;
}
