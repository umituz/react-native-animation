import type { LabelProcessorProps } from "../types";

export class LabelProcessor {
  private static labelCache = new Map<string, string>();
  private static maxCacheSize = 50;
  private static cacheHits = 0;
  private static cacheMisses = 0;

  static processLabel(props: LabelProcessorProps): string {
    const { label, getLabel } = props;
    
    // Create stable cache key
    const getLabelKey = getLabel ? getLabel.toString().slice(0, 20) : 'none';
    const cacheKey = `${String(label)}-${getLabelKey}`;
    
    // Check cache first
    if (this.labelCache.has(cacheKey)) {
      this.cacheHits++;
      return this.labelCache.get(cacheKey)!;
    }
    
    this.cacheMisses++;
    let result: string;
    
    if (!getLabel) {
      result = label;
    } else {
      try {
        const processedLabel = getLabel(label);
        result = typeof processedLabel === "string" ? processedLabel : label;
      } catch {
        result = label;
      }
    }
    
    // Cache management with LRU eviction
    if (this.labelCache.size >= this.maxCacheSize) {
      const firstKey = this.labelCache.keys().next().value;
      if (firstKey) {
        this.labelCache.delete(firstKey);
      }
    }
    this.labelCache.set(cacheKey, result);
    
    return result;
  }

  static clearCache(): void {
    this.labelCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  static processTitle(title: string | undefined, getLabel?: (label: string) => string): string | undefined {
    if (title === undefined || typeof title !== "string") {
      return undefined;
    }
    
    return getLabel ? getLabel(title) : title;
  }
}