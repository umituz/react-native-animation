/**
 * UUID Generation Utility
 *
 * Provides cross-platform UUID generation.
 * Uses expo-crypto when available, falls back to Math.random-based v4 UUID.
 */

import type { UUID } from '../../types/UUID';
import { UUID_CONSTANTS } from '../../types/UUID';

// Lazy-load expo-crypto to avoid crash when native module is not available
let _cryptoModule: typeof import('expo-crypto') | null = null;

const getCryptoModule = (): typeof import('expo-crypto') | null => {
  if (_cryptoModule !== null) return _cryptoModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    _cryptoModule = require('expo-crypto') as typeof import('expo-crypto');
    return _cryptoModule;
  } catch (error) {
    if (__DEV__) {
      console.warn('[UUIDUtils] expo-crypto not available, using Math.random fallback:', error);
    }
    return null;
  }
};

const fallbackUUID = (): UUID => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  }) as UUID;
};

/**
 * Generate a v4 UUID
 * Uses expo-crypto's randomUUID() when available, otherwise Math.random fallback
 */
export const generateUUID = (): UUID => {
  const Crypto = getCryptoModule();
  if (Crypto) {
    return Crypto.randomUUID() as UUID;
  }
  return fallbackUUID();
};

/**
 * Validate UUID format
 */
export const isValidUUID = (value: string): value is UUID => {
  return UUID_CONSTANTS.PATTERN.test(value);
};

/**
 * Get version from UUID string
 */
export const getUUIDVersion = (value: string): number | null => {
  if (value === UUID_CONSTANTS.NIL) {
    return 0;
  }

  const versionChar = value.charAt(14);
  const version = parseInt(versionChar, 10);

  return (version >= 1 && version <= 5) ? version : null;
};
