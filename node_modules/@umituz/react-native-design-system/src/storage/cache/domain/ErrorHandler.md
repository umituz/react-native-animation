# Cache Error Handler

Centralized error handling for cache operations with recovery and monitoring.

## Overview

ErrorHandler provides unified error handling for cache operations with logging, recovery, and alerting capabilities. Located at `src/cache/domain/ErrorHandler.ts`.

## Strategies

### Error Handling Strategy
- Use silent failure for non-critical cache operations
- Implement retry logic for transient failures
- Provide fallback values for degraded operation
- Use graceful degradation when cache fails

### Recovery Strategy
- Implement auto-recovery for corrupted cache data
- Clear and rebuild cache on unrecoverable errors
- Use fallback storage mechanism when primary fails
- Implement circuit breaker pattern for repeated failures

### Monitoring Strategy
- Track error counts by error type
- Aggregate recent errors for pattern analysis
- Alert on error threshold exceeded
- Log errors with context for debugging

## Restrictions

### Error Handling
- DO NOT silently swallow all errors
- DO NOT throw errors from error handlers (recursive)
- DO NOT block application on cache errors
- DO NOT retry indefinitely on persistent failures

### Error Reporting
- DO NOT log sensitive data in error messages
- DO NOT include full stack traces in production logs
- DO NOT send errors to remote services without rate limiting
- DO NOT overwhelm logging with duplicate errors

### Recovery Attempts
- DO NOT attempt recovery more than configured retry limit
- DO NOT clear cache without logging reason
- DO NOT fall back to insecure storage mechanisms
- DO NOT continue operations after critical failures

## Rules

### Error Creation
- MUST use `CacheError` class for all cache errors
- MUST include descriptive error message
- MUST specify error code from standard codes
- MUST attach cause error when wrapping exceptions

### Error Codes
- MUST use `CACHE_ERROR` for generic cache errors
- MUST use `CACHE_FULL` when cache at capacity
- MUST use `CACHE_INVALID_KEY` for invalid keys
- MUST use `CACHE_EXPIRED` for expiration errors
- MUST use `CACHE_SERIALIZATION` for serialization failures
- MUST use `CACHE_DESERIALIZATION` for deserialization failures

### Error Handling
- MUST call `ErrorHandler.handle()` for all caught errors
- MUST include context information when available
- MUST log errors before recovery attempts
- MUST not throw from error handlers

### Error Logging
- MUST log error code and message
- MUST log operation context (get/set/delete)
- MUST log cache name when applicable
- MUST log cause error if present

### Error Recovery
- MUST implement maximum retry limit
- MUST log recovery attempts
- MUST fall back to safe state on failure
- MUST notify monitoring after recovery

### Error Tracking
- MUST increment error counter for each error type
- MUST alert when error count exceeds threshold
- MUST reset counters after alert or periodically
- MUST aggregate recent errors for analysis

### Context Enrichment
- MUST include operation type in error context
- MUST include cache key when applicable
- MUST include cache name for multi-cache scenarios
- MUST include timestamp for error correlation

### Testing
- MUST test error handling with mock errors
- MUST test recovery logic with failure scenarios
- MUST test error tracking with repeated errors
- MUST test logging output format
