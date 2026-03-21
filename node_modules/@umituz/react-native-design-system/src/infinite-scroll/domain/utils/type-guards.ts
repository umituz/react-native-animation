/**
 * Type Guard Utilities
 *
 * Runtime type checking for better type safety
 */

import type { InfiniteScrollConfig, PageBasedConfig, CursorBasedConfig } from "../types/infinite-scroll-config";

/**
 * Check if config is page-based pagination
 */
export function isPageBasedConfig<T>(
  config: InfiniteScrollConfig<T>,
): config is PageBasedConfig<T> {
  return "fetchData" in config && typeof config.fetchData === "function";
}

/**
 * Check if config is cursor-based pagination
 */
export function isCursorBasedConfig<T>(
  config: InfiniteScrollConfig<T>,
): config is CursorBasedConfig<T> {
  return "paginationMode" in config && config.paginationMode === "cursor";
}

/**
 * Check if value is a valid error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error;
}

/**
 * Check if value is a non-null object
 */
export function isNonNullObject<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if array has items
 */
export function hasItems<T>(items: T[] | null | undefined): items is T[] {
  return Array.isArray(items) && items.length > 0;
}

/**
 * Check if string is not empty
 */
export function isNonEmptyString(value: string | null | undefined): value is string {
  return typeof value === "string" && value.length > 0;
}
