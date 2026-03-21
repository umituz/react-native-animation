# Storage Adapters

Adapters for integrating Zustand persist middleware with various storage backends.

## Overview

Storage adapter implementations for Zustand persist middleware. Located at `src/infrastructure/adapters/`.

## Strategies

### Adapter Pattern
- Use StorageService adapter for AsyncStorage integration
- Implement StateStorage interface for Zustand compatibility
- Support multiple storage backends (AsyncStorage, MMKV, SecureStore)
- Enable custom adapter creation for specific needs

### Storage Backend Selection
- Use AsyncStorage for general-purpose storage
- Use MMKV for high-performance key-value storage
- Use SecureStore for sensitive data (tokens, credentials)
- Use SQLite for complex relational data
- Use file system for large data or binary files

### Adapter Composition
- Use namespaced adapters for key isolation
- Use hybrid adapters for multi-level caching
- Use encrypted adapters for data security
- Use migrating adapters for version management

### Error Handling
- Wrap all storage operations in try-catch blocks
- Return null on read failures for graceful degradation
- Log errors for debugging
- Implement retry logic for transient failures

## Restrictions

### Adapter Implementation
- DO NOT create adapters without implementing StateStorage interface
- DO NOT mix synchronous and asynchronous operations
- DO NOT ignore errors in adapter methods
- DO NOT create infinite loops in error handlers

### Storage Selection
- DO NOT use SecureStore for large data
- DO NOT use AsyncStorage for frequently accessed data
- DO NOT use file system for simple key-value storage
- DO NOT use sensitive storage for non-sensitive data

### Adapter Usage
- DO NOT use the same adapter instance for different purposes
- DO NOT create adapters without proper error handling
- DO NOT share adapters between incompatible stores
- DO NOT forget to clean up resources

### Custom Adapters
- DO NOT implement custom adapters without necessity
- DO NOT skip implementing required interface methods
- DO NOT create adapters with hidden dependencies
- DO NOT use adapters without testing

## Rules

### StateStorage Interface
- MUST implement getItem(key): Promise<string | null>
- MUST implement setItem(key, value): Promise<void>
- MUST implement removeItem(key): Promise<void>
- MUST handle all errors gracefully
- MUST return Promise for all methods
- MUST be compatible with Zustand persist middleware

### StorageService Adapter
- MUST use AsyncStorage for storage operations
- MUST handle serialization/deserialization
- MUST provide null for missing keys
- MUST not throw exceptions for missing data
- MUST be the default adapter for Zustand stores

### Custom Adapter Creation
- MUST implement StateStorage interface completely
- MUST handle all three required methods
- MUST provide async method implementations
- MUST include error handling
- MUST be compatible with Zustand persist

### SecureStore Adapter
- MUST use expo-secure-store for implementation
- MUST handle SecureStore-specific errors
- MUST be used only for sensitive data
- MUST not store large amounts of data
- MUST provide proper error messages

### MMKV Adapter
- MUST use react-native-mmkv for implementation
- MUST initialize MMKV instance properly
- MUST handle type conversions
- MUST provide high-performance storage
- MUST support synchronous operations if needed

### SQLite Adapter
- MUST initialize database schema on first use
- MUST use transactions for data integrity
- MUST handle database connection errors
- MUST use parameterized queries
- MUST close connections properly

### File System Adapter
- MUST validate file paths
- MUST handle file system permissions
- MUST provide proper error messages
- MUST clean up temporary files
- MUST handle concurrent access safely

### Encrypted Adapter
- MUST use strong encryption algorithms
- MUST properly manage encryption keys
- MUST handle encryption/decryption errors
- MUST not expose keys in logs
- MUST use secure key storage

### Namespaced Adapter
- MUST prefix all keys with namespace
- MUST use consistent separator (:) in keys
- MUST enable key isolation between stores
- MUST prevent key collisions
- MUST be composable with other adapters

### Hybrid Adapter
- MUST define clear fallback strategy
- MUST handle consistency between storages
- MUST implement read-through caching
- MUST implement write-through caching
- MUST handle partial failures gracefully

### Migrating Adapter
- MUST support version management
- MUST migrate data on read
- MUST clean up old data after migration
- MUST handle migration failures

### Error Handling
- MUST catch all exceptions in adapter methods
- MUST return null on read failures
- MUST log errors for debugging
- MUST not expose sensitive data in errors
- MUST provide meaningful error context

### Performance Considerations
- MUST minimize storage operations
- MUST batch operations when possible
- MUST use appropriate storage for data size
- MUST consider synchronous vs asynchronous operations
- MUST optimize for read-heavy or write-heavy patterns

### Testing Support
- MUST enable adapter mocking
- MUST provide test implementations
- MUST support dependency injection
- MUST clear state between tests
- MUST not have hidden dependencies

### Export Rules
- MUST export storageService as default adapter
- MUST export adapter types
- MUST export adapter utilities
- MUST document adapter behavior
- MUST provide usage examples separately

### Documentation
- MUST document all custom adapters
- MUST specify storage backend requirements
- MUST explain adapter behavior
- MUST warn about limitations
- MUST not include code in README files
