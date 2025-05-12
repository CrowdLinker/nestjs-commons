import { HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '../../interfaces/response';

/**
 * Error response entity used for serializing response data.
 *
 * @class
 *
 * @implements {ErrorResponse<T>}
 */
export class ErrorResponseEntity<T extends any = any>
  implements ErrorResponse<T>
{
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  error: T = {} as T;

  constructor(partial: Partial<ErrorResponseEntity<T>>) {
    Object.assign(this, partial);
  }
}
