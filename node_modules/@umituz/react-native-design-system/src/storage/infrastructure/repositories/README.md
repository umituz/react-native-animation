# Storage Repositories

Repository pattern implementation for data persistence with error handling.

## Overview

AsyncStorageRepository provides storage operations with Result pattern for error handling. Located at `src/infrastructure/repositories/`.

## Strategies

### Result Pattern
- Return Result objects instead of throwing exceptions
- Use success/failure states for predictable error handling
- Include error details in failure results
- Allow graceful degradation when operations fail

### Serialization Strategy
- Automatically serialize objects to JSON
- Deserialize with type safety using generics
- Handle circular reference errors gracefully
- Support all JSON-serializable types

### Error Handling Strategy
- Categorize errors by type (read, write, serialization)
- Include key name in error context
- Preserve original error as cause
- Log errors for debugging

### Performance Strategy
- Use parallel operations for batch operations
- Implement chunking for large datasets
- Avoid synchronous operations on main thread
- Cache frequently accessed values

## Restrictions

### Storage Operations
- DO NOT store non-JSON-serializable data (functions, class instances)
- DO NOT store circular references
- DO NOT use undefined values (use null instead)
- DO NOT store extremely large payloads (> 1MB) without chunking

### Error Handling
- DO NOT ignore error states in Result objects
- DO NOT throw exceptions from repository methods
- DO NOT return null for missing keys (use defaultValue)
- DO NOT suppress error logging in production

### Type Safety
- DO NOT use `any` type for stored values
- DO NOT skip type parameters on generic methods
- DO NOT assume Result is always successful
- DO NOT cast results without checking success flag

### Performance
- DO NOT perform sequential operations in loops (use parallel)
- DO NOT read same key multiple times without caching
- DO NOT write to storage on every state change (debounce)
- DO NOT store redundant data

## Rules

### Interface Implementation
- MUST implement IStorageRepository interface completely
- MUST return StorageResult<T> for all methods
- MUST include error details in failure results
- MUST handle all exceptions internally

### Method Signatures
- MUST provide generic type parameter for type safety
- MUST accept defaultValue parameter for getItem methods
- MUST return Promise for all async operations
- MUST preserve key names in error messages

### Error Handling
- MUST wrap all storage operations in try-catch
- MUST return failure Result on errors
- MUST include error code and message
- MUST log errors before returning failure

### Serialization
- MUST use JSON.stringify for setItem operations
- MUST use JSON.parse for getItem operations
- MUST handle JSON parsing errors
- MUST validate deserialized structure

### Type Safety
- MUST enforce type parameter consistency
- MUST use type guards for runtime validation
- MUST provide type inference for return values
- MUST avoid type assertions when possible

### Result Objects
- MUST set success flag to true or false
- MUST include data in success results
- MUST include error in failure results
- MUST check success flag before accessing data

### Singleton Usage
- MUST use exported singleton instance
- MUST NOT create multiple repository instances
- MUST reset state between tests
- MUST clear storage in test setup

### Testing
- MUST mock repository for unit tests
- MUST use real repository for integration tests
- MUST clear storage before each test
- MUST test both success and failure scenarios

### Performance
- MUST use Promise.all for parallel operations
- MUST implement debouncing for frequent writes
- MUST use appropriate chunk sizes for large data
- MUST monitor storage size limits

### Error Categories
- MUST use StorageReadError for read failures
- MUST use StorageWriteError for write failures
- MUST use StorageSerializationError for serialization failures
- MUST use StorageDeserializationError for parsing failures
