# Domain Layer

Core business logic, entities, value objects, and error handling for storage operations.

## Overview

The domain layer contains the fundamental business logic and types used throughout the storage system. Located at `src/domain/`.

## Architecture

```
domain/
├── constants/        # Time constants and defaults
├── entities/         # Domain entities (CachedValue, Result)
├── errors/           # Error classes and types
├── factories/        # Zustand store factory
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── value-objects/    # StorageKey value objects
```

## Strategies

### Value Objects
- Use StorageKey for type-safe storage keys
- Create scoped keys (user, organization, app)
- Use key factories for consistent key generation
- Document key structure patterns

### Error Handling
- Use specific error types for different failure scenarios
- Apply Result pattern for type-safe error handling
- Preserve error context (key, operation, cause)
- Categorize errors by type (read, write, serialization)

### Store Factory
- Use createStore for Zustand store creation
- Implement persist for state persistence
- Use versioning and migration for schema changes
- Apply partialize to select persisted state

### Key Generation
- Use generateCacheKey for cache entries
- Use generateListCacheKey for list queries
- Document key patterns in code comments
- Use parseCacheKey for key extraction

## Restrictions

### Value Objects
- DO NOT create keys without using factory functions
- DO NOT mix key scopes (user vs app vs org)
- DO NOT use dynamic strings as storage keys
- DO NOT create ambiguous key structures

### Error Handling
- DO NOT throw exceptions from Result types
- DO NOT use generic Error class
- DO NOT lose error context when wrapping errors
- DO NOT ignore error states in Result objects

### Store Factory
- DO NOT create stores without names
- DO NOT use persist without version number
- DO NOT change schema without migration
- DO NOT persist sensitive data without encryption

### Type Safety
- DO NOT use `any` for type parameters
- DO NOT skip type guards for runtime validation
- DO NOT assume Result is always success
- DO NOT cast values without validation

## Rules

### Value Objects (StorageKey)
- MUST use factory functions for key creation
- MUST use consistent key structure (prefix:params)
- MUST include scope prefix (app:, user:, org:)
- MUST document key patterns

### Error Classes
- MUST extend StorageError base class
- MUST include error code
- MUST preserve error context (key, operation)
- MUST attach cause error when wrapping exceptions

### Result Pattern
- MUST use success() for successful operations
- MUST use failure() for errors
- MUST check success flag before accessing data
- MUST provide type parameter for data

### Store Factory
- MUST provide unique store name
- MUST define initial state
- MUST specify version when persist is enabled
- MUST implement migrate function for schema changes

### Type Definitions
- MUST use generic type parameters
- MUST provide type inference
- MUST enforce type safety
- MUST document complex types

### Constants
- MUST use TIME_MS for time values
- MUST use DEFAULT_TTL for cache TTL
- MUST define constants in separate files
- MUST export constants for external use

### Utilities
- MUST validate input parameters
- MUST handle edge cases gracefully
- MUST provide type guards for validation
- MUST log warnings in development

### Testing
- MUST test error scenarios
- MUST test Result pattern operations
- MUST validate key generation
- MUST test store creation and persistence

### Documentation
- MUST document complex types
- MUST specify error codes
- MUST provide usage examples in comments
- MUST warn about common mistakes
