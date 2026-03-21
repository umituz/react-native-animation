# Value Objects

Type-safe storage key value objects for scoped data organization.

## Overview

Value objects for creating structured, type-safe storage keys with scoping. Located at `src/domain/value-objects/`.

## Strategies

### Key Organization
- Use factory functions for key creation
- Organize keys by scope (app, user, organization)
- Use consistent separator (`:`) throughout
- Enable type-safe key generation

### Scoping Strategy
- Use app scope for application-wide data
- Use user scope for user-specific data
- Use organization scope for organization data
- Create custom scopes for specific use cases

### Type Safety
- Use generic type parameters for section names
- Enable type inference for key structure
- Prevent key collisions through naming
- Support key pattern matching

### Key Formats
- Follow consistent format: `scope:id:section`
- Use descriptive section names
- Document key patterns in code comments
- Support pattern-based invalidation

## Restrictions

### Key Creation
- DO NOT create keys without factory functions
- DO NOT use dynamic strings as keys
- DO NOT mix different key scopes
- DO NOT create ambiguous key structures

### Key Formats
- DO NOT use inconsistent separators
- DO NOT use empty section names
- DO NOT use special characters in keys
- DO NOT create overly deep hierarchies

### Type Safety
- DO NOT use `any` for key sections
- DO NOT skip type parameters
- DO NOT cast keys to strings prematurely
- DO NOT mix different key types

## Rules

### Factory Functions
- MUST use createUserKey() for user data
- MUST use createAppKey() for app data
- MUST use createUserScopedKey() for user-scoped data
- MUST use createOrganizationScopedKey() for organization data
- MUST validate input parameters

### Key Format
- MUST use `:` as separator
- MUST follow pattern: `scope:identifier:section`
- MUST include all three parts
- MUST be descriptive and searchable
- MUST be consistent across codebase

### Type Safety
- MUST use generic type parameter for section names
- MUST provide type inference
- MUST enforce valid section names
- MUST support template literal types
- MUST prevent invalid combinations

### Key Usage
- MUST use with storage repository methods
- MUST maintain type safety through usage chain
- MUST support pattern-based operations
- MUST enable efficient key lookup

### Key Serialization
- MUST convert to string for storage operations
- MUST preserve structure information
- MUST support reverse transformation
- MUST handle special characters correctly

### Pattern Matching
- MUST support wildcard patterns for invalidation
- MUST use consistent separator in patterns
- MUST enable bulk operations
- MUST handle pattern edge cases

### Type Guards
- MUST provide isUserKey() guard
- MUST provide isAppKey() guard
- MUST provide isOrgKey() guard
- MUST use predicate return types
- MUST validate key structure

### Error Handling
- MUST validate key format
- MUST throw descriptive errors for invalid keys
- MUST include key in error context
- MUST handle edge cases gracefully

### Documentation
- MUST document key patterns
- MUST specify format for each scope
- MUST provide examples in comments
- MUST warn about common mistakes

### Testing Requirements
- MUST test key creation with valid inputs
- MUST test key validation with invalid inputs
- MUST test type guard behavior
- MUST test pattern matching
- MUST test serialization
