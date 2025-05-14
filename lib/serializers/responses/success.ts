import { HttpStatus } from '@nestjs/common';
import { SuccessResponse } from '../../interfaces/response';

/**
 * Success response entity used for serializing response data.
 *
 * @class
 *
 * @implements {SuccessResponse<T>}
 */
export class SuccessResponseEntity<T> implements SuccessResponse<T> {
  statusCode = HttpStatus.OK;
  success = true;
  data: T = {} as T;

  constructor(partial: Partial<SuccessResponseEntity<T>>) {
    Object.assign(this, partial);
  }
}
