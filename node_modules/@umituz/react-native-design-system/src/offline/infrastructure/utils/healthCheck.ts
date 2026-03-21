/**
 * Connection Health Check
 * Periodically checks real internet connectivity by pinging a reliable endpoint
 */

import type { OfflineConfig } from '../../types';

const DEFAULT_HEALTH_CHECK_URL = 'https://www.google.com/favicon.ico';
const DEFAULT_TIMEOUT = 5000;

export class HealthCheck {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private isChecking = false;
  private pendingCheck: Promise<boolean> | null = null;
  private config: Required<OfflineConfig>;

  constructor(config: OfflineConfig = {}) {
    this.config = {
      persist: config.persist ?? false,
      debug: config.debug ?? false,
      healthCheckInterval: config.healthCheckInterval ?? 0,
      healthCheckTimeout: config.healthCheckTimeout ?? DEFAULT_TIMEOUT,
      healthCheckUrl: config.healthCheckUrl ?? DEFAULT_HEALTH_CHECK_URL,
    };
  }

  /**
   * Perform a single health check
   */
  async check(): Promise<boolean> {
    // Return existing promise if check is in progress
    if (this.pendingCheck) {
      return this.pendingCheck;
    }

    this.pendingCheck = (async () => {
      if (this.isChecking) {
        return false;
      }

      this.isChecking = true;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.healthCheckTimeout);

        const response = await fetch(this.config.healthCheckUrl, {
          method: 'HEAD',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const isHealthy = response.ok;

        if (this.config.debug) {
        }

        return isHealthy;
      } catch (_error) {
        if (this.config.debug) {
        }

        return false;
      } finally {
        this.isChecking = false;
        this.pendingCheck = null;
      }
    })();

    return this.pendingCheck;
  }

  /**
   * Start periodic health checks
   */
  start(callback: (isHealthy: boolean) => void): void {
    if (this.config.healthCheckInterval === 0) {
      if (this.config.debug) {
      }
      return;
    }

    if (this.intervalId) {
      this.stop();
    }

    if (this.config.debug) {
    }

    this.intervalId = setInterval(async () => {
      const isHealthy = await this.check();
      callback(isHealthy);
    }, this.config.healthCheckInterval);
  }

  /**
   * Stop health checks
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;

      if (this.config.debug) {
      }
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stop();
    this.pendingCheck = null;
  }
}
