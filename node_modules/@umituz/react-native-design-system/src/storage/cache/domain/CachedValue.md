# Cache Entry (CachedValue)

Cached value entity with TTL and metadata for time-based expiration.

## Overview

CachedValue represents a single cached entry with value, timestamp, TTL, and access tracking. Located at `src/cache/domain/CachedValue.ts`.

## Strategies

### TTL Management
- Set TTL based on data change frequency
- Use shorter TTL for frequently changing data
- Use longer TTL for static or rarely changing data
- Consider sliding expiration for frequently accessed data

### Metadata Tracking
- Track creation timestamp for age calculation
- Track TTL for expiration checking
- Optionally track access count for analytics
- Optionally track last access time for LRU eviction

### Validation Strategy
- Always validate TTL is within reasonable bounds
- Check expiration before returning cached values
- Validate structure when deserializing from storage
- Implement type guards for type safety

## Restrictions

### TTL Values
- DO NOT use negative TTL values
- DO NOT use zero TTL (data expires immediately)
- DO NOT use extremely short TTLs (< 1000ms)
- DO NOT use extremely long TTLs (> 10 years)

### Metadata Modification
- DO NOT modify timestamp after creation (except for sliding expiration)
- DO NOT manually adjust TTL to extend cache lifetime
- DO NOT alter data property directly (use cache methods)
- DO NOT assume timestamp is in seconds (it's milliseconds)

### Serialization
- DO NOT serialize without validating structure first
- DO NOT deserialize without type checking
- DO NOT assume cached values are always valid JSON
- DO NOT mix different data types in same cache entry

## Rules

### Creation
- MUST use `createCachedValue()` factory function
- MUST specify TTL in milliseconds
- MUST capture current timestamp in milliseconds
- MUST include all required fields (data, timestamp, ttl)

### Expiration Checking
- MUST use `isCacheExpired()` before accessing cached data
- MUST compare timestamp + ttl against current time
- MUST treat expired entries as non-existent
- MUST remove expired entries from cache

### TTL Calculation
- MUST use `getRemainingTTL()` to check time until expiration
- MUST return 0 or negative for expired entries
- MUST use milliseconds for all time calculations
- MUST handle edge cases (zero, negative, very large TTL)

### Age Tracking
- MUST use `getCacheAge()` to determine entry age
- MUST calculate age as (current time - timestamp)
- MUST return age in milliseconds
- MUST use age for analytics and monitoring

### Serialization/Deserialization
- MUST validate structure after deserialization
- MUST use TypeScript type guards for type safety
- MUST handle JSON parsing errors gracefully
- MUST preserve timestamp and TTL during serialization

### Type Safety
- MUST use generic type parameter for data field
- MUST enforce type checking with `isValidCachedValue()`
- MUST validate data structure when loading from storage
- MUST handle type mismatches gracefully

### Error Handling
- MUST handle invalid TTL values gracefully
- MUST throw descriptive errors for malformed entries
- MUST log expiration warnings in development
- MUST provide fallback for corrupted cache entries

### Testing
- MUST test expiration logic with various TTL values
- MUST test edge cases (zero, negative, very large TTL)
- MUST test serialization/deserialization roundtrip
- MUST test type validation with type guards
