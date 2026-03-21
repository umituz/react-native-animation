/**
 * Network Provider
 *
 * Initializes network connectivity listener at app startup.
 * Wrap your app with this provider to enable offline detection.
 *
 * @example
 * ```tsx
 * import { NetworkProvider } from '@umituz/react-native-offline';
 *
 * const App = () => (
 *   <NetworkProvider>
 *     <YourApp />
 *   </NetworkProvider>
 * );
 * ```
 */

import React, { ReactNode, memo } from 'react';
import { useOffline } from '../hooks/useOffline';

interface NetworkProviderProps {
  children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = memo(({ children }) => {
  // Initialize NetInfo listener - updates Zustand store
  useOffline();

  return <>{children}</>;
});

NetworkProvider.displayName = 'NetworkProvider';
