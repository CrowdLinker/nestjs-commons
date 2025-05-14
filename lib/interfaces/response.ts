/**
 * Redirect response variable type declaration.
 *
 * @interface
 */
export interface RedirectResponse {
  url?: string;
}

/**
 * Error response type declaration.
 *
 * @interface
 */
export interface ErrorResponse<T> {
  statusCode: number;
  error: T;
}

/**
 * Success response type declaration.
 *
 * @interface
 */
export interface SuccessResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
}
