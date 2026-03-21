/**
 * Time Constants
 *
 * Centralized time-related constants to replace magic numbers
 */

export const MILLISECONDS_PER_SECOND = 1000;
export const MILLISECONDS_PER_MINUTE = 60 * 1000; // 60000
export const MILLISECONDS_PER_HOUR = 60 * 60 * 1000; // 3600000
export const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000; // 86400000

export const SECONDS_PER_MINUTE = 60;
export const SECONDS_PER_HOUR = 60 * 60;
export const SECONDS_PER_DAY = 24 * 60 * 60;

export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 24 * 60;

// Common time intervals
export const ONE_SECOND_MS = MILLISECONDS_PER_SECOND;
export const FIVE_SECONDS_MS = 5 * MILLISECONDS_PER_SECOND;
export const TEN_SECONDS_MS = 10 * MILLISECONDS_PER_SECOND;
export const THIRTY_SECONDS_MS = 30 * MILLISECONDS_PER_SECOND;
export const ONE_MINUTE_MS = MILLISECONDS_PER_MINUTE;
export const FIVE_MINUTES_MS = 5 * MILLISECONDS_PER_MINUTE;
export const TEN_MINUTES_MS = 10 * MILLISECONDS_PER_MINUTE;
export const THIRTY_MINUTES_MS = 30 * MILLISECONDS_PER_MINUTE;
export const ONE_HOUR_MS = MILLISECONDS_PER_HOUR;
export const ONE_DAY_MS = MILLISECONDS_PER_DAY;

// Default timeouts
export const DEFAULT_TIMEOUT_MS = FIVE_SECONDS_MS;
export const DEFAULT_LONG_TIMEOUT_MS = THIRTY_SECONDS_MS;
export const DEFAULT_CACHE_TTL_MS = ONE_MINUTE_MS;
