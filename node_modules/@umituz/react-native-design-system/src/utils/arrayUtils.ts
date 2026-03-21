/**
 * Array Utilities
 * Common array manipulation helpers
 */

/**
 * Creates an array of specified length and maps over it
 * Alternative to Array.from({ length }).map() which is more verbose
 *
 * @param length - Length of array to create
 * @param mapFn - Map function (receives index)
 * @returns Mapped array
 *
 * @example
 * createMappedArray(5, (i) => i * 2) // [0, 2, 4, 6, 8]
 */
export function createMappedArray<T>(
  length: number,
  mapFn: (index: number) => T
): T[] {
  return Array.from({ length }, (_, index) => mapFn(index));
}

/**
 * Safely slice array to specified length
 * Returns empty array if input is null/undefined
 */
export function safeSlice<T>(array: T[] | undefined, start: number, end?: number): T[] {
  if (!array) return [];
  return array.slice(start, end);
}

/**
 * Filter array by ID
 * Returns new array with item matching ID removed
 */
export function filterById<T extends { id: string }>(array: T[], idToRemove: string): T[] {
  return array.filter(item => item.id !== idToRemove);
}

/**
 * Find item in array by ID
 */
export function findById<T extends { id: string }>(array: T[], id: string): T | undefined {
  return array.find(item => item.id === id);
}
