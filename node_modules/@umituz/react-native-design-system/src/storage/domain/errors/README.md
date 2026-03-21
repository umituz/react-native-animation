# Storage Errors

Error classes and error handling strategies for storage operations.

## Overview

Hierarchical error classes for storage operations with context preservation. Located at `src/domain/errors/`.

## Strategies

### Error Hierarchy
- Use StorageError as base class for all storage errors
- Create specific error types for different operations
- Preserve error context (key, operation, cause)
- Enable error type checking with instanceof

### Error Categories
- StorageReadError for read failures
- StorageWriteError for write failures
- StorageDeleteError for delete failures
- StorageSerializationError for serialization failures
- StorageDeserializationError for parsing failures

### Error Handling Strategy
- Use Result pattern instead of throwing exceptions
- Preserve original error as cause property
- Include error codes for programmatic handling
- Log errors with full context

### Error Recovery
- Implement retry logic for transient failures
- Provide fallback values for graceful degradation
- Clear corrupted data when appropriate
- Alert monitoring systems for critical errors

## Restrictions

### Error Creation
- DO NOT throw generic Error class
- DO NOT lose error context when wrapping
- DO NOT create error types without clear purpose
- DO NOT use strings for error codes

### Error Handling
- DO NOT catch and ignore errors silently
- DO NOT suppress error logging in production
- DO NOT retry indefinitely on persistent failures
- DO NOT expose sensitive data in error messages

### Error Types
- DO NOT mix different error categories
- DO NOT create circular error hierarchies
- DO NOT omit error code from custom errors
- DO NOT cause infinite error loops

## Rules

### Error Base Class
- MUST extend Error class
- MUST include code property (string)
- MUST preserve stack trace
- MUST accept cause parameter for wrapping
- MUST include message parameter

### Specific Error Types
- MUST extend StorageError base class
- MUST include key property for storage errors
- MUST include cause property when wrapping
- MUST use specific error codes
- MUST set appropriate error name

### Error Codes
- MUST use format: CATEGORY_ERROR (e.g., STORAGE_READ_ERROR)
- MUST be unique across error types
- MUST be descriptive and searchable
- MUST follow naming convention
- MUST be documented

### Error Context
- MUST include storage key in storage errors
- MUST include original operation type
- MUST attach cause error when wrapping
- MUST preserve stack trace
- MUST include timestamp for debugging

### Error Handling Patterns
- MUST use try-catch for all storage operations
- MUST check error types with instanceof
- MUST log errors with full context
- MUST provide error recovery where possible
- MUST not expose sensitive data

### Custom Error Creation
- MUST extend StorageError for custom errors
- MUST provide unique error code
- MUST include all required context
- MUST document error purpose
- MUST follow naming conventions

### Error Logging
- MUST log error code and message
- MUST log error context (key, operation)
- MUST log cause error if present
- MUST log stack trace in development
- MUST not log sensitive data

### Error Testing
- MUST test error creation
- MUST test error type checking
- MUST test error context preservation
- MUST test error logging
- MUST test error recovery logic

### Type Safety
- MUST use instanceof for type checking
- MUST use type guards where appropriate
- MUST enforce error codes as literal types
- MUST provide TypeScript types
- MUST not use `any` for error types

### Error Recovery
- MUST implement retry limits
- MUST provide fallback strategies
- MUST clear corrupted data when detected
- MUST alert on critical failures
- MUST document recovery behavior
