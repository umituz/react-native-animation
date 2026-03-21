/**
 * Metrics Calculator
 *
 * Calculates query performance metrics for monitoring.
 */

import type { Query } from '@tanstack/react-query';
import type { QueryMetrics, DevMonitorOptions } from '../../infrastructure/monitoring/DevMonitor.types';

/**
 * Metrics calculator for query performance
 */
export class MetricsCalculator {
  /**
   * Gets unique key string for query
   */
  static getQueryKeyString(queryKey: readonly unknown[]): string {
    return JSON.stringify(queryKey);
  }

  /**
   * Calculates fetch time for a query
   */
  static calculateFetchTime(query: Query): number {
    const now = Date.now();
    const updatedAt = query.state.dataUpdatedAt ?? now;
    const fetchTime = now - updatedAt;

    // Ensure non-negative (handles cases where dataUpdatedAt is in the future)
    return Math.max(0, fetchTime);
  }

  /**
   * Creates initial metrics for a query
   */
  static createInitialMetrics(query: Query): QueryMetrics {
    return {
      queryKey: query.queryKey,
      fetchCount: 0,
      totalFetchTime: 0,
      averageFetchTime: 0,
      slowFetchCount: 0,
      lastFetchTime: null,
    };
  }

  /**
   * Updates metrics with new fetch data
   */
  static updateMetrics(
    current: QueryMetrics,
    fetchTime: number
  ): QueryMetrics {
    const newFetchCount = current.fetchCount + 1;
    const newTotalFetchTime = current.totalFetchTime + fetchTime;

    return {
      ...current,
      fetchCount: newFetchCount,
      totalFetchTime: newTotalFetchTime,
      averageFetchTime: newTotalFetchTime / newFetchCount,
      lastFetchTime: fetchTime,
    };
  }

  /**
   * Checks if fetch time exceeds slow query threshold
   */
  static isSlowQuery(fetchTime: number, threshold: number): boolean {
    return fetchTime > threshold;
  }

  /**
   * Increments slow fetch count if query is slow
   */
  static incrementSlowCountIfNeeded(
    metrics: QueryMetrics,
    fetchTime: number,
    threshold: number
  ): QueryMetrics {
    if (this.isSlowQuery(fetchTime, threshold)) {
      return {
        ...metrics,
        slowFetchCount: metrics.slowFetchCount + 1,
      };
    }
    return metrics;
  }

  /**
   * Calculates complete metrics for a query
   */
  static calculateQueryMetrics(
    query: Query,
    currentMetrics: QueryMetrics | null,
    options: Required<DevMonitorOptions>
  ): QueryMetrics {
    const fetchTime = this.calculateFetchTime(query);
    const baseMetrics = currentMetrics ?? this.createInitialMetrics(query);
    const updatedMetrics = this.updateMetrics(baseMetrics, fetchTime);

    return this.incrementSlowCountIfNeeded(
      updatedMetrics,
      fetchTime,
      options.slowQueryThreshold
    );
  }
}
