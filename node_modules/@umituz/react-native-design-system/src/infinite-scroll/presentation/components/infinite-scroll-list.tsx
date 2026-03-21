/**
 * InfiniteScrollList Component
 *
 * Presentation component for infinite scroll list
 * Optimized with React.memo for performance
 */

import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { calculateEndReachedThreshold } from "../../domain/utils/pagination-utils";
import type { InfiniteScrollListProps } from "../../domain/interfaces/infinite-scroll-list-props";
import { Loading } from "./loading";
import { LoadingMore } from "./loading-more";
import { Empty } from "./empty";
import { Error } from "./error";

/**
 * Render error component
 */
function renderErrorComponent(
  error: string,
  retry: () => void,
  errorComponent?: (error: string, retry: () => void) => React.ReactElement,
): React.ReactElement {
  if (errorComponent) {
    return errorComponent(error, retry);
  }
  return <Error error={error} onRetry={retry} />;
}

/**
 * InfiniteScrollList Component
 *
 * FlatList wrapper with automatic infinite scroll and pagination
 *
 * @example
 * ```tsx
 * <InfiniteScrollList
 *   config={{
 *     pageSize: 20,
 *     threshold: 5,
 *     fetchData: async (page, pageSize) => {
 *       const response = await api.getItems({ page, limit: pageSize });
 *       return response.data;
 *     },
 *   }}
 *   renderItem={(item) => <ItemCard item={item} />}
 * />
 * ```
 */
function InfiniteScrollListComponent<T>({
  config,
  renderItem,
  loadingComponent,
  loadingMoreComponent,
  emptyComponent,
  errorComponent,
  ListHeaderComponent,
  ListFooterComponent,
  flatListProps,
}: InfiniteScrollListProps<T>): React.ReactElement {
  const { items, state, loadMore, refresh, canLoadMore } = useInfiniteScroll(config);

  const handleEndReached = useCallback(() => {
    if (canLoadMore && config.autoLoad !== false) {
      loadMore();
    }
  }, [canLoadMore, loadMore, config.autoLoad]);

  const getItemKey = useCallback(
    (item: T, index: number): string => {
      if (config.getItemKey) {
        return config.getItemKey(item, index);
      }
      return `item-${index}`;
    },
    [config],
  );

  // Memoize renderItem wrapper to prevent unnecessary re-renders
  const memoizedRenderItem = useCallback(
    ({ item, index }: { item: T; index: number }) => renderItem(item, index),
    [renderItem]
  );

  // Loading state
  if (state.isLoading) {
    return loadingComponent || <Loading />;
  }

  // Error state
  if (state.error) {
    return renderErrorComponent(state.error, refresh, errorComponent);
  }

  // Empty state
  if (items.length === 0 && !state.isLoading) {
    return emptyComponent || <Empty />;
  }

  // Render list
  return (
    <FlatList
      data={items}
      renderItem={memoizedRenderItem}
      keyExtractor={(item, index) => getItemKey(item, index)}
      onEndReached={handleEndReached}
      onEndReachedThreshold={calculateEndReachedThreshold(config.threshold)}
      onRefresh={refresh}
      refreshing={state.isRefreshing}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={
        <>
          {ListFooterComponent}
          {state.isLoadingMore && (loadingMoreComponent || <LoadingMore />)}
        </>
      }
      {...flatListProps}
    />
  );
}

export const InfiniteScrollList = React.memo(InfiniteScrollListComponent) as <T>(
  props: InfiniteScrollListProps<T>,
) => React.ReactElement;
