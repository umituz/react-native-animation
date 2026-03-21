# Domain Utilities

Helper functions for cache key generation and development utilities.

## Overview

Utility functions for cache operations and development-only features. Located at `src/domain/utils/`.

## Strategies

### Cache Key Generation
- Use generateCacheKey() for single items
- Use generateListCacheKey() for collections
- Include version in cache keys
- Support key parsing and validation

### Key Format
- Follow consistent format: `cache:type:id:version`
- For lists: `cache:type:list:params:version`
- Use colon (`:`) as separator
- Enable pattern matching

### Development Utilities
- Use isDev() for environment detection
- Use devWarn/devError/devLog for dev-only logging
- Provide no-op functions in production
- Enable debug features without performance cost

### Key Validation
- Use isCacheKey() for validation
- Use parseCacheKey() for extraction
- Support type checking
- Enable safe key operations

## Restrictions

### Key Generation
- DO NOT generate keys manually
- DO NOT mix key formats
- DO NOT use inconsistent separators
- DO NOT omit version from keys

### Development Utilities
- DO NOT log in production (use dev functions)
- DO NOT include debug code in production builds
- DO NOT bypass isDev() checks
- DO NOT leave development code in production

### Key Parsing
- DO NOT parse keys with string methods
- DO NOT assume key format
- DO NOT skip validation
- DO NOT ignore parse errors

## Rules

### Key Generation Functions
- MUST provide generateCacheKey(type, id)
- MUST provide generateListCacheKey(type, params)
- MUST include version in generated keys
- MUST use consistent separator
- MUST validate input parameters

### Key Format
- MUST use format: `cache:{type}:{id}:v{version}`
- MUST use `:` as separator
- MUST include version prefix `v`
- MUST be parseable by parseCacheKey()
- MUST be unique across different entities

### Key Parsing
- MUST provide parseCacheKey() function
- MUST return structured data (type, id, version, isList)
- MUST handle invalid keys gracefully
- MUST return null for invalid format
- MUST extract parameters for list keys

### Key Validation
- MUST provide isCacheKey() function
- MUST validate format string
- MUST check for required parts
- MUST return boolean result
- MUST be used before parsing

### Development Functions
- MUST provide isDev() function
- MUST provide devWarn() for warnings
- MUST provide devError() for errors
- MUST provide devLog() for general logging
- MUST no-op in production

### Environment Detection
- MUST check __DEV__ or equivalent
- MUST return boolean for isDev()
- MUST be compile-time constant when possible
- MUST not have runtime overhead in production

### Logging Functions
- MUST only log in development mode
- MUST accept variable arguments
- MUST use console methods appropriately
- MUST not expose sensitive data

### TypeScript Types
- MUST provide ParsedCacheKey interface
- MUST specify function signatures
- MUST enable type inference
- MUST use generic types where appropriate

### Performance
- MUST not perform expensive operations in dev checks
- MUST provide no-op implementations in production
- MUST minimize bundle size impact
- MUST not include dev tools in production builds

### Export Rules
- MUST export all utility functions
- MUST organize exports by category
- MUST provide TypeScript types
- MUST document function behavior

### Testing Requirements
- MUST test key generation with various inputs
- MUST test key parsing with valid and invalid keys
- MUST test validation functions
- MUST test development mode detection
- MUST verify production no-op behavior
