/**
 * Array Utilities
 * Safe array operations for onboarding components
 */

/**
 * Ensures the value is a valid array, returns empty array if not
 */
export const ensureArray = <T>(value: T[] | undefined | null): T[] => {
  return Array.isArray(value) ? value : [];
};

/**
 * Safe includes check that handles undefined/null values
 */
export const safeIncludes = <T>(array: T[] | undefined | null, item: T): boolean => {
  return ensureArray(array).includes(item);
};

/**
 * Safe filter that handles undefined/null values
 */
export const safeFilter = <T>(
  array: T[] | undefined | null,
  predicate: (item: T) => boolean,
): T[] => {
  return ensureArray(array).filter(predicate);
};
