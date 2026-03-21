# Cache Infrastructure

Implementation details and concrete implementations of cache domain logic.

## Overview

Infrastructure layer for cache system, providing TTLCache implementation with actual storage and eviction logic. Located at `src/cache/infrastructure/`.

## Strategies

### Cache Implementation
- Use Map data structure for O(1) operations
- Implement TTL-based expiration checking
- Support eviction strategies from domain layer
- Provide thread-safe operations

### Storage Management
- Track cache size limits
- Implement automatic eviction when full
- Clean up expired entries periodically
- Support manual cache clearing

### Performance Optimization
- Minimize memory overhead per entry
- Use efficient data structures
- Implement lazy expiration checking
- Cache frequently accessed metadata

### Integration with Domain
- Implement interfaces defined in domain layer
- Use domain types for type safety
- Follow domain-level strategies and rules
- Export clean API to presentation layer

## Restrictions

### Implementation
- DO NOT expose internal storage directly
- DO NOT bypass eviction strategies
- DO NOT allow cache size to exceed limit
- DO NOT store non-serializable data

### Performance
- DO NOT perform expensive operations on every access
- DO NOT use blocking operations
- DO NOT allocate memory unnecessarily
- DO NOT iterate entire cache for single operations

### Expiration
- DO NOT ignore expired entries on access
- DO NOT auto-clean without explicit trigger
- DO NOT use inconsistent time sources
- DO NOT rely solely on TTL for memory management

## Rules

### TTLCache Implementation
- MUST implement Cache interface from domain
- MUST enforce maxSize limit
- MUST check expiration on get operations
- MUST trigger eviction when full
- MUST provide accurate statistics

### Entry Storage
- MUST use Map<string, CacheEntry<T>> for storage
- MUST include all required metadata
- MUST update timestamps on access
- MUST validate entry structure

### Expiration Handling
- MUST check (timestamp + ttl) < Date.now()
- MUST return undefined for expired entries
- MUST remove expired entries from storage
- MUST track expiration statistics

### Eviction Execution
- MUST call strategy.findKeyToEvict() when full
- MUST remove selected entry from storage
- MUST trigger onEvict callback if provided
- MUST update eviction statistics

### Statistics Tracking
- MUST increment hits on successful get
- MUST increment misses on failed get
- MUST increment evictions on eviction
- MUST increment expirations on expiration
- MUST calculate hitRate correctly

### Public Methods
- MUST implement set(key, value, ttl?)
- MUST implement get(key) -> T | undefined
- MUST implement has(key) -> boolean
- MUST implement delete(key) -> boolean
- MUST implement clear()
- MUST implement getStats()

### Configuration Validation
- MUST validate maxSize > 0
- MUST validate defaultTTL > 0
- MUST provide default values
- MUST reject invalid configuration

### Lifecycle Callbacks
- MUST call onEvict(entry) when entry evicted
- MUST call onExpire(entry) when entry expired
- MUST pass key and entry to callbacks
- MUST handle callback errors gracefully

### Type Safety
- MUST use generic type parameter T
- MUST enforce type consistency
- MUST provide type inference
- MUST validate input types where possible

### Thread Safety
- MUST handle concurrent access appropriately
- MUST not corrupt cache state
- MUST provide atomic operations
- MUST handle race conditions

### Testing Requirements
- MUST test all eviction strategies
- MUST test expiration logic
- MUST test statistics accuracy
- MUST test edge cases (empty, full, expired)
- MUST measure performance
