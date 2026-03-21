# Cache Presentation

React hooks and UI integration for cache system.

## Overview

Presentation layer provides React hooks and components for integrating cache functionality with React applications. Located at `src/cache/presentation/`.

## Strategies

### Hook Design
- Create hooks for common caching patterns
- Provide simple, composable APIs
- Support React Suspense where applicable
- Handle loading and error states

### React Integration
- Follow React rules of hooks
- Support dependency arrays correctly
- Clean up on component unmount
- Avoid unnecessary re-renders

### State Management
- Expose cache state reactively
- Provide update mechanisms
- Support invalidation and refresh
- Handle stale data appropriately

### Performance
- Use memoization to prevent redundant operations
- Implement efficient re-render strategies
- Debounce rapid cache operations
- Minimize hook overhead

## Restrictions

### Hook Usage
- DO NOT call hooks outside React components
- DO NOT call hooks conditionally
- DO NOT call hooks in loops
- DO NOT create new cache instances on every render

### State Management
- DO NOT cause infinite re-render loops
- DO NOT mutate state directly
- DO NOT ignore loading states
- DO NOT swallow errors silently

### Performance
- DO NOT recreate functions on every render
- DO NOT subscribe to entire cache when slice needed
- DO NOT perform expensive operations in render
- DO NOT cache large computed values in hook state

### Cleanup
- DO NOT leak subscriptions
- DO NOT forget cleanup on unmount
- DO NOT create memory leaks
- DO NOT leave timers running

## Rules

### Hook Implementation
- MUST follow React rules of hooks
- MUST use `use` prefix for hook names
- MUST provide TypeScript types
- MUST handle errors gracefully

### useCache Hook
- MUST accept cache name parameter
- MUST return cache interface methods
- MUST provide consistent API across renders
- MUST handle non-existent cache gracefully

### useCachedValue Hook
- MUST accept key and fetcher function
- MUST accept optional TTL parameter
- MUST return value, setter, and invalidate function
- MUST handle loading state
- MUST handle error state

### State Updates
- MUST trigger re-renders on cache changes
- MUST use React state for reactive values
- MUST memoize callbacks to prevent re-renders
- MUST update state atomically

### Cleanup Behavior
- MUST clean up subscriptions on unmount
- MUST cancel pending operations
- MUST clear timers
- MUST not leak memory

### Error Handling
- MUST expose error state to caller
- MUST allow error recovery
- MUST log errors in development
- MUST provide error boundaries for usage

### TypeScript Types
- MUST provide generic type parameters
- MUST infer types from cache
- MUST enforce type safety
- MUST document complex types

### Performance Rules
- MUST use useCallback for stable function references
- MUST use useMemo for expensive computations
- MUST provide stable references across renders
- MUST minimize re-render frequency

### Testing Requirements
- MUST test with @testing-library/react-hooks
- MUST test cleanup behavior
- MUST test error scenarios
- MUST test type safety
- MUST test re-render behavior

### Export Rules
- MUST export hooks from index file
- MUST provide consistent naming
- MUST document hook contracts
