# Application Layer

Ports and interfaces for dependency inversion between domain and infrastructure layers.

## Overview

Application layer containing interfaces (ports) for storage operations. Located at `src/application/`.

## Directory Structure

- `ports/` - Repository interfaces defining storage contracts

## Strategies

### Dependency Inversion
- Use IStorageRepository interface for storage operations
- Define contracts in application layer
- Implement interfaces in infrastructure layer
- Enable dependency injection for testing

### Port Definition
- Use IStorageRepository as primary storage interface
- Define all storage operations as methods
- Support Result pattern for error handling
- Enable generic type parameters for type safety

### Use Case Pattern
- Create use cases for complex business logic
- Inject IStorageRepository through constructor
- Encapsulate business rules in use case methods
- Enable testing with mock implementations

### Interface Segregation
- Define cohesive interfaces for specific purposes
- Support granular method dependencies
- Enable single responsibility principle
- Facilitate testing with focused mocks

## Restrictions

### Interface Definition
- DO NOT define implementation details in interfaces
- DO NOT create interfaces without clear purpose
- DO NOT mix different concerns in single interface
- DO NOT include framework-specific types

### Dependency Injection
- DO NOT create concrete instances in use cases
- DO NOT use hardcoded dependencies
- DO NOT skip constructor injection
- DO NOT create circular dependencies

### Use Case Implementation
- DO NOT implement business logic in components
- DO NOT mix storage operations with UI logic
- DO NOT create use cases without clear purpose
- DO NOT bypass error handling in use cases

### Testing
- DO NOT test with real storage implementations
- DO NOT create complex mock implementations
- DO NOT share state between tests
- DO NOT forget to reset mocks between tests

## Rules

### IStorageRepository Interface
- MUST define getItem<T>(key, defaultValue): Promise<StorageResult<T>>
- MUST define setItem<T>(key, value): Promise<StorageResult<void>>
- MUST define getString(key, defaultValue): Promise<StorageResult<string>>
- MUST define setString(key, value): Promise<StorageResult<void>>
- MUST define removeItem(key): Promise<StorageResult<void>>
- MUST define hasItem(key): Promise<boolean>
- MUST define clearAll(): Promise<StorageResult<void>>

### Interface Design
- MUST use generic type parameters for value operations
- MUST return Result type for all mutable operations
- MUST support type inference from parameters
- MUST be framework-agnostic
- MUST define contracts only (no implementation)

### Method Signatures
- MUST accept key parameter for all operations
- MUST accept defaultValue parameter for get operations
- MUST accept value parameter for set operations
- MUST return Promise for all async operations
- MUST include StorageResult for typed results

### Use Case Implementation
- MUST accept IStorageRepository in constructor
- MUST define single responsibility per use case
- MUST handle Result pattern in all operations
- MUST return domain types from use case methods
- MUST not expose storage implementation details

### Constructor Injection
- MUST inject dependencies through constructor
- MUST store dependencies as private fields
- MUST use interface types for dependencies
- MUST enable dependency injection for testing
- MUST not create instances inside use cases

### Error Handling
- MUST check result.success before accessing data
- MUST handle result.error appropriately
- MUST propagate errors to callers when needed
- MUST not throw exceptions from use cases
- MUST preserve error context

### Testing Requirements
- MUST enable mocking of IStorageRepository
- MUST support test double implementations
- MUST isolate tests from real storage
- MUST clear state between test runs
- MUST not depend on external services

### Mock Implementation
- MUST implement full IStorageRepository interface
- MUST return appropriate Result types
- MUST simulate storage behavior accurately
- MUST support async operations with Promise
- MUST be simple and predictable

### Custom Repository Implementation
- MUST implement IStorageRepository interface
- MUST use Result pattern for all methods
- MUST handle errors appropriately
- MUST support generic type parameters
- MUST be compatible with existing code

### Layer Separation
- MUST not depend on infrastructure implementations
- MUST not depend on presentation components
- MUST define contracts for domain use
- MUST enable layer independence
- MUST support testing at each layer

### Export Rules
- MUST export IStorageRepository interface
- MUST export all port interfaces
- MUST not export implementations
- MUST provide TypeScript types
- MUST document interface contracts

### Architecture Compliance
- MUST follow dependency inversion principle
- MUST depend on abstractions not concretions
- MUST enable independent layer evolution
- MUST support multiple implementations
- MUST maintain clear separation of concerns

### Documentation
- MUST document all interface methods
- MUST specify method contracts clearly
- MUST provide usage guidance
- MUST explain Result pattern usage
- MUST not include implementation examples
