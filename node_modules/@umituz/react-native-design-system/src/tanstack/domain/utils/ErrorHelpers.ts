/**
 * Error Helpers
 * Domain layer - Error handling utilities
 *
 * General-purpose error handling for TanStack Query
 */

/**
 * Check if error is a QueryError (from TanStack Query)
 */
export function isQueryError(error: unknown): boolean {
  return (
    error !== null &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

/**
 * Check if error is a MutationError (from TanStack Query)
 */
export function isMutationError(error: unknown): boolean {
  return isQueryError(error);
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (!isQueryError(error)) return false;

  const message = (error as { message: string }).message.toLowerCase();
  return (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection')
  );
}

/**
 * Check if error is an abort error
 */
export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError';
}

/**
 * Extract error message from error
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (isQueryError(error)) {
    return (error as { message: string }).message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unknown error occurred';
}

/**
 * Get user-friendly error message
 * Maps technical errors to user-friendly messages
 */
export function getUserFriendlyMessage(error: unknown): string {
  const message = getErrorMessage(error).toLowerCase();

  if (isNetworkError(error)) {
    return 'Network connection failed. Please check your internet connection.';
  }

  if (isAbortError(error)) {
    return 'Request was cancelled.';
  }

  if (message.includes('unauthorized') || message.includes('401')) {
    return 'You are not authorized to perform this action.';
  }

  if (message.includes('forbidden') || message.includes('403')) {
    return 'You do not have permission to access this resource.';
  }

  if (message.includes('not found') || message.includes('404')) {
    return 'The requested resource was not found.';
  }

  if (message.includes('validation') || message.includes('400')) {
    return 'Please check your input and try again.';
  }

  if (message.includes('server') || message.includes('500')) {
    return 'A server error occurred. Please try again later.';
  }

  if (message.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }

  return 'An error occurred. Please try again.';
}

/**
 * Parse error response (for API errors with structured data)
 */
export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export function parseErrorResponse(error: unknown): ErrorResponse | null {
  if (!isQueryError(error)) return null;

  const errorObj = error as { response?: { data?: ErrorResponse } };

  if (errorObj.response?.data) {
    return errorObj.response.data;
  }

  return null;
}

/**
 * Get validation errors from error response
 */
export function getValidationErrors(error: unknown): Record<string, string[]> | null {
  const response = parseErrorResponse(error);
  return response?.errors ?? null;
}

/**
 * Get error code from error response
 */
export function getErrorCode(error: unknown): string | null {
  const response = parseErrorResponse(error);
  return response?.code ?? null;
}

/**
 * Log error in development
 */
export function logError(context: string, error: unknown): void {
  if (__DEV__) {
    console.error(`[${context}]`, error);
  }
}
