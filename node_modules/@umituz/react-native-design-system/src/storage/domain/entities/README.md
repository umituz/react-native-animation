# Domain Entities

Core entities for the storage domain including CachedValue and Result pattern.

## Overview

Fundamental domain entities used throughout the storage system. Located at `src/domain/entities/`.

## Strategies

### CachedValue Entity
- Use for cache entries with TTL and metadata
- Track creation timestamp for expiration
- Support TTL-based expiration checking
- Enable age calculation and remaining TTL queries

### Result Pattern
- Use discriminated union for type-safe error handling
- Provide success/failure states with type narrowing
- Include error context in failure state
- Support functional transformations (map, unwrap)

### Entity Composition
- Combine CachedValue with cache operations
- Use Result for all storage operations
- Enable error propagation without exceptions
- Support functional error handling patterns

## Restrictions

### CachedValue
- DO NOT modify timestamp after creation (except for sliding expiration)
- DO NOT adjust TTL manually to extend lifetime
- DO NOT create CachedValue without factory function
- DO NOT use negative or zero TTL values

### Result Pattern
- DO NOT throw exceptions from Result operations
- DO NOT access data without checking success flag
- DO NOT ignore failure states
- DO NOT mix success and failure in same type

### Type Safety
- DO NOT use `any` for Result data type
- DO NOT skip type guards when checking results
- DO NOT cast results without validation
- DO NOT create circular type dependencies

## Rules

### CachedValue Entity
- MUST use generic type parameter <T> for data
- MUST include timestamp (milliseconds since epoch)
- MUST include ttl (time to live in milliseconds)
- MUST provide factory function for creation
- MUST validate structure on creation

### Result Type
- MUST use discriminated union with success flag
- MUST include data in success state
- MUST include error in failure state
- MUST provide type parameter for data type
- MUST enable type narrowing with success flag

### Factory Functions
- MUST provide createCachedValue(data, ttl)
- MUST provide success(data) factory
- MUST provide failure(error) factory
- MUST validate input parameters
- MUST return properly typed entities

### Type Guards
- MUST provide isSuccess() type guard
- MUST provide isFailure() type guard
- MUST provide isCacheExpired() validator
- MUST use predicate return type for type narrowing
- MUST validate all required fields

### Utility Functions
- MUST provide getRemainingTTL() for cache entries
- MUST provide getCacheAge() for cache entries
- MUST provide unwrap() for Result extraction
- MUST provide map() for Result transformation
- MUST handle edge cases (null, undefined)

### Error Handling
- MUST preserve error context in failures
- MUST attach cause errors when wrapping
- MUST include error codes for categorization
- MUST log errors in development mode

### Serialization
- MUST support JSON serialization for CachedValue
- MUST validate structure after deserialization
- MUST handle circular reference errors
- MUST provide type guards for validation

### Testing Requirements
- MUST test entity creation and validation
- MUST test expiration logic with various TTL values
- MUST test Result pattern operations
- MUST test type guard behavior
- MUST test edge cases

### Documentation
- MUST document all public methods
- MUST specify parameter types and return types
- MUST provide usage guidance without code examples
- MUST warn about common mistakes
