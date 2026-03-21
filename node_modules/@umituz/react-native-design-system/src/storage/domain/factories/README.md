# Domain Factories

Factory functions for creating Zustand stores with persistence.

## Overview

Factory functions for creating Zustand stores with AsyncStorage persistence. Located at `src/domain/factories/`.

## Strategies

### Store Creation
- Use createStore() factory for all Zustand stores
- Provide type inference for state and actions
- Support optional persistence
- Enable store composition

### Persistence Strategy
- Use persist middleware for AsyncStorage integration
- Configure storage adapter (StorageService)
- Support selective persistence (partialize)
- Enable versioning and migration

### Store Configuration
- Require unique store name
- Define initial state clearly
- Create actions with set/get helpers
- Support middleware configuration

### Type Safety
- Infer state types from initial state
- Separate state and actions types
- Enable type-safe selectors
- Support generic store types

## Restrictions

### Store Creation
- DO NOT create stores without factory
- DO NOT duplicate store names
- DO NOT mix state and actions unnecessarily
- DO NOT create stores without clear purpose

### Persistence
- DO NOT enable persist without unique name
- DO NOT persist sensitive data without encryption
- DO NOT forget version when schema changes
- DO NOT omit migration for breaking changes

### Type Safety
- DO NOT use `any` for state type
- DO NOT bypass type inference
- DO NOT cast state to wrong type
- DO NOT create circular type dependencies

## Rules

### Factory Function
- MUST provide createStore(config) function
- MUST accept name parameter (required)
- MUST accept initialState parameter (required)
- MUST accept actions parameter (optional)
- MUST accept persist parameter (optional)

### Store Configuration
- MUST require unique store name
- MUST define complete initial state
- MUST provide type inference
- MUST validate configuration
- MUST return configured store

### Persistence Setup
- MUST use zustand persist middleware
- MUST use storageService adapter
- MUST include store name in config
- MUST support version parameter
- MUST support partialize function

### Actions Creation
- MUST provide set helper for updates
- MUST provide get helper for reads
- MUST support both object and function updates
- MUST enable action composition
- MUST preserve type safety

### Type Inference
- MUST infer state type from initialState
- MUST infer actions type from actions return
- MUST support ReturnType for external use
- MUST enable Pick for action subsets

### Version Management
- MUST increment version on schema changes
- MUST provide migrate function
- MUST handle old persisted states
- MUST document breaking changes
- MUST support multiple version migrations

### Partialize Function
- MUST accept full state parameter
- MUST return partial state for persistence
- MUST exclude transient state
- MUST include all persistent state
- MUST enable optimization

### Migration Function
- MUST accept persistedState parameter
- MUST accept version parameter
- MUST return migrated state
- MUST handle all old versions
- MUST default to identity for current version

### OnRehydrate Callback
- MUST accept hydrated state parameter
- MUST execute after rehydration
- MUST enable initialization logic
- MUST not block hydration
- MUST support async operations

### Error Handling
- MUST validate store configuration
- MUST throw descriptive errors for invalid config
- MUST handle persistence errors gracefully
- MUST log errors in development
- MUST provide fallback when possible

### Testing Support
- MUST enable store reset in tests
- MUST support mocking persistence
- MUST provide test utilities
- MUST clear state between tests
- MUST not have hidden dependencies

### Documentation
- MUST document store purpose
- MUST specify state structure
- MUST document all actions
- MUST explain persistence strategy
- MUST warn about common mistakes
