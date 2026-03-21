/**
 * Core Repositories Module
 *
 * Common utilities and types for repository implementations.
 * TanStack and Storage repositories remain separate but share these utilities.
 */

export { createRepositoryKeyFactory } from './domain/RepositoryKeyFactory';
export type { QueryKeyFactory } from './domain/types';

export {
  mergeRepositoryOptions,
  getCacheOptions,
  normalizeListParams,
  createRepositoryLogger,
} from './domain/RepositoryUtils';

export type {
  RepositoryOptions,
  ListParams,
  CreateParams,
  UpdateParams,
} from './domain/types';
