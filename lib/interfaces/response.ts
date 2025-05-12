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
export interface ErrorResponse<T extends any = any> {
  statusCode: number;
  error: T;
}

/**
 * Success response type declaration.
 *
 * @interface
 */
export interface SuccessResponse<T extends any = any> {
  statusCode: number;
  success: boolean;
  data: T;
}
