# Cache Domain

Core business logic and entities for the cache system.

## Overview

Domain layer contains cache entities, managers, error handling, and pattern matching. Located at `src/cache/domain/`.

## Strategies

### Domain Design
- Implement core cache business logic
- Define cache entities and value objects
- Provide error handling and recovery
- Support pattern-based operations

### Cache Management
- Use singleton pattern for CacheManager
- Support multiple named cache instances
- Provide lifecycle management (create, delete, clear)
- Track statistics across all caches

### Error Handling
- Centralize error handling logic
- Categorize errors by type
- Provide recovery strategies
- Log errors for debugging

### Pattern Matching
- Support wildcard patterns for bulk operations
- Use consistent separator (`:`)
- Enable efficient key filtering
- Support invalidation by pattern

## Restrictions

### Domain Logic
- DO NOT mix infrastructure concerns in domain
- DO NOT depend on React or UI libraries
- DO NOT include I/O operations
- DO NOT use AsyncStorage directly

### Error Handling
- DO NOT throw exceptions from domain logic
- DO NOT ignore error conditions
- DO NOT lose error context
- DO NOT create generic error types

### Pattern Matching
- DO NOT use regex patterns directly (use PatternMatcher)
- DO NOT mix different separators
- DO NOT create ambiguous patterns
- DO NOT use overly broad patterns

### Cache Management
- DO NOT create unlimited cache instances
- DO NOT allow duplicate cache names
- DO NOT leak memory through unreferenced caches
- DO NOT ignore cache statistics

## Rules

### Cache Entity
- MUST implement generic Cache<T> class
- MUST provide CRUD operations (get, set, has, delete)
- MUST provide clear() operation
- MUST provide invalidatePattern() operation
- MUST provide getStats() operation

### CacheManager Singleton
- MUST provide getCache(name, config?) method
- MUST return same instance for same name
- MUST provide deleteCache(name) method
- MUST provide clearAll() method
- MUST provide getCacheNames() method

### Error Handling
- MUST use CacheError base class
- MUST define specific error types
- MUST provide error codes
- MUST preserve error context (key, operation)

### Pattern Matcher
- MUST provide convertPatternToRegex() method
- MUST provide matchPattern() method
- MUST provide filterKeys() method
- MUST use `*` for wildcard
- MUST use `:` as default separator

### Statistics Tracking
- MUST track hits, misses, evictions, expirations
- MUST calculate hit rate
- MUST provide getStats() method
- MUST reset statistics in tests

### Type Safety
- MUST use generic type parameter <T>
- MUST enforce type consistency
- MUST provide type inference
- MUST avoid `any` types

### Testing Support
- MUST provide clearAll() for test cleanup
- MUST reset statistics between tests
- MUST support mock implementations
- MUST not have hidden dependencies

### Documentation Rules
- MUST document all public methods
- MUST specify parameter types
- MUST specify return types
- MUST provide usage examples in comments

### Performance Rules
- MUST use efficient data structures (Map)
- MUST provide O(1) access for get/set
- MUST provide O(n) worst case for pattern operations
- MUST minimize memory overhead
