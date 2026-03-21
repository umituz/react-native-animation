/**
 * UUID Type Definition
 */

/**
 * UUID brand type for type safety
 * Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
export type UUID = string & { readonly __brand: unique symbol };

/**
 * UUID Version enum
 */
export enum UUIDVersion {
  NIL = 'nil',
  V1 = 'v1',
  V2 = 'v2',
  V3 = 'v3',
  V4 = 'v4',
  V5 = 'v5',
}

/**
 * UUID constants
 */
export const UUID_CONSTANTS = {
  /**
   * NIL UUID (00000000-0000-0000-0000-000000000000)
   */
  NIL: '00000000-0000-0000-0000-000000000000' as UUID,

  /**
   * UUID v4 regex pattern
   */
  PATTERN: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;
