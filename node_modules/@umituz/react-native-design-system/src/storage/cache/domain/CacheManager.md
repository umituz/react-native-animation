# Cache Manager

Centralized singleton manager for multiple named cache instances with lifecycle management.

## Overview

CacheManager provides centralized management for multiple named cache instances. Located at `src/cache/domain/CacheManager.ts`.

## Strategies

### Cache Separation
- Use separate cache instances for different data types or domains
- Create environment-specific caches (development vs production)
- Implement feature-flagged caches for experimental functionality
- Use cache hierarchy patterns (L1/L2) for performance optimization

### Lifecycle Management
- Initialize caches on first access (lazy loading)
- Implement cache warmup strategies for critical data
- Monitor cache statistics for performance optimization
- Clean up unused caches periodically

### Multi-Cache Patterns
- Use cache segmentation by data type or domain
- Implement namespaced cache organization
- Apply cache hierarchy with promotion/demotion
- Use preset configurations for different TTL ranges

## Restrictions

### Cache Creation
- DO NOT create duplicate caches with the same name
- DO NOT use generic or non-descriptive cache names
- DO NOT mix unrelated data types in the same cache
- DO NOT create caches without considering TTL requirements

### Cache Deletion
- DO NOT delete caches that might be in use
- DO NOT rely on manual cleanup without automated strategy
- DO NOT delete caches during critical operations

### Configuration
- DO NOT use extremely short TTLs (< 1 second) as they're ineffective
- DO NOT use extremely long TTLs (> 1 year) to avoid stale data
- DO NOT ignore cache size limits

## Rules

### Cache Naming
- MUST use descriptive names indicating cached data type
- MUST use consistent naming convention (kebab-case or camelCase)
- MUST include domain/business context in cache name
- MUST document cache purpose in code comments

### Cache Configuration
- MUST specify appropriate maxSize for expected data volume
- MUST set defaultTTL based on data change frequency
- MUST provide onEvict callback for monitoring in development
- MUST use preset configurations for standard TTL ranges

### Cache Access
- MUST use `getCache()` to retrieve or create cache instances
- MUST check if cache exists before operations when appropriate
- MUST call `deleteCache()` to remove unused caches
- MUST use `getCacheNames()` to monitor active caches

### Cache Lifecycle
- MUST implement warmup for frequently-accessed data
- MUST monitor cache statistics (hit rate, size) periodically
- MUST clean up unused caches in long-running applications
- MUST call `clearAll()` in test beforeEach hooks

### Testing
- MUST clear all caches in test setup
- MUST use isolated cache names in tests
- MUST delete test caches after test completion
- MUST test cache creation, retrieval, and deletion

### Error Handling
- MUST handle cache deletion failures gracefully
- MUST log cache creation with configuration
- MUST monitor cache statistics for anomalies
- MUST implement fallback for cache manager failures
