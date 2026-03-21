/**
 * Device Memory Utilities
 *
 * Utility functions for device memory calculations and formatting
 */

/**
 * Device memory utilities
 */
export class DeviceMemoryUtils {
  /**
   * Convert bytes to gigabytes
   */
  static bytesToGB(bytes: number): number {
    return bytes / (1024 * 1024 * 1024);
  }

  /**
   * Convert bytes to megabytes
   */
  static bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  /**
   * Format memory size to human readable string
   */
  static formatMemorySize(bytes: number | null): string {
    if (!bytes) return 'Unknown';

    const gb = this.bytesToGB(bytes);
    if (gb >= 1) {
      return `${gb.toFixed(2)} GB`;
    }

    const mb = this.bytesToMB(bytes);
    return `${mb.toFixed(2)} MB`;
  }

  /**
   * Check if memory is sufficient for requirements
   */
  static hasSufficientMemory(
    totalMemory: number | null,
    requiredGB: number
  ): boolean {
    if (!totalMemory) return false;
    return this.bytesToGB(totalMemory) >= requiredGB;
  }

  /**
   * Get memory tier classification
   */
  static getMemoryTier(totalMemory: number | null): 'low' | 'mid' | 'high' {
    if (!totalMemory) return 'mid';

    const gb = this.bytesToGB(totalMemory);
    if (gb >= 6) return 'high';
    if (gb >= 3) return 'mid';
    return 'low';
  }
}