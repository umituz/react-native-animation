/**
 * Cleanup Strategy
 *
 * Strategy pattern for cache cleanup mechanisms.
 * Allows switching between interval-based and recursive timeout-based cleanup.
 */

import type { CleanupType } from './types';

/**
 * Cleanup strategy interface for cache expiration
 */
export interface CleanupStrategy {
  /**
   * Start cleanup mechanism
   * @param callback - Function to call on each cleanup cycle
   */
  start(callback: () => void): void;

  /**
   * Stop cleanup mechanism and release resources
   */
  stop(): void;

  /**
   * Strategy type identifier
   */
  readonly type: CleanupType;
}

/**
 * Interval-based cleanup strategy
 * Uses setInterval for periodic cleanup
 *
 * @example
 * ```ts
 * const strategy = new IntervalCleanupStrategy(60000); // Every minute
 * strategy.start(() => cache.cleanup());
 * ```
 */
export class IntervalCleanupStrategy implements CleanupStrategy {
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly intervalMs: number) {}

  start(callback: () => void): void {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(callback, this.intervalMs);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  get type(): 'interval' {
    return 'interval';
  }
}

/**
 * Timeout-based cleanup strategy
 * Uses recursive setTimeout for cleanup
 *
 * @example
 * ```ts
 * const strategy = new TimeoutCleanupStrategy(60000); // Every minute
 * strategy.start(() => cache.cleanup());
 * ```
 */
export class TimeoutCleanupStrategy implements CleanupStrategy {
  private timeout: ReturnType<typeof setTimeout> | null = null;
  private destroyed = false;

  constructor(private readonly timeoutMs: number) {}

  start(callback: () => void): void {
    if (this.destroyed || this.timeout) {
      return;
    }

    const reschedule = () => {
      if (this.destroyed) {
        return;
      }

      this.timeout = setTimeout(() => {
        callback();
        if (!this.destroyed) {
          reschedule();
        }
      }, this.timeoutMs);
    };

    reschedule();
  }

  stop(): void {
    this.destroyed = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  get type(): 'timeout' {
    return 'timeout';
  }
}
