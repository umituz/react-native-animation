# Source Directory

Main source code for react-native-storage package following Domain-Driven Design principles.

## Overview

Complete implementation of storage and caching solution with Clean Architecture. Located at `src/`.

## Architecture

Clean Architecture with DDD principles:
- `application/` - Application layer (ports/interfaces)
- `cache/` - In-memory caching module
- `domain/` - Domain layer (business logic)
- `infrastructure/` - Infrastructure layer (implementations)
- `presentation/` - Presentation layer (React hooks)
- `types/` - Shared TypeScript types

## Strategies

### Layer Organization
- Use application layer for interfaces and ports
- Use domain layer for business logic and entities
- Use infrastructure layer for external service implementations
- Use presentation layer for React integration
- Use cache module for in-memory caching

### Dependency Flow
- Presentation depends on domain
- Domain depends on nothing (core)
- Infrastructure implements domain interfaces
- Application defines contracts between layers

### Module Separation
- Keep cache module independent and self-contained
- Enable cache usage without storage dependency
- Support standalone cache operations
- Maintain clean module boundaries

### Type Safety
- Use TypeScript for all modules
- Provide generic type parameters
- Enable type inference
- Support branded types for storage keys

## Restrictions

### Layer Dependencies
- DO NOT import infrastructure in domain layer
- DO NOT import presentation in domain layer
- DO NOT import application in infrastructure
- DO NOT create circular dependencies

### Module Boundaries
- DO NOT mix concerns across layers
- DO NOT bypass layer boundaries
- DO NOT expose implementation details
- DO NOT create tight coupling between modules

### Code Organization
- DO NOT place business logic in presentation
- DO NOT place UI code in domain
- DO NOT place external dependencies in domain
- DO NOT create god objects

### Architecture Compliance
- DO NOT violate dependency inversion principle
- DO NOT ignore layer responsibilities
- DO NOT create ambiguous module placement
- DO NOT mix abstraction levels

## Rules

### Application Layer
- MUST define IStorageRepository interface
- MUST provide ports for dependency inversion
- MUST not contain implementation details
- MUST be framework-agnostic
- MUST enable constructor injection

### Cache Module
- MUST provide domain entities (CacheManager, CachedValue)
- MUST provide infrastructure implementation (TTLCache)
- MUST provide presentation hooks (useCache, useCachedValue)
- MUST support multiple eviction strategies (LRU, LFU, FIFO, TTL)
- MUST be independent and self-contained

### Domain Layer
- MUST contain core business logic
- MUST define value objects (StorageKey)
- MUST define entities (CachedValue, Result)
- MUST provide factory functions (createStore)
- MUST define error types (StorageError hierarchy)
- MUST not depend on external frameworks

### Infrastructure Layer
- MUST implement IStorageRepository interface
- MUST provide StorageService adapter for Zustand
- MUST handle Result pattern for error handling
- MUST support AsyncStorage as primary backend
- MUST enable custom storage backends

### Presentation Layer
- MUST provide React hooks for storage
- MUST provide React hooks for cache
- MUST enable reactive state management
- MUST handle loading and error states
- MUST follow React hooks rules

### Types Module
- MUST provide shared TypeScript types
- MUST define StorageResult type
- MUST define DynamicStorageKey type
- MUST enable type-safe operations
- MUST be imported by all layers

### Export Structure
- MUST export from index.ts at root level
- MUST organize exports by module
- MUST provide TypeScript types
- MUST not export internal utilities

### File Organization
- MUST place files in appropriate layer
- MUST follow feature-based organization within layers
- MUST use descriptive file names
- MUST maintain consistent structure
- MUST enable easy navigation

### Testing Structure
- MUST place tests in __tests__ directories
- MUST mirror source structure
- MUST provide comprehensive coverage
- MUST enable isolated testing
- MUST not depend on external services

### Type Safety Requirements
- MUST use TypeScript for all files
- MUST provide generic type parameters
- MUST enable type inference
- MUST not use `any` type
- MUST enforce strict type checking

### Error Handling
- MUST use Result pattern for operations
- MUST preserve error context
- MUST provide hierarchical error types
- MUST not throw exceptions across layers
- MUST handle errors gracefully

### Documentation
- MUST provide README for each layer
- MUST document public APIs
- MUST specify file locations
- MUST explain architecture decisions
- MUST not include code examples in README files

### Naming Conventions
- MUST use camelCase for files and variables
- MUST use PascalCase for types and interfaces
- MUST use descriptive names
- MUST follow React hooks naming (use prefix)
- MUST maintain consistency across modules

### Performance Considerations
- MUST optimize for read-heavy or write-heavy patterns
- MUST minimize unnecessary re-renders
- MUST use memoization where appropriate
- MUST enable lazy loading
- MUST consider bundle size impact

### Security Requirements
- MUST not expose sensitive data in logs
- MUST use SecureStore for sensitive data
- MUST handle encryption for secure storage
- MUST validate input data
- MUST prevent injection attacks

### Best Practices Compliance
- MUST follow Single Responsibility Principle
- MUST follow Open/Closed Principle
- MUST follow Liskov Substitution Principle
- MUST follow Interface Segregation Principle
- MUST follow Dependency Inversion Principle
