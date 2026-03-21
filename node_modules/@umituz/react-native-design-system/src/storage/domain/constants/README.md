# Domain Constants

Time constants and default values for storage and cache operations.

## Overview

Constant values for time-based calculations and default configuration. Located at `src/domain/constants/`.

## Strategies

### Time Constants
- Use TIME_MS for all time-based calculations
- Provide constants for common time units
- Enable readable time calculations
- Support time arithmetic

### Default Values
- Use DEFAULT_TTL for standard cache lifetime
- Set sensible defaults for common use cases
- Document default value rationale
- Allow override for specific needs

### Version Management
- Use CACHE_VERSION for cache key versioning
- Increment version on breaking changes
- Support migration between versions
- Include version in cache keys

## Restrictions

### Time Calculations
- DO NOT use hardcoded millisecond values
- DO NOT calculate time values inline
- DO NOT mix time units (seconds vs milliseconds)
- DO NOT use magic numbers for time

### Constants
- DO NOT redefine TIME_MS values elsewhere
- DO NOT modify constants at runtime
- DO NOT use deprecated constants
- DO NOT create duplicate constants

### Version Management
- DO NOT skip version numbers
- DO NOT reuse old versions
- DO NOT forget to update CACHE_VERSION
- DO NOT change version format

## Rules

### TIME_MS Constants
- MUST provide SECOND (1000ms)
- MUST provide MINUTE (60000ms)
- MUST provide HOUR (3600000ms)
- MUST provide DAY (86400000ms)
- MUST provide WEEK (604800000ms)
- MUST be in milliseconds

### DEFAULT_TTL
- MUST be set to 300000 (5 minutes)
- MUST be used for cache when no TTL specified
- MUST balance freshness and performance
- MUST be documented

### CACHE_VERSION
- MUST be integer value
- MUST start at 1
- MUST increment on breaking changes
- MUST be included in cache keys

### Constant Usage
- MUST use TIME_MS for all time calculations
- MUST use DEFAULT_TTL for default cache lifetime
- MUST use CACHE_VERSION for versioning
- MUST not calculate values inline

### Time Arithmetic
- MUST use TIME_MS constants for calculations
- MUST support multiplication for extended periods
- MUST be readable and maintainable
- MUST avoid magic numbers

### Version Control
- MUST increment CACHE_VERSION on schema changes
- MUST implement migration for old versions
- MUST document breaking changes

### Export Rules
- MUST export all constants
- MUST use const for immutability
- MUST organize constants by purpose
- MUST provide TypeScript types

### Documentation
- MUST document time units clearly
- MUST specify values in milliseconds
- MUST explain default value choices
- MUST warn about common mistakes

### Testing Requirements
- MUST test time constant values
- MUST verify version increment logic
- MUST test migration between versions
- MUST validate default TTL usage
