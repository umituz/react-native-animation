/**
 * Infrastructure - Color Adjustment Filters
 *
 * Brightness, contrast, and saturation adjustments
 */

export class ColorAdjustmentFilters {
  static applyBrightness(
    data: Uint8ClampedArray,
    brightness: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const adjustment = brightness * 2.55;

    for (let i = 0; i < result.length; i += 4) {
      const r = result[i] ?? 0;
      const g = result[i + 1] ?? 0;
      const b = result[i + 2] ?? 0;
      result[i] = Math.min(255, Math.max(0, r + adjustment));
      result[i + 1] = Math.min(255, Math.max(0, g + adjustment));
      result[i + 2] = Math.min(255, Math.max(0, b + adjustment));
    }

    return result;
  }

  static applyContrast(
    data: Uint8ClampedArray,
    contrast: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const factor = (259 * (contrast * 2.55 + 255)) / (255 * (259 - contrast * 2.55));

    for (let i = 0; i < result.length; i += 4) {
      const r = result[i] ?? 0;
      const g = result[i + 1] ?? 0;
      const b = result[i + 2] ?? 0;
      
      result[i] = Math.min(255, Math.max(0, factor * (r - 128) + 128));
      result[i + 1] = Math.min(255, Math.max(0, factor * (g - 128) + 128));
      result[i + 2] = Math.min(255, Math.max(0, factor * (b - 128) + 128));
    }

    return result;
  }

  static applySaturation(
    data: Uint8ClampedArray,
    saturation: number
  ): Uint8ClampedArray {
    const result = new Uint8ClampedArray(data);
    const adjustment = 1 + (saturation / 100);

    for (let i = 0; i < result.length; i += 4) {
      const r = result[i] ?? 0;
      const g = result[i + 1] ?? 0;
      const b = result[i + 2] ?? 0;

      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      result[i] = Math.min(255, Math.max(0, gray + adjustment * (r - gray)));
      result[i + 1] = Math.min(255, Math.max(0, gray + adjustment * (g - gray)));
      result[i + 2] = Math.min(255, Math.max(0, gray + adjustment * (b - gray)));
    }

    return result;
  }
}
