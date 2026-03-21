/**
 * List - Responsive List Wrapper (Molecule)
 *
 * FlatList wrapper with responsive item sizing and built-in pull-to-refresh
 * Uses design system responsive utilities
 */

import React, { useMemo } from 'react';
import { FlatList, RefreshControl, type FlatListProps, type ListRenderItem } from 'react-native';
import { useAppDesignTokens } from '../../theme';

export interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  /** Data array */
  data: readonly T[] | null | undefined;

  /** Render function for each item */
  renderItem: ListRenderItem<T>;

  /** Pull-to-refresh handler */
  onRefresh?: () => void;

  /** Refreshing state */
  refreshing?: boolean;

  /** Key extractor (required for proper list performance) */
  keyExtractor: (item: T, index: number) => string;

  /** Content container padding (uses responsive tokens) */
  contentPadding?: boolean;
}

/**
 * Responsive list component with pull-to-refresh
 *
 * @example
 * ```tsx
 * <List
 *   data={items}
 *   renderItem={({ item }) => <ItemCard item={item} />}
 *   keyExtractor={(item) => item.id}
 *   onRefresh={handleRefresh}
 *   refreshing={isRefreshing}
 *   contentPadding
 * />
 * ```
 */
export const List = <T,>({
  data,
  renderItem,
  onRefresh,
  refreshing = false,
  keyExtractor,
  contentPadding = false,
  ...rest
}: ListProps<T>) => {
  const tokens = useAppDesignTokens();

  const contentContainerStyle = useMemo(() => (
    contentPadding
      ? {
          paddingHorizontal: tokens.spacing.screenPadding,
          paddingBottom: tokens.spacing.lg,
        }
      : undefined
  ), [contentPadding, tokens.spacing.screenPadding, tokens.spacing.lg]);

  const refreshControlElement = useMemo(() => (
    onRefresh ? (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={tokens.colors.primary}
        colors={[tokens.colors.primary]}
      />
    ) : undefined
  ), [onRefresh, refreshing, tokens.colors.primary]);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={refreshControlElement}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...rest}
    />
  );
};
