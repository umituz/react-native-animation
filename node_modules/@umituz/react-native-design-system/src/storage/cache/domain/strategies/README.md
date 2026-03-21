# Cache Eviction Strategies

Algorithms for determining which cache entries to evict when cache is full.

## Overview

Eviction strategies determine which cache entries to remove when the cache reaches its maximum size. Located at `src/cache/domain/strategies/`.

## Strategies

### Strategy Selection
- Use LRU (Least Recently Used) for most use cases - best general performance
- Use LFU (Least Frequently Used) for popularity-based caching - keeps frequently accessed items
- Use FIFO (First In First Out) for simple queue-based caching - lowest overhead
- Use TTL (Time To Live) for time-sensitive data - required for expiration

### Performance Considerations
- LRU provides O(1) eviction time with proper data structures
- LFU provides O(n) eviction time but better for read-heavy workloads
- FIFO provides O(1) eviction time with minimal overhead
- TTL requires periodic cleanup but essential for freshness

### Access Pattern Analysis
- Consider data access patterns when choosing strategy
- Use LRU for temporal locality (recently accessed likely to be accessed again)
- Use LFU for frequency-based patterns (popular items should stay)
- Use FIFO for sequential access patterns
- Use TTL when data freshness is critical

### Implementation Strategy
- Implement EvictionStrategy interface for custom strategies
- Track necessary metadata (access count, last access, timestamp)
- Provide findKeyToEvict method for selection
- Update metadata on cache operations

## Restrictions

### Strategy Usage
- DO NOT use LFU for write-heavy workloads (expensive)
- DO NOT use FIFO when access patterns matter
- DO NOT use TTL when data staleness is acceptable
- DO NOT change strategies after cache creation

### Performance
- DO NOT implement O(n²) eviction algorithms
- DO NOT scan entire cache for eviction on every operation
- DO NOT track unnecessary metadata for chosen strategy
- DO NOT use complex algorithms for simple use cases

### Custom Strategies
- DO NOT implement custom strategies without thorough testing
- DO NOT ignore edge cases (empty cache, single entry)
- DO NOT create strategies without clear performance benefits
- DO NOT mix multiple eviction strategies in same cache

## Rules

### EvictionStrategy Interface
- MUST implement findKeyToEvict(store: Map): string | undefined
- MUST return undefined when store is empty
- MUST return single key for eviction
- MUST handle all cache states correctly

### LRU Strategy
- MUST track lastAccess timestamp for each entry
- MUST update lastAccess on every get operation
- MUST select entry with oldest lastAccess time
- MUST provide O(1) or O(log n) time complexity

### LFU Strategy
- MUST track accessCount for each entry
- MUST increment accessCount on every get operation
- MUST select entry with lowest accessCount
- MUST handle ties consistently (use LRU as tiebreaker)

### FIFO Strategy
- MUST track insertion order for each entry
- MUST select oldest entry (first inserted)
- MUST NOT consider access patterns
- MUST provide O(1) time complexity

### TTL Strategy
- MUST check timestamp + ttl against current time
- MUST select expired entries first
- MUST fall back to secondary strategy if no expired entries
- MUST handle zero TTL entries (immediate eviction)

### Metadata Updates
- MUST update eviction metadata on every cache operation
- MUST update metadata on cache set operations
- MUST update metadata on cache get operations
- MUST reset metadata appropriately on cache updates

### Edge Cases
- MUST handle empty cache (return undefined)
- MUST handle single entry cache
- MUST handle all entries with same metadata
- MUST handle concurrent access safely

### Strategy Selection
- MUST use LRU as default strategy
- MUST allow strategy override in configuration
- MUST validate strategy choice
- MUST document strategy behavior

### Testing Requirements
- MUST test eviction with full cache
- MUST test eviction with empty cache
- MUST test metadata tracking accuracy
- MUST test edge cases
- MUST measure time complexity

### Performance Rules
- MUST not exceed O(n) for eviction selection
- MUST not allocate memory during eviction
- MUST not use blocking operations
- MUST minimize CPU overhead
