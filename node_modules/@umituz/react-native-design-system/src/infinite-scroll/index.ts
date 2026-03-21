/**
 * React Native Infinite Scroll
 *
 * Modern infinite scroll system for React Native
 * Follows SOLID, DRY, KISS principles
 *
 * Features:
 * - Page-based and cursor-based pagination
 * - Automatic retry with exponential backoff
 * - Request cancellation with AbortController
 * - Performance monitoring in __DEV__ mode
 * - Full accessibility support
 * - Type-safe utilities
 */

// Domain Layer
export type {
  InfiniteScrollConfig,
  PaginatedResult,
  PageBasedConfig,
  CursorBasedConfig,
} from "./domain/types/infinite-scroll-config";
export type { InfiniteScrollState } from "./domain/types/infinite-scroll-state";
export type { UseInfiniteScrollReturn } from "./domain/types/infinite-scroll-return";
export type { InfiniteScrollListProps } from "./domain/interfaces/infinite-scroll-list-props";

// Domain Utils
export {
  calculateEndReachedThreshold,
  getPageSlice,
  hasMoreItems,
} from "./domain/utils/pagination-utils";

// Type Guards
export {
  isPageBasedConfig,
  isCursorBasedConfig,
  isError,
  isNonNullObject,
  hasItems,
  isNonEmptyString,
} from "./domain/utils/type-guards";

// Presentation Layer - Hooks
export { useInfiniteScroll } from "./presentation/hooks/useInfiniteScroll";

// Presentation Layer - Components
export { InfiniteScrollList } from "./presentation/components/infinite-scroll-list";

// Component Types
export type {
  EmptyProps,
  ErrorProps,
  LoadingProps,
  LoadingMoreProps,
} from "./presentation/components/types";

// State Components
export { Loading } from "./presentation/components/loading";
export { LoadingMore } from "./presentation/components/loading-more";
export { Empty } from "./presentation/components/empty";
export { Error } from "./presentation/components/error";
