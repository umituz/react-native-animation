# Cache Module

High-performance in-memory cache system with TTL and multiple eviction strategies.

## Overview

The cache module provides a comprehensive in-memory caching solution with TTL (Time To Live), LRU, LFU, and FIFO eviction strategies. Located at `src/cache/`.

## Architecture

```
cache/
├── domain/              # Business logic and entities
│   ├── Cache.ts        # Main Cache class
│   ├── CacheManager.ts # Singleton cache manager
│   ├── CacheStatsTracker.ts
│   ├── PatternMatcher.ts
│   ├── ErrorHandler.ts
│   ├── strategies/     # Eviction strategies
│   └── types/          # TypeScript types
├── infrastructure/     # Infrastructure implementation
│   └── TTLCache.ts
└── presentation/       # React integration
    ├── useCache.ts
    └── useCachedValue.ts
```

## Strategies

### Cache Organization
- Use CacheManager for multiple named caches
- Create separate caches for different data types
- Use environment-specific configurations
- Implement cache hierarchy for performance

### Eviction Strategy Selection
- Use LRU for frequently accessed recent data
- Use LFU for popularity-based caching
- Use FIFO for simple queue-based caching
- Use TTL for time-based expiration

### React Integration
- Use useCache hook for manual cache management
- Use useCachedValue for automatic value caching
- Share cache instances across components
- Implement cleanup on component unmount

### Performance Optimization
- Monitor cache hit rates and adjust sizes
- Use appropriate TTL based on data change frequency
- Implement cache warmup for critical data
- Use pattern-based invalidation for bulk operations

## Restrictions

### Cache Creation
- DO NOT create unlimited cache sizes without max limit
- DO NOT use zero or negative TTL values
- DO NOT mix unrelated data types in same cache
- DO NOT create caches without considering eviction strategy

### Memory Management
- DO NOT cache large objects (> 100KB) without size limits
- DO NOT cache frequently changing data with long TTL
- DO NOT ignore memory warnings from cache statistics
- DO NOT let caches grow unbounded

### Pattern Usage
- DO NOT use broad patterns (e.g., `*`) for invalidation
- DO NOT mix different separators in cache keys
- DO NOT create ambiguous key structures
- DO NOT use patterns without documenting structure

### React Integration
- DO NOT create new cache instances on every render
- DO NOT use cache hooks without proper cleanup
- DO NOT share cache state between unrelated components
- DO NOT ignore loading and error states

## Rules

### Cache Configuration
- MUST specify maxSize for all caches
- MUST set defaultTTL based on data characteristics
- MUST provide onEvict callback in development
- MUST document cache purpose and data type

### Cache Operations
- MUST use get() for retrieving values
- MUST use set() for storing values with optional TTL
- MUST use has() to check key existence
- MUST use delete() to remove specific keys
- MUST use clear() to remove all entries

### Cache Keys
- MUST use consistent key structure (e.g., `entity:id:attribute`)
- MUST use descriptive key names
- MUST document key patterns in code comments
- MUST avoid key collisions across different data types

### Eviction Strategy
- MUST choose appropriate strategy for use case
- MUST configure strategy parameters correctly
- MUST monitor eviction statistics
- MUST test eviction behavior under load

### TTL Management
- MUST set TTL based on data freshness requirements
- MUST use TIME_MS constants for time values
- MUST consider stale data impact
- MUST implement refresh mechanisms for critical data

### Error Handling
- MUST handle cache errors gracefully
- MUST log cache operation failures
- MUST provide fallback for cache misses
- MUST not throw exceptions from cache operations

### Statistics Tracking
- MUST track hits, misses, and evictions
- MUST calculate hit rate correctly
- MUST provide getStats() method
- MUST reset statistics in tests

### Pattern-Based Operations
- MUST use `invalidatePattern()` for bulk invalidation
- MUST use `:` as default separator
- MUST support `*` wildcard
- MUST return count of invalidated keys

### React Hooks
- MUST follow React rules of hooks
- MUST cleanup cache on unmount
- MUST provide loading states for async operations
- MUST handle errors in fetcher functions

### Testing Requirements
- MUST clear cache before each test
- MUST test hit/miss scenarios
- MUST test eviction behavior
- MUST test TTL expiration
- MUST test pattern matching

### Type Safety
- MUST use generic type parameter for cached values
- MUST enforce type consistency
- MUST provide type inference
- MUST avoid `any` types

### Performance Monitoring
- MUST monitor cache hit rate
- MUST alert on low hit rates (< 50%)
- MUST track memory usage
- MUST log performance anomalies
