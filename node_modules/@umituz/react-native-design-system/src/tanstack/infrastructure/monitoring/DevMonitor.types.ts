/**
 * DevMonitor Types
 */

export interface QueryMetrics {
  queryKey: readonly unknown[];
  fetchCount: number;
  totalFetchTime: number;
  averageFetchTime: number;
  slowFetchCount: number;
  lastFetchTime: number | null;
}

export interface CacheStats {
  totalQueries: number;
  activeQueries: number;
  cachedQueries: number;
  staleQueries: number;
  inactiveQueries: number;
}

export interface DevMonitorOptions {
  /**
   * Threshold for slow query detection (in ms)
   * @default 1000
   */
  slowQueryThreshold?: number;

  /**
   * Enable console logging
   * @default true
   */
  enableLogging?: boolean;

  /**
   * Log interval for stats (in ms)
   * @default 30000 (30 seconds)
   */
  statsLogInterval?: number;
}
