# Infrastructure Layer

External service adapters and storage repository implementations.

## Overview

Infrastructure layer containing concrete implementations of storage operations. Located at `src/infrastructure/`.

## Directory Structure

- `adapters/` - External service adapters for Zustand persist middleware
- `repositories/` - Storage repository implementations with Result pattern

## Strategies

### Adapter Implementation
- Use StorageService adapter for Zustand persist middleware
- Implement StateStorage interface for Zustand integration
- Support AsyncStorage, MMKV, and SecureStore adapters
- Enable custom adapter creation for different storage backends

### Repository Pattern
- Use AsyncStorageRepository for primary storage operations
- Implement Result pattern for type-safe error handling
- Support generic type parameters for type safety
- Enable serialization/deserialization of complex objects

### Storage Adapters
- Use storageService for Zustand persist integration
- Create custom adapters for StateStorage interface
- Support SecureStore for sensitive data (tokens, credentials)
- Enable pluggable storage backends

### Error Handling
- Wrap all storage operations in try-catch blocks
- Return Result type instead of throwing exceptions
- Preserve original error context in cause property
- Support hierarchical error types for specific failures

### Serialization Strategy
- Use JSON.stringify for object serialization
- Use JSON.parse for deserialization with type safety
- Handle circular reference errors
- Support custom serialization for special types

## Restrictions

### Adapter Implementation
- DO NOT create adapters without implementing StateStorage interface
- DO NOT mix different storage backends in single adapter
- DO NOT skip error handling in adapter methods
- DO NOT store sensitive data without encryption

### Repository Usage
- DO NOT create new repository instances (use singleton)
- DO NOT bypass Result pattern error handling
- DO NOT use type assertions for type safety
- DO NOT ignore error codes from storage operations

### Storage Operations
- DO NOT perform operations without error handling
- DO NOT assume storage operations succeed
- DO NOT mix string and object storage methods
- DO NOT forget to handle null/undefined cases

### Error Handling
- DO NOT catch and ignore errors silently
- DO NOT expose sensitive data in error messages
- DO NOT lose error context when wrapping errors
- DO NOT create infinite error loops

### Serialization
- DO NOT serialize unsupported types (functions, symbols)
- DO NOT assume deserialization always succeeds
- DO NOT store raw data without validation
- DO NOT mix data formats in storage

## Rules

### Adapter Implementation
- MUST implement StateStorage interface for Zustand
- MUST provide getItem, setItem, removeItem methods
- MUST return Promise<string | null> from getItem
- MUST return Promise<void> from setItem and removeItem
- MUST handle errors gracefully in all methods

### AsyncStorageRepository
- MUST use singleton pattern (export storageRepository)
- MUST implement IStorageRepository interface
- MUST return StorageResult<T> from all methods
- MUST support generic type parameters
- MUST serialize objects with JSON.stringify
- MUST deserialize with JSON.parse and type validation
- MUST provide default value parameter for getItem

### Method Signatures
- MUST provide getItem<T>(key, defaultValue): Promise<StorageResult<T>>
- MUST provide setItem<T>(key, value): Promise<StorageResult<void>>
- MUST provide getString(key, defaultValue): Promise<StorageResult<string>>
- MUST provide setString(key, value): Promise<StorageResult<void>>
- MUST provide removeItem(key): Promise<StorageResult<void>>
- MUST provide hasItem(key): Promise<boolean>
- MUST provide clearAll(): Promise<StorageResult<void>>

### Error Handling
- MUST wrap all storage operations in try-catch
- MUST return failure() with StorageError on catch
- MUST preserve original error in cause property
- MUST include storage key in error context
- MUST use specific error types (StorageReadError, StorageWriteError)
- MUST not expose sensitive data in error messages

### Result Pattern
- MUST return success(data) on successful operations
- MUST return failure(error) on failed operations
- MUST check result.success before accessing result.data
- MUST handle result.error when success is false
- MUST not throw exceptions from repository methods

### Type Safety
- MUST use generic type parameters for all value operations
- MUST infer types from default value parameter
- MUST not use type assertions for type safety
- MUST validate types at runtime when deserializing
- MUST support complex types (objects, arrays)

### Singleton Pattern
- MUST export single storageRepository instance
- MUST use singleton for production code
- MUST enable instance creation for testing
- MUST not create multiple instances in production

### Custom Adapters
- MUST implement StateStorage interface
- MUST handle all required methods
- MUST support async operations
- MUST provide error handling
- MUST be compatible with Zustand persist

### SecureStore Integration
- MUST use SecureStore for sensitive data only
- MUST create separate adapter for SecureStore
- MUST not mix secure and non-secure storage
- MUST handle SecureStore-specific errors

### Testing Support
- MUST enable mocking for all methods
- MUST provide test double support
- MUST clear state between tests
- MUST not have hidden dependencies
- MUST support dependency injection

### Export Rules
- MUST export storageRepository singleton
- MUST export AsyncStorageRepository class
- MUST export storageService adapter
- MUST export all error types
- MUST export interface types

### Documentation
- MUST document all public methods
- MUST specify error types thrown
- MUST provide usage examples in separate files
- MUST warn about common mistakes
- MUST not include code in README files
