# React Hooks

Integration layer for storage and cache functionality with React components.

## Overview

This directory contains React hooks that integrate storage and cache functionality with React components. Located at `src/presentation/hooks/`.

## Available Hooks

| Hook | Purpose | Use Case |
|------|---------|----------|
| `useStorage` | Low-level storage operations | Manual CRUD operations |
| `useStorageState` | State with auto-persistence | Form data, user preferences |
| `useStore` | Zustand store selector | State management |
| `usePersistentCache` | API caching with persistence | Data fetching with offline support |
| `useCacheState` | In-memory cache state | Temporary state management |
| `useCache` | In-memory cache operations | Manual cache management |
| `useCachedValue` | Single value caching | Simple value caching |

## Strategies

### Hook Selection
- Use `useStorageState` for form inputs and settings
- Use `useStore` for Zustand integration
- Use `usePersistentCache` for API data with offline support
- Use `useCache` for complex caching patterns
- Use `useCachedValue` for simple single-value caching

### Performance Optimization
- Use selectors with `useStore` to prevent unnecessary re-renders
- Memoize callbacks passed to cache hooks
- Avoid inline fetcher functions
- Use appropriate TTL based on data change frequency

### Composition Patterns
- Combine multiple hooks for complex scenarios
- Use conditional fetching with enabled flag
- Implement dependent queries with proper data flow
- Share cache instances across components

## Restrictions

### Hook Usage
- DO NOT call hooks outside React components or custom hooks
- DO NOT call hooks conditionally or inside loops
- DO NOT use `useStorage` when `useStorageState` is sufficient
- DO NOT use inline fetcher functions (define them first)

### State Management
- DO NOT mix storage and cache for same data
- DO NOT use `useStorageState` for large datasets (> 1MB)
- DO NOT use `useCache` when simple state would suffice
- DO NOT create new cache instances on every render

### Performance
- DO NOT select entire store with `useStore` (use selectors)
- DO NOT recreate fetcher functions on every render
- DO NOT use very short TTLs (< 5 seconds)
- DO NOT cache large objects (> 100KB)

### Error Handling
- DO NOT ignore error states from cache hooks
- DO NOT silently fail storage operations
- DO NOT use try-catch inside hooks (handle errors at call site)

## Rules

### Hook Implementation
- MUST follow React rules of hooks
- MUST provide TypeScript types for all parameters
- MUST handle loading states appropriately
- MUST provide error state for async operations

### Storage Hooks (`useStorage`, `useStorageState`)
- MUST use unique keys for different state
- MUST specify initial value for `useStorageState`
- MUST handle storage errors gracefully
- MUST provide type parameter for type safety

### Cache Hooks (`useCache`, `useCacheState`, `useCachedValue`)
- MUST specify cache name when using `useCache`
- MUST provide fetcher function for `useCachedValue`
- MUST set appropriate TTL for data type
- MUST handle cache misses gracefully

### Persistent Cache (`usePersistentCache`)
- MUST provide unique key for each query
- MUST define fetcher function that returns Promise
- MUST specify TTL based on data freshness requirements
- MUST handle loading and error states
- MUST implement refresh mechanism

### Store Hook (`useStore`)
- MUST provide selector function for partial state
- MUST use memoized selectors to prevent re-renders
- MUST select only needed state slices
- MUST avoid selecting entire store

### Testing
- MUST test hooks with `@testing-library/react-hooks`
- MUST test loading, success, and error states
- MUST test cleanup and unmount behavior
- MUST mock storage/cache in tests

### Error Handling
- MUST expose error state from async hooks
- MUST allow error handling at component level
- MUST log errors in development mode
- MUST provide retry mechanisms for transient failures

### Type Safety
- MUST provide generic type parameters
- MUST enforce types for storage keys
- MUST use TypeScript strict mode
- MUST avoid `any` types in hook implementations

### Performance
- MUST use `useCallback` for functions passed to hooks
- MUST use `useMemo` for computed values
- MUST implement proper dependency arrays
- MUST avoid unnecessary re-renders
