/**
 * QueryClient Accessor
 * Domain layer - Global QueryClient access
 *
 * Provides access to QueryClient instance outside of React component tree.
 * Useful for services, utilities, and callbacks that need to invalidate cache.
 *
 * IMPORTANT: setGlobalQueryClient must be called before using getGlobalQueryClient.
 * This is typically done in TanstackProvider.
 */

import type { QueryClient } from '@tanstack/react-query';

let globalQueryClient: QueryClient | null = null;

/**
 * Set the global QueryClient instance.
 * Called automatically by TanstackProvider.
 */
export function setGlobalQueryClient(client: QueryClient): void {
    if (globalQueryClient && globalQueryClient !== client) {
        if (__DEV__) {
            console.warn(
                '[TanStack] QueryClient instance changed. Ensure you are not creating multiple instances.',
            );
        }
    }
    globalQueryClient = client;
}

/**
 * Get the global QueryClient instance.
 * Use this in non-React contexts (services, utilities, callbacks).
 *
 * @throws Error if QueryClient has not been set
 *
 * @example
 * ```typescript
 * import { getGlobalQueryClient, creditsQueryKeys } from '@umituz/react-native-tanstack';
 *
 * const queryClient = getGlobalQueryClient();
 * queryClient.invalidateQueries({ queryKey: creditsQueryKeys.user(userId) });
 * ```
 */
export function getGlobalQueryClient(): QueryClient {
    if (!globalQueryClient) {
        throw new Error(
            '[TanStack] QueryClient not initialized. Ensure TanstackProvider is rendered before calling getGlobalQueryClient.',
        );
    }
    return globalQueryClient;
}

/**
 * Check if global QueryClient is available.
 * Use this before calling getGlobalQueryClient to avoid throwing.
 */
export function hasGlobalQueryClient(): boolean {
    return globalQueryClient !== null;
}

/**
 * Clear the global QueryClient reference.
 * Useful for cleanup in tests.
 */
export function clearGlobalQueryClient(): void {
    globalQueryClient = null;
}
