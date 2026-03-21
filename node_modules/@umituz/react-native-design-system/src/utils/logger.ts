/**
 * Logger Utility
 * Production-safe logging that respects __DEV__ flag
 * Logs are suppressed in production builds to reduce bundle size and improve performance
 */

interface LoggerConfig {
  enableInProduction?: boolean;
  errorTrackingService?: (error: unknown, context?: Record<string, unknown>) => void;
}

class Logger {
  private isDev: boolean;
  private config: LoggerConfig;

  constructor(config: LoggerConfig = {}) {
    this.isDev = typeof __DEV__ !== "undefined" ? __DEV__ : false;
    this.config = config;
  }

  /**
   * Debug logging - only in development
   * Use for detailed debugging information
   */
  debug(...args: unknown[]): void {
    if (this.isDev) {
      console.log("[DEBUG]", ...args);
    }
  }

  /**
   * Info logging - only in development
   * Use for general information
   */
  info(...args: unknown[]): void {
    if (this.isDev) {
      console.info("[INFO]", ...args);
    }
  }

  /**
   * Warning logging - always shown
   * Use for recoverable issues
   */
  warn(...args: unknown[]): void {
    console.warn("[WARN]", ...args);
  }

  /**
   * Error logging - always shown
   * Use for errors and exceptions
   * In production, sends to error tracking service if configured
   */
  error(...args: unknown[]): void {
    console.error("[ERROR]", ...args);

    // Send to error tracking in production
    if (!this.isDev && this.config.errorTrackingService) {
      const error = args[0];
      const context = args.slice(1).reduce<Record<string, unknown>>((acc, arg, idx) => {
        acc[`arg${idx}`] = arg;
        return acc;
      }, {});

      this.config.errorTrackingService(error, context);
    }
  }

  /**
   * Group logging - only in development
   * Use for grouping related logs
   */
  group(label: string): void {
    if (this.isDev && console.group) {
      console.group(label);
    }
  }

  /**
   * End group logging - only in development
   */
  groupEnd(): void {
    if (this.isDev && console.groupEnd) {
      console.groupEnd();
    }
  }

  /**
   * Table logging - only in development
   * Use for displaying tabular data
   */
  table(data: unknown): void {
    if (this.isDev && console.table) {
      console.table(data);
    }
  }

  /**
   * Time measurement - only in development
   * Use for performance measurements
   */
  time(label: string): void {
    if (this.isDev) {
      const consoleWithTime = console as { time?: (label: string) => void };
      if (typeof consoleWithTime.time === 'function') {
        consoleWithTime.time(label);
      }
    }
  }

  /**
   * End time measurement - only in development
   */
  timeEnd(label: string): void {
    if (this.isDev) {
      const consoleWithTimeEnd = console as { timeEnd?: (label: string) => void };
      if (typeof consoleWithTimeEnd.timeEnd === 'function') {
        consoleWithTimeEnd.timeEnd(label);
      }
    }
  }

  /**
   * Assert logging - only in development
   * Use for assertions
   */
  assert(condition: boolean, ...args: unknown[]): void {
    if (this.isDev && (console as any).assert) {
      (console as any).assert(condition, ...args);
    }
  }

  /**
   * Configure logger
   */
  configure(config: LoggerConfig): void {
    this.config = { ...this.config, ...config };
  }
}

// Default logger instance
export const logger = new Logger();

// Export class for custom instances
export { Logger };
export type { LoggerConfig };
