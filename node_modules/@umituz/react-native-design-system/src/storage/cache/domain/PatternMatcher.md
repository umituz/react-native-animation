# Pattern Matcher

Pattern-based cache key matching for bulk operations.

## Overview

PatternMatcher provides wildcard-based cache key matching for efficient bulk invalidation and querying operations. Located at `src/cache/domain/PatternMatcher.ts`.

## Strategies

### Pattern Syntax
- Use `*` wildcard to match any characters (including empty)
- Use `:` as default separator for structured keys
- Support multiple wildcards in single pattern
- Enable regex-compatible patterns for advanced matching

### Performance Optimization
- Pre-compile frequently used patterns
- Cache regex objects for repeated use
- Use pattern indexing for large key sets
- Implement batch pattern matching for efficiency

### Bulk Operations
- Use patterns for invalidating multiple keys
- Filter keys by pattern for querying
- Extract parameters from matched keys
- Support hierarchical invalidation

### Pattern Organization
- Define pattern constants for reuse
- Document pattern purpose and structure
- Use consistent naming conventions
- Group related patterns together

## Restrictions

### Pattern Usage
- DO NOT use overly broad patterns (e.g., `*`)
- DO NOT mix different separators in same pattern
- DO NOT create ambiguous patterns
- DO NOT use patterns without documenting purpose

### Performance
- DO NOT compile same pattern repeatedly
- DO NOT iterate through all keys for pattern matching
- DO NOT use patterns for single-key operations
- DO NOT create complex regex patterns unnecessarily

### Pattern Design
- DO NOT use special regex characters without escaping
- DO NOT assume pattern separator is always `:`
- DO NOT create patterns that match unintended keys
- DO NOT use patterns for exact key matching

### Testing
- DO NOT skip testing edge cases (empty keys, special characters)
- DO NOT forget to test non-matching keys
- DO NOT assume pattern behavior without tests
- DO NOT use production data in pattern tests

## Rules

### Pattern Syntax
- MUST use `*` for wildcard matching
- MUST use `:` as default separator
- MUST support multiple wildcards per pattern
- MUST escape special regex characters in patterns

### Method Implementation
- MUST provide `convertPatternToRegex(pattern: string): RegExp`
- MUST provide `matchPattern(key: string, pattern: string): boolean`
- MUST provide `filterKeys(keys: string[], pattern: string): string[]`
- MUST handle empty pattern strings gracefully

### Pattern Conversion
- MUST escape special regex characters except `*`
- MUST replace `*` with `.*` regex equivalent
- MUST anchor pattern with `^` and `$`
- MUST return compiled RegExp object

### Matching Logic
- MUST use RegExp.test() for matching
- MUST handle empty key strings
- MUST return boolean for match results
- MUST be case-sensitive by default

### Filtering Operations
- MUST return array of matching keys
- MUST preserve input array order
- MUST handle empty input arrays
- MUST not modify input array

### Performance Optimization
- MUST cache compiled regex objects
- MUST provide method to clear pattern cache
- MUST use efficient iteration for large key sets
- MUST avoid redundant pattern compilation

### Error Handling
- MUST throw error for invalid patterns
- MUST handle null/undefined inputs gracefully
- MUST log pattern compilation errors
- MUST provide descriptive error messages

### Pattern Documentation
- MUST document all pattern constants
- MUST specify pattern structure and purpose
- MUST provide examples of matching keys
- MUST warn about performance implications

### Testing Requirements
- MUST test wildcard matching
- MUST test multiple wildcards
- MUST test non-matching keys
- MUST test edge cases (empty strings, special characters)
- MUST test pattern extraction

### Integration with Cache
- MUST work with Cache.invalidatePattern()
- MUST support bulk operations
- MUST handle non-existent keys gracefully
- MUST return count of invalidated keys
