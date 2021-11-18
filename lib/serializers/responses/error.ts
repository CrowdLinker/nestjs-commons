import { HttpStatus } from '@nestjs/common';

/**
 * Success response type declaration.
 *
 * @interface
 */
interface ErrorResponse {
  statusCode: number;
  error: any;
}

/**
 * Error response entity used for serializing response data.
 *
 * @class
 *
 * @implements {ErrorResponse}
 */
export class ErrorResponseEntity implements ErrorResponse {
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  error: any = {};

  constructor(partial: Partial<ErrorResponseEntity>) {
    Object.assign(this, partial);
  }
}
