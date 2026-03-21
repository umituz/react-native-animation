# Cache Domain Types

TypeScript interfaces and types for cache system.

## Overview

TypeScript type definitions for cache entries, configuration, statistics, and eviction strategies. Located at `src/cache/domain/types/`.

## Strategies

### Cache Entry Definition
- Define CacheEntry with value, timestamp, TTL, and access tracking
- Include metadata for eviction strategies
- Support generic type parameter for cached values
- Track access patterns for statistics

### Cache Configuration
- Provide optional configuration parameters
- Set sensible defaults (maxSize: 100, TTL: 5 minutes)
- Support lifecycle callbacks (onEvict, onExpire)
- Allow strategy selection

### Statistics Tracking
- Track hits, misses, evictions, expirations
- Calculate hit rate automatically
- Provide snapshot of cache state
- Support performance monitoring

### Type Safety
- Use generic type parameter for cached values
- Enforce type consistency across operations
- Provide type inference for cache creation
- Support nested type structures

## Restrictions

### Type Definitions
- DO NOT use optional properties for required fields
- DO NOT mix different data types in same cache without generic
- DO NOT create circular type dependencies
- DO NOT omit timestamp or TTL from entries

### Configuration
- DO NOT allow unlimited cache sizes (must have maxSize)
- DO NOT set zero or negative TTL as default
- DO NOT make callbacks required (use optional)
- DO NOT ignore validation in configuration

### Statistics
- DO NOT calculate statistics on every access (expensive)
- DO NOT track unnecessary metrics
- DO NOT use floating-point for hit rate (use decimal)
- DO NOT expose internal tracking fields

## Rules

### CacheEntry Interface
- MUST include value field of generic type T
- MUST include timestamp (creation time in milliseconds)
- MUST include ttl (time to live in milliseconds)
- MUST include accessCount (for LFU strategy)
- MUST include lastAccess (for LRU strategy)

### CacheConfig Interface
- MUST provide maxSize with default value of 100
- MUST provide defaultTTL with default value of 300000 (5 minutes)
- MUST provide optional onEvict callback
- MUST provide optional onExpire callback
- MUST validate configuration values

### CacheStats Interface
- MUST include size (current entry count)
- MUST include hits (cache hit count)
- MUST include misses (cache miss count)
- MUST include evictions (evicted entry count)
- MUST include expirations (expired entry count)
- MUST include hitRate (calculated as hits / (hits + misses))

### Eviction Strategy Type
- MUST be union of literal types ('lru' | 'lfu' | 'fifo' | 'ttl')
- MUST support custom strategies
- MUST be case-sensitive
- MUST be documented

### Generic Type Parameters
- MUST use T for cached value type
- MUST provide type inference
- MUST support nested types
- MUST enforce type safety

### Type Guards
- MUST provide isCacheEntry guard
- MUST validate all required fields
- MUST check types of all fields
- MUST handle edge cases

### Statistics Calculation
- MUST calculate hitRate as decimal (0-1)
- MUST update statistics on every operation
- MUST provide accurate counts
- MUST not expose internal calculation methods

### Export Rules
- MUST export all public types
- MUST use `type` keyword for type-only exports
- MUST document type changes
