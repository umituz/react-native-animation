/**
 * DevMonitor
 * Infrastructure layer - Query performance monitoring (DEV only)
 *
 * Tracks query performance, cache hit rates, and slow queries.
 * Only active in development mode (__DEV__).
 */

import type { Query, QueryClient } from '@tanstack/react-query';
import type { QueryMetrics, CacheStats, DevMonitorOptions } from './DevMonitor.types';
import { DevMonitorLogger } from './DevMonitorLogger';
import { MetricsCalculator } from '../../domain/utils/MetricsCalculator';

class DevMonitorClass {
  private metrics: Map<string, QueryMetrics> = new Map();
  private queryClient: QueryClient | null = null;
  private options: Required<DevMonitorOptions>;
  private statsInterval: ReturnType<typeof setInterval> | null = null;
  private cacheSubscription: (() => void) | null = null;
  private isEnabled: boolean;
  private maxMetrics: number = 1000; // Prevent unbounded growth

  constructor(options: DevMonitorOptions = {}) {
    this.isEnabled = __DEV__ ?? false;
    this.options = {
      slowQueryThreshold: options.slowQueryThreshold ?? 1000,
      enableLogging: options.enableLogging ?? false,
      statsLogInterval: options.statsLogInterval ?? 30000,
    };

    if (this.isEnabled) {
      this.init();
    }
  }

  private init(): void {
    if (!this.isEnabled) return;
    if (this.options.enableLogging) {
      DevMonitorLogger.logInit();
    }
    this.startStatsLogging();
  }

  private trackQuery(query: Query): void {
    if (!this.isEnabled) return;

    const queryKeyString = MetricsCalculator.getQueryKeyString(query.queryKey);
    const currentMetrics = this.metrics.get(queryKeyString) ?? null;
    const updatedMetrics = MetricsCalculator.calculateQueryMetrics(
      query,
      currentMetrics,
      this.options
    );

    this.metrics.set(queryKeyString, updatedMetrics);

    // Prevent unbounded growth - remove oldest metric if limit exceeded
    if (this.metrics.size > this.maxMetrics) {
      const oldestKey = this.metrics.keys().next().value;
      if (oldestKey) {
        this.metrics.delete(oldestKey);
      }
    }

    if (this.options.enableLogging && updatedMetrics.slowFetchCount > 0) {
      const fetchTime = MetricsCalculator.calculateFetchTime(query);
      if (MetricsCalculator.isSlowQuery(fetchTime, this.options.slowQueryThreshold)) {
        DevMonitorLogger.logSlowQuery(queryKeyString, fetchTime);
      }
    }
  }

  /**
   * Attach monitor to query client
   */
  attach(queryClient: QueryClient): void {
    if (!this.isEnabled) return;

    // Detach from previous client if attached
    if (this.cacheSubscription) {
      this.detach();
    }

    this.queryClient = queryClient;
    this.cacheSubscription = queryClient.getQueryCache().subscribe((event) => {
      if (event.query) {
        this.trackQuery(event.query as Query);
      }
    });

    if (this.options.enableLogging) {
      DevMonitorLogger.logAttached();
    }
  }

  /**
   * Detach monitor from query client
   */
  detach(): void {
    if (!this.isEnabled) return;

    if (this.cacheSubscription) {
      this.cacheSubscription();
      this.cacheSubscription = null;
    }

    this.stopStatsLogging();
    this.metrics.clear();
    this.queryClient = null;
  }

  /**
   * Get all query metrics
   */
  getMetrics(): QueryMetrics[] {
    if (!this.isEnabled) return [];
    return Array.from(this.metrics.values());
  }

  /**
   * Get metrics for specific query
   */
  getQueryMetrics(queryKey: readonly unknown[]): QueryMetrics | undefined {
    if (!this.isEnabled) return undefined;
    const queryKeyString = MetricsCalculator.getQueryKeyString(queryKey);
    return this.metrics.get(queryKeyString);
  }

  /**
   * Get slow queries
   */
  getSlowQueries(): QueryMetrics[] {
    if (!this.isEnabled) return [];
    return Array.from(this.metrics.values()).filter((m) => m.slowFetchCount > 0);
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): CacheStats | null {
    if (!this.isEnabled || !this.queryClient) return null;

    const cache = this.queryClient.getQueryCache();
    const queries = cache.getAll();

    return {
      totalQueries: queries.length,
      activeQueries: queries.filter((q: Query) => q.observers.length > 0).length,
      cachedQueries: queries.filter((q: Query) => q.state.data !== undefined).length,
      staleQueries: queries.filter((q: Query) => q.isStale()).length,
      inactiveQueries: queries.filter((q: Query) => q.observers.length === 0).length,
    };
  }

  /**
   * Log performance report
   */
  logReport(): void {
    if (!this.isEnabled || !this.options.enableLogging) return;
    DevMonitorLogger.logReport(this.getCacheStats(), this.getSlowQueries());
  }

  /**
   * Start periodic stats logging
   */
  private startStatsLogging(): void {
    if (!this.isEnabled || this.statsInterval !== null) return;
    this.statsInterval = setInterval(() => {
      this.logReport();
    }, this.options.statsLogInterval);
  }

  /**
   * Stop periodic stats logging
   */
  stopStatsLogging(): void {
    if (this.statsInterval !== null) {
      clearInterval(this.statsInterval);
      this.statsInterval = null;
    }
  }

  /**
   * Clear all metrics
   */
  clear(): void {
    if (!this.isEnabled) return;
    this.metrics.clear();
    this.stopStatsLogging();
    if (this.options.enableLogging) {
      DevMonitorLogger.logMethodsCleared();
    }
  }

  /**
   * Reset monitor
   */
  reset(): void {
    if (!this.isEnabled) return;
    this.detach();
    if (this.options.enableLogging) {
      DevMonitorLogger.logReset();
    }
  }
}

/**
 * Global dev monitor instance
 */
export const DevMonitor = new DevMonitorClass();
