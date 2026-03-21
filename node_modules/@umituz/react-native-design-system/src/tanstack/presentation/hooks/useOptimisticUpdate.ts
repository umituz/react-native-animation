/**
 * useOptimisticUpdate Hook
 * Presentation layer - Optimistic update helper
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Optimistic update configuration
 */
export interface OptimisticUpdateConfig<TData, TVariables, TError = Error> {
  queryKey: readonly unknown[];
  updater: (oldData: TData | undefined, variables: TVariables) => TData;
  invalidateOnSuccess?: boolean;
  mutationFn: (variables: TVariables) => Promise<TData>;
  onError?: (error: TError, variables: TVariables, context: unknown) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: unknown) => void;
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void;
}

/**
 * Hook for mutations with optimistic updates and automatic rollback
 */
export function useOptimisticUpdate<TData = unknown, TVariables = unknown, TError = Error>(
  config: OptimisticUpdateConfig<TData, TVariables, TError>,
) {
  const queryClient = useQueryClient();
  const { queryKey, updater, invalidateOnSuccess = true, onError, onSettled, onSuccess, mutationFn } = config;

  return useMutation({
    mutationFn,
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TData>(queryKey);

      if (previousData !== undefined) {
        const optimisticData = updater(previousData, variables);
        queryClient.setQueryData(queryKey, optimisticData);

        if (__DEV__) {
          
        }
      }

      return { previousData };
    },
    onError: (error: TError, variables: TVariables, context: unknown) => {
      
      const ctx = context as { previousData?: TData } | undefined;
      if (ctx?.previousData !== undefined) {
        queryClient.setQueryData(queryKey, ctx.previousData);

        if (__DEV__) {
          
        }
      }

      if (onError) {
        onError(error, variables, context);
      }
    },
    onSuccess: (data: TData, variables: TVariables, context: unknown) => {
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, context: unknown) => {
      if (invalidateOnSuccess && !error) {
        queryClient.invalidateQueries({ queryKey });
      }

      if (onSettled) {
        onSettled(data, error, variables, context);
      }
    },
  });
}

/**
 * Hook for list mutations with optimistic updates
 */
export function useOptimisticListUpdate<TData extends unknown[], TVariables = unknown>(
  config: OptimisticUpdateConfig<TData, TVariables, Error>,
) {
  return useOptimisticUpdate<TData, TVariables, Error>(config);
}
