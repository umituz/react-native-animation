/**
 * LoadingProvider
 * Global loading provider with auto-detection
 */

import React, { useEffect, useReducer, useRef } from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { LoadingOverlay } from '../components/LoadingOverlay';
import type { LoadingProviderProps } from '../../domain/types/loading.types';

type LoadingAction = { type: 'SHOW' } | { type: 'HIDE' };

function loadingReducer(_state: boolean, action: LoadingAction): boolean {
  switch (action.type) {
    case 'SHOW': return true;
    case 'HIDE': return false;
  }
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  spinnerColor,
  spinnerSize = 'lg',
  overlayColor,
  defaultMessage,
  detectFetching = true,
  minDisplayTime = 300,
}) => {
  const isFetching = useIsFetching();
  const [showFetchLoading, dispatch] = useReducer(loadingReducer, false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showTimeRef = useRef<number>(0);
  // Use a ref to read showFetchLoading inside the effect without adding it to deps
  const showFetchLoadingRef = useRef(showFetchLoading);
  showFetchLoadingRef.current = showFetchLoading;

  useEffect(() => {
    if (!detectFetching) return;

    if (isFetching > 0) {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      showTimeRef.current = Date.now();
      dispatch({ type: 'SHOW' });
    } else if (showFetchLoadingRef.current) {
      const elapsed = Date.now() - showTimeRef.current;
      const remaining = Math.max(0, minDisplayTime - elapsed);

      hideTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'HIDE' });
        hideTimeoutRef.current = null;
      }, remaining);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isFetching, detectFetching, minDisplayTime]); // showFetchLoading read via ref to avoid circular dep

  return (
    <>
      {children}
      <LoadingOverlay
        visible={detectFetching && showFetchLoading}
        message={defaultMessage}
        spinnerColor={spinnerColor}
        spinnerSize={spinnerSize}
        overlayColor={overlayColor}
      />
    </>
  );
};
