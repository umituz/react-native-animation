/**
 * String Utilities
 *
 * Pure utility functions for string manipulation
 * No dependencies, no side effects
 */

/**
 * Clean model name by removing special characters
 * @param model - Device model name
 * @returns Cleaned model name with only alphanumeric characters
 */
export function cleanModelName(model: string | null | undefined): string {
  if (!model) {
    return 'Device';
  }
  const cleaned = model.replace(/[^a-zA-Z0-9]/g, '');
  return cleaned || 'Device';
}

/**
 * Extract ID part from device ID
 * @param deviceId - Full device ID
 * @param length - Length of ID part to extract (default: 6)
 * @returns Last N characters of device ID in uppercase
 */
export async function extractIdPart(deviceId: string | null, length: number = 6): Promise<string> {
  if (!deviceId) {
    return await generateRandomId(length);
  }
  const start = Math.max(0, deviceId.length - length);
  return deviceId.substring(start).toUpperCase();
}

/**
 * Synchronous version of extractIdPart (uses fallback for null deviceId)
 * @param deviceId - Full device ID
 * @param length - Length of ID part to extract (default: 6)
 * @returns Last N characters of device ID in uppercase
 */
export function extractIdPartSync(deviceId: string | null, length: number = 6): string {
  if (!deviceId) {
    return generateRandomIdSync(length);
  }
  const start = Math.max(0, deviceId.length - length);
  return deviceId.substring(start).toUpperCase();
}

/**
 * Generate random alphanumeric ID using cryptographically secure random bytes
 * @param length - Length of ID to generate (default: 6)
 * @returns Random ID in uppercase
 */
export async function generateRandomId(length: number = 6): Promise<string> {
  try {
    // Use expo-crypto for cryptographically secure random bytes
    const { getRandomBytesAsync } = require('expo-crypto');
    const bytes: Uint8Array = await getRandomBytesAsync(length);

    return Array.from(bytes)
      .map(byte => byte.toString(36))
      .join('')
      .substring(0, length)
      .toUpperCase();
  } catch {
    // Fallback with __DEV__ warning for environments without expo-crypto
    if (__DEV__) {
      console.warn('[stringUtils] expo-crypto not available, using insecure fallback');
    }
    return Array.from({ length }, () =>
      Math.floor(Math.random() * 36).toString(36)
    ).join('').toUpperCase();
  }
}

/**
 * Synchronous version of generateRandomId (uses fallback)
 * @param length - Length of ID to generate (default: 6)
 * @returns Random ID in uppercase
 */
export function generateRandomIdSync(length: number = 6): string {
  if (__DEV__) {
    console.warn('[stringUtils] Using insecure fallback for random ID generation');
  }
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('').toUpperCase();
}

/**
 * Get platform prefix for device ID
 * @param platform - Platform OS
 * @returns Platform prefix string
 */
export function getPlatformPrefix(platform: string): string {
  switch (platform) {
    case 'ios':
      return 'iOS';
    case 'android':
      return 'Android';
    default:
      return 'Device';
  }
}

