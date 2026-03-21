/**
 * Batch Operation Types
 * Shared types for batch processing operations
 */

export interface BatchOperation {
  uri: string;
  type: 'resize' | 'crop' | 'filter' | 'compress' | 'convert';
  params: Record<string, unknown>;
  options?: Record<string, unknown>;
}
