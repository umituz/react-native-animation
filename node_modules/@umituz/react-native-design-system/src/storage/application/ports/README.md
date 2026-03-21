# Application Ports

Repository interfaces for dependency inversion and testability.

## Overview

Ports define contracts between application and infrastructure layers using dependency inversion principle. Located at `src/application/ports/`.

## Strategies

### Dependency Inversion
- Define interfaces in application layer
- Implement interfaces in infrastructure layer
- Depend on abstractions, not concretions
- Enable swapping implementations without business logic changes

### Testability Strategy
- Design interfaces for easy mocking
- Use constructor injection for dependencies
- Create fake implementations for testing
- Separate unit tests from integration tests

### Contract Design
- Define clear method signatures
- Use Result pattern for error handling
- Include type parameters for flexibility
- Document interface contracts

### Implementation Strategy
- Provide production implementation (AsyncStorage)
- Provide mock implementation for testing
- Support custom implementations (MMKV, SecureStore)
- Allow platform-specific implementations

## Restrictions

### Interface Design
- DO NOT include implementation details in interfaces
- DO NOT change interface signatures without major version bump
- DO NOT add optional parameters to existing methods
- DO NOT remove methods from interfaces

### Usage
- DO NOT use concrete implementations in business logic
- DO NOT instantiate dependencies inside services
- DO NOT couple services to specific storage technologies
- DO NOT bypass interface for performance

### Implementation
- DO NOT throw exceptions from interface methods
- DO NOT return undefined (use null or Result)
- DO NOT ignore type parameters
- DO NOT mix sync and async patterns

### Testing
- DO NOT use real storage in unit tests
- DO NOT share mock instances between tests
- DO NOT forget to reset mock state
- DO NOT test interfaces directly

## Rules

### Interface Definition
- MUST define all required methods
- MUST use generic type parameters for flexibility
- MUST return Promise for async operations
- MUST use Result pattern for error handling

### Method Signatures
- MUST include type parameter <T> for data operations
- MUST accept key parameter for storage operations
- MUST provide defaultValue for getItem methods
- MUST return StorageResult for operations that can fail

### Constructor Injection
- MUST inject interfaces through constructors
- MUST store interface reference as private field
- MUST mark constructor parameter as readonly
- MUST not create instances inside class

### Implementation Classes
- MUST implement complete interface
- MUST handle all error cases internally
- MUST return appropriate error types
- MUST log errors for debugging

### Mock Implementations
- MUST implement all interface methods
- MUST provide methods to set mock behavior
- MUST track method calls for assertions
- MUST reset state between tests

### Custom Implementations
- MUST implement IStorageRepository interface
- MUST handle serialization consistently
- MUST provide error details in results
- MUST document platform limitations

### Dependency Injection
- MUST use interface types in constructors
- MUST not depend on concrete classes
- MUST support different implementations
- MUST validate dependencies at construction time

### Type Safety
- MUST specify type parameters for all operations
- MUST enforce type consistency
- MUST use type guards for validation
- MUST avoid type assertions

### Error Handling
- MUST return failure Result for errors
- MUST include error context (key, operation)
- MUST preserve original error as cause
- MUST not throw exceptions from interface methods

### Testing Strategy
- MUST use mock implementations for unit tests
- MUST use real implementations for integration tests
- MUST reset state in test setup
- MUST test error scenarios

### Documentation
- MUST document interface contracts
- MUST specify error types for each method
- MUST include parameter descriptions
- MUST provide usage examples in tests
