# Storage Service

Zustand persist middleware adapter for AsyncStorage integration.

## Overview

StorageService adapts AsyncStorage for use with Zustand's persist middleware, providing automatic state persistence. Located at `src/infrastructure/adapters/StorageService.ts`.

## Strategies

### Storage Adapter Pattern
- Implement StateStorage interface for Zustand compatibility
- Wrap AsyncStorage operations in try-catch blocks
- Provide graceful error handling with logging
- Return null/undefined on errors to prevent app crashes

### Error Handling Strategy
- Log all storage errors with context
- Return null on getItem errors
- Throw errors on setItem/removeItem for persist middleware
- Include key name in error messages

### Custom Adapters
- Create SecureStore adapter for sensitive data (tokens, credentials)
- Create encrypted storage adapter for high-security requirements
- Create namespaced adapters for data isolation
- Create platform-specific adapters (web localStorage vs native)

## Restrictions

### Storage Operations
- DO NOT use StorageService outside Zustand persist middleware
- DO NOT store non-serializable data (functions, class instances)
- DO NOT store large payloads (> 1MB) without chunking strategy
- DO NOT mix data types in same storage key

### Error Handling
- DO NOT ignore storage errors in production
- DO NOT throw on getItem errors (return null instead)
- DO NOT suppress setItem/removeItem errors
- DO NOT log sensitive data in error messages

### Custom Adapters
- DO NOT create adapters without implementing StateStorage interface
- DO NOT use SecureStore for non-sensitive data (performance)
- DO NOT use encryption without secure key management
- DO NOT create platform-specific adapters without Platform checks

## Rules

### Interface Implementation
- MUST implement `getItem(key: string): Promise<string | null>`
- MUST implement `setItem(key: string, value: string): Promise<void>`
- MUST implement `removeItem(key: string): Promise<void>`
- MUST return Promise for all methods

### Error Handling
- MUST wrap all AsyncStorage operations in try-catch
- MUST log errors with key name for debugging
- MUST return null on getItem errors
- MUST throw original error on setItem/removeItem errors

### Store Configuration
- MUST use unique store names across all stores
- MUST pass storageService as storage option
- MUST specify store name in persist config
- MUST handle migration when store schema changes

### Multiple Stores
- MUST use different store names for different stores
- MUST ensure store names are unique across app
- MUST document each store's purpose
- MUST consider storage key conflicts

### Custom Adapter Creation
- MUST implement complete StateStorage interface
- MUST handle errors consistently with base adapter
- MUST log errors with context
- MUST document adapter purpose and security model

### Secure Storage
- MUST use SecureStore for sensitive data only
- MUST document what data is secure vs regular storage
- MUST handle SecureStore unavailability (web platform)
- MUST provide fallback for secure storage failures

### Testing
- MUST mock StorageService in tests
- MUST clear storage in test setup
- MUST test error scenarios
- MUST test serialization/deserialization

### Version Control
- MUST increment version when store schema changes
- MUST implement migrate function for schema changes
- MUST test migration with old persisted data
- MUST document migration path

### Performance
- MUST consider storage operation performance
- MUST avoid frequent setItem calls (debounce if needed)
- MUST batch operations when possible
- MUST monitor storage size limits
