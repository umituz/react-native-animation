# Presentation Layer

React hooks and components for UI integration with storage and cache.

## Overview

Presentation layer containing React hooks for storage and cache operations. Located at `src/presentation/`.

## Directory Structure

- `hooks/` - React hooks for storage and cache integration

## Strategies

### React Integration
- Use custom hooks for storage operations
- Use custom hooks for cache operations
- Enable reactive state management
- Support automatic re-renders on state changes

### State Management
- Use useStorageState for persistent state
- Use useCacheState for cached state
- Enable automatic sync with storage/cache
- Support default values and initialization

### Cache Integration
- Use useCache for cache instance access
- Use useCachedValue for single value caching
- Use usePersistentCache for hybrid cache+storage
- Enable TTL-based invalidation

### Hook Design
- Follow React hooks rules and best practices
- Enable composition and reuse
- Support dependency arrays for optimization
- Provide cleanup functions for side effects

## Restrictions

### Hook Usage
- DO NOT call hooks outside React components
- DO NOT call hooks conditionally or in loops
- DO NOT mutate state directly
- DO NOT ignore loading and error states

### State Management
- DO NOT mix storage and cache state unnecessarily
- DO NOT create redundant state for same data
- DO NOT forget to handle undefined/null states
- DO NOT use stale state in closures

### Performance
- DO NOT create new cache instances on every render
- DO NOT skip dependency arrays in useEffect
- DO NOT cause unnecessary re-renders
- DO NOT forget cleanup in useEffect

### Error Handling
- DO NOT ignore errors from async operations
- DO NOT expose raw error objects to UI
- DO NOT retry indefinitely on failures
- DO NOT lose error context

## Rules

### Hook Implementation
- MUST follow React hooks rules
- MUST use useMemo for expensive computations
- MUST use useCallback for stable function references
- MUST provide cleanup functions for effects
- MUST support dependency arrays

### Storage Hooks
- MUST provide useStorage for low-level operations
- MUST provide useStorageState for state sync
- MUST support generic type parameters
- MUST handle loading states
- MUST handle error states
- MUST return stable references

### Cache Hooks
- MUST provide useCache for cache instance access
- MUST provide useCachedValue for value caching
- MUST provide useCacheState for state integration
- MUST support TTL configuration
- MUST support invalidation callbacks
- MUST handle cache misses gracefully

### Persistent Cache Hooks
- MUST provide usePersistentCache for hybrid caching
- MUST support storage fallback
- MUST handle rehydration from storage
- MUST support stale-while-revalidate strategy
- MUST provide loading, error, and data states
- MUST support refresh callbacks

### State Synchronization
- MUST sync state changes to storage/cache
- MUST re-render on state changes
- MUST provide latest state to consumers
- MUST handle race conditions properly
- MUST support optimistic updates

### Error Handling
- MUST expose error state from hooks
- MUST enable error callbacks
- MUST not throw exceptions from hooks
- MUST preserve error context
- MUST support error recovery

### Loading States
- MUST expose loading state from async hooks
- MUST indicate initial load vs refresh
- MUST support loading callbacks
- MUST prevent duplicate requests
- MUST handle concurrent operations

### Type Safety
- MUST use generic type parameters
- MUST infer types from default values
- MUST provide type-safe return values
- MUST support custom type definitions
- MUST not use type assertions

### Performance Optimization
- MUST use useMemo for cache instances
- MUST use useCallback for event handlers
- MUST provide dependency array parameters
- MUST prevent unnecessary re-renders
- MUST enable memoization where appropriate

### Cleanup and Lifecycle
- MUST clean up subscriptions on unmount
- MUST clear temporary cache on unmount
- MUST prevent memory leaks
- MUST handle component unmount gracefully
- MUST not update state after unmount

### Hook Naming
- MUST use 'use' prefix for all hooks
- MUST use descriptive names for functionality
- MUST follow naming conventions
- MUST be consistent with ecosystem
- MUST indicate purpose in name

### Cache Naming
- MUST use descriptive cache names
- MUST avoid generic cache names
- MUST enable pattern matching for invalidation
- MUST follow naming conventions
- MUST prevent naming conflicts

### Testing Support
- MUST enable hook testing with renderHook
- MUST provide cleanup for testing
- MUST support mocking dependencies
- MUST reset state between tests
- MUST not have hidden side effects

### Export Rules
- MUST export all hooks from presentation layer
- MUST provide TypeScript types
- MUST document hook behavior
- MUST specify hook contracts
- MUST not export internal utilities

### Documentation
- MUST document all public hooks
- MUST specify parameter types and requirements
- MUST explain return value structure
- MUST provide usage guidance
- MUST warn about common mistakes
- MUST not include code examples

### Best Practices Compliance
- MUST follow React hooks rules
- MUST enable proper dependency tracking
- MUST support concurrent mode
- MUST be compatible with Strict Mode
- MUST not cause memory leaks
