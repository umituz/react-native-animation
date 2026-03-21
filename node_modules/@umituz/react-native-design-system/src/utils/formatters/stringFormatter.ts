/**
 * String Formatter Utility
 * String, phone, file size, and duration formatting functions
 */

/**
 * File size formatting options
 */
export interface FileSizeFormatOptions {
  decimals?: number;
  locale?: string;
}

/**
 * Formats a file size in bytes to human-readable format
 *
 * @param bytes - File size in bytes
 * @param options - Formatting options
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number, options: FileSizeFormatOptions = {}): string {
  const { decimals = 1, locale = 'en-US' } = options;

  if (bytes === 0) return '0 Bytes';
  if (bytes < 0) {
    if (__DEV__) {
      console.warn(`[formatFileSize] File size cannot be negative (received: ${bytes}), treating as 0`);
    }
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']; // Added EB for safety
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1 // Prevent array out of bounds
  );

  return `${formatNumber(bytes / Math.pow(k, i), { decimals, locale })} ${sizes[i]}`;
}

/**
 * Duration formatting options
 */
export interface DurationFormatOptions {
  format?: 'short' | 'long' | 'digital';
}

/**
 * Formats a duration in seconds to human-readable format
 *
 * @param seconds - Duration in seconds
 * @param options - Formatting options
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number, options: DurationFormatOptions = {}): string {
  const { format = 'long' } = options;

  if (isNaN(seconds) || seconds < 0) {
    return '0:00';
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (format === 'digital') {
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(format === 'short' ? `${hours}h` : `${hours} hour${hours > 1 ? 's' : ''}`);
  }

  if (minutes > 0) {
    parts.push(format === 'short' ? `${minutes}m` : `${minutes} minute${minutes > 1 ? 's' : ''}`);
  }

  if (secs > 0 || parts.length === 0) {
    parts.push(format === 'short' ? `${secs}s` : `${secs} second${secs > 1 ? 's' : ''}`);
  }

  return format === 'short' ? parts.join('') : parts.join(', ');
}

/**
 * Phone number formatting options
 */
export interface PhoneFormatOptions {
  format?: 'national' | 'international' | 'e164';
  countryCode?: string;
}

/**
 * Formats a phone number
 *
 * @param phone - Phone number string (digits only)
 * @param options - Formatting options
 * @returns Formatted phone number string
 */
export function formatPhone(phone: string, options: PhoneFormatOptions = {}): string {
  const { format = 'national', countryCode = 'US' } = options;

  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 0) {
    return '';
  }

  // E164 format: +country_code number
  if (format === 'e164') {
    return `+${cleaned}`;
  }

  // US format
  if (countryCode === 'US' && cleaned.length === 10) {
    if (format === 'national') {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return `+1 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  // Default: just return cleaned with spaces
  return cleaned;
}

/**
 * Truncates text to a maximum length with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number, suffix: string = '...'): string {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }

  // Ensure we don't end up with negative slice length
  if (maxLength <= suffix.length) {
    return suffix.slice(0, maxLength);
  }

  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Capitalizes the first letter of a string
 *
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Converts a string to title case
 *
 * @param text - Text to convert
 * @returns Title case text
 */
export function toTitleCase(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Converts a string to slug format
 *
 * @param text - Text to convert
 * @returns Slug string
 */
export function toSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Formats a number (used by formatFileSize)
 */
function formatNumber(num: number, options: { decimals: number; locale: string }): string {
  return new Intl.NumberFormat(options.locale, {
    minimumFractionDigits: options.decimals,
    maximumFractionDigits: options.decimals,
  }).format(num);
}
