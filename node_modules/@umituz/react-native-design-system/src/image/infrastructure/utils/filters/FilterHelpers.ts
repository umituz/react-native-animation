/**
 * Infrastructure - Filter Helper Utilities
 *
 * Common helper functions for filter operations
 */

export class FilterHelpers {
  static applyIntensity(
    originalData: Uint8ClampedArray,
    processedData: Uint8ClampedArray,
    intensity: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(originalData.length);

    for (let i = 0; i < originalData.length; i++) {
      const original = originalData[i] ?? 0;
      const processed = processedData[i] ?? 0;
      result[i] = original * (1 - intensity) + processed * intensity;
    }

    return result;
  }
}
