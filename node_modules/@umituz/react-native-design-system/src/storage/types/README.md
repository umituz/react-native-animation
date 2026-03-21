# Shared Types

TypeScript type definitions used across the storage package.

## Overview

This directory contains shared type definitions for storage operations, Result pattern, and utility types. Located at `src/types/`.

## Strategies

### Type Organization
- Define StorageResult for all storage operations
- Use DynamicStorageKey for type-safe key generation
- Create utility types for common transformations
- Export types for external package use

### Result Pattern
- Use discriminated union for success/failure states
- Include success flag for type narrowing
- Preserve error context in failure state
- Provide type guards for type safety

### Type Safety
- Use generic type parameters for flexibility
- Provide type inference where possible
- Use branded types for distinct primitives
- Implement conditional types for complex scenarios

### Type Guards
- Create type guards for runtime validation
- Use predicate functions for type narrowing
- Implement instanceof checks for error types
- Validate structure before type assertions

## Restrictions

### Type Definitions
- DO NOT use `any` type without compelling reason
- DO NOT create circular type dependencies
- DO NOT mix success/failure in same type
- DO NOT omit error context from Result types

### Type Safety
- DO NOT use type assertions without validation
- DO NOT assume optional properties exist
- DO NOT cast values without type guards
- DO NOT disable TypeScript rules

### Utility Types
- DO NOT create overly complex conditional types
- DO NOT use utility types where simple types suffice
- DO NOT create recursive types without clear purpose
- DO NOT mix different type utilities unnecessarily

## Rules

### StorageResult Type
- MUST use discriminated union with success flag
- MUST include data in success state
- MUST include error in failure state
- MUST provide type parameter for data

### Type Guards
- MUST return boolean for type predicates
- MUST use `is` keyword for type narrowing
- MUST validate all required properties
- MUST handle edge cases (null, undefined)

### Generic Types
- MUST provide descriptive type parameter names
- MUST constrain generics with extends where appropriate
- MUST provide default values for common cases
- MUST document generic constraints

### Utility Types
- MUST follow TypeScript conventions
- MUST use built-in utility types when possible
- MUST document custom utility types
- MUST test utility type behavior

### Import/Export
- MUST export types used by external packages
- MUST use `type` keyword for type-only imports
- MUST avoid value/type ambiguity
- MUST organize exports logically

### Type Inference
- MUST enable TypeScript strict mode
- MUST provide type annotations for public APIs
- MUST let TypeScript infer where possible
- MUST use `typeof` for capturing inferred types

### Documentation
- MUST document complex type transformations
- MUST provide examples for non-obvious types
- MUST explain generic constraints
- MUST warn about type limitations

### Testing
- MUST test type guards with various inputs
- MUST verify utility type behavior
- MUST test conditional type branches
- MUST validate type inference results
