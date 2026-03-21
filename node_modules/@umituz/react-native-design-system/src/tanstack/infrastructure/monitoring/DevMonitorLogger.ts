/**
 * DevMonitor Logger
 * Helper for logging performance reports
 */

import type { QueryMetrics, CacheStats } from './DevMonitor.types';

export class DevMonitorLogger {
  static logInit(): void {
    if (__DEV__) {
    }
  }

  static logSlowQuery(queryKeyString: string, fetchTime: number): void {
    if (__DEV__) {
      console.warn(
        `[TanStack DevMonitor] Slow query detected: ${queryKeyString} (${fetchTime}ms)`,
      );
    }
  }

  static logAttached(): void {
    if (__DEV__) {
    }
  }

  static logMethodsCleared(): void {
    if (__DEV__) {
    }
  }

  static logReset(): void {
    if (__DEV__) {
    }
  }

  static logReport(stats: CacheStats | null, slowQueries: QueryMetrics[]): void {
    if (__DEV__) {
      console.group('[TanStack DevMonitor] Performance Report');

      if (stats) {
        console.table({
          'Total Queries': stats.totalQueries,
          'Active Queries': stats.activeQueries,
          'Cached Queries': stats.cachedQueries,
          'Stale Queries': stats.staleQueries,
          'Inactive Queries': stats.inactiveQueries,
        });
      }

      if (slowQueries.length > 0) {
        console.table(
          slowQueries.map((m) => ({
            queryKey: JSON.stringify(m.queryKey),
            fetchCount: m.fetchCount,
            avgTime: `${m.averageFetchTime.toFixed(2)}ms`,
            slowCount: m.slowFetchCount,
          })),
        );
      }

      console.groupEnd();
    }
  }
}
