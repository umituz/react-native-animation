import React, { useState, lazy, Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient, type QueryClientFactoryOptions } from '../config/QueryClientConfig';
import { setGlobalQueryClient } from '../config/QueryClientSingleton';
import { DevMonitor } from '../monitoring/DevMonitor';

// Lazy load TanStack persistence packages
const PersistQueryClientProvider = lazy(() =>
  import('@tanstack/react-query-persist-client').then(m => ({ default: m.PersistQueryClientProvider }))
);

// Lazy load persister creation
async function loadPersister(options: any) {
  const { createAsyncStoragePersister } = await import('@tanstack/query-async-storage-persister');
  const { storageService } = await import('../../../storage');
  const { DEFAULT_GC_TIME } = await import('../../domain/constants/CacheDefaults');

  const {
    keyPrefix = 'tanstack-query',
    maxAge = DEFAULT_GC_TIME.LONG,
    busterVersion = '1',
    throttleTime = 1000,
  } = options;

  return createAsyncStoragePersister({
    storage: storageService,
    key: `${keyPrefix}-cache`,
    throttleTime,
    serialize: (data: unknown) => {
      const persistData = {
        version: busterVersion,
        timestamp: Date.now(),
        data,
      };
      return JSON.stringify(persistData);
    },
    deserialize: (cachedString: string) => {
      try {
        const parsed = JSON.parse(cachedString);
        if (parsed.version !== busterVersion) {
          if (__DEV__) {
            console.warn(
              `[TanStack Query] Cache version mismatch. Expected: ${busterVersion}, Got: ${parsed.version}`,
            );
          }
          return undefined;
        }
        const age = Date.now() - parsed.timestamp;
        if (age > maxAge) {
          if (__DEV__) {
            console.warn(`[TanStack Query] Cache age exceeded maxAge: ${maxAge}ms`);
          }
          return undefined;
        }
        return parsed.data;
      } catch (error) {
        if (__DEV__) {
          console.error('[TanStack Query] Error deserializing cache:', error);
        }
        return undefined;
      }
    },
  });
}

/**
 * Persister factory options
 */
export interface PersisterFactoryOptions {
  keyPrefix?: string;
  maxAge?: number;
  busterVersion?: string;
  throttleTime?: number;
}

/**
 * TanStack provider props
 */
export interface TanstackProviderProps {
  children: React.ReactNode;
  queryClient?: any;
  queryClientOptions?: QueryClientFactoryOptions;
  enablePersistence?: boolean;
  enableDevTools?: boolean;
  persister?: any;
  persisterOptions?: PersisterFactoryOptions;
  onPersistSuccess?: () => void;
  onPersistError?: () => void;
}

/**
 * TanStack Query provider with optional AsyncStorage persistence
 */
export function TanstackProvider({
  children,
  queryClient: providedQueryClient,
  queryClientOptions,
  enablePersistence = true,
  enableDevTools = false,
  persister: providedPersister,
  persisterOptions,
  onPersistSuccess,
  onPersistError,
}: TanstackProviderProps): React.ReactElement {
  // Create QueryClient if not provided and set as global singleton
  const [queryClient] = useState(() => {
    const client = providedQueryClient ?? createQueryClient(queryClientOptions);
    setGlobalQueryClient(client);

    if (enableDevTools && __DEV__) {
      DevMonitor.attach(client);
    }

    return client;
  });

  // Create persister if persistence is enabled and provided
  const [persister, setPersister] = useState<any>(() => {
    if (!enablePersistence) return undefined;
    return providedPersister;
  });

  // Load persister asynchronously if needed
  React.useEffect(() => {
    if (enablePersistence && !providedPersister && !persister) {
      loadPersister(persisterOptions).then(setPersister);
    }
  }, [enablePersistence, providedPersister, persister, persisterOptions]);

  // Without persistence
  if (!enablePersistence) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  // With persistence - wait for persister to load
  if (!persister) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  // With persistence - lazy load PersistQueryClientProvider
  return (
    <Suspense fallback={<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          maxAge: persisterOptions?.maxAge,
          buster: persisterOptions?.busterVersion,
        }}
        onSuccess={onPersistSuccess}
        onError={onPersistError}
      >
        {children}
      </PersistQueryClientProvider>
    </Suspense>
  );
}
