/**
 * Sharing Domain - Barrel Export
 * Provides system share sheet functionality using expo-sharing.
 */

// ============================================================================
// DOMAIN LAYER - ENTITIES
// ============================================================================

export type {
  ShareOptions,
  ShareResult,
} from './domain/entities/Share';

export {
  MIME_TYPES,
  UTI_TYPES,
  SHARING_CONSTANTS,
} from './domain/entities/Share';

export { SharingUtils } from './domain/entities/SharingUtils';

// ============================================================================
// INFRASTRUCTURE LAYER - SERVICES
// ============================================================================

export { SharingService } from './infrastructure/services/SharingService';

// ============================================================================
// PRESENTATION LAYER - HOOKS
// ============================================================================

export { useSharing } from './presentation/hooks/useSharing';
