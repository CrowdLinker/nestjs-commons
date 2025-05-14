import { HttpStatus } from '@nestjs/common';
import { ErrorResponseEntity } from '../../serializers/responses/error';

/**
 * Create error response and return a transformed response object.
 *
 * @function
 *
 * @param {T} error
 * @param {number} statusCode
 *
 * @returns {ErrorResponseEntity<T>}
 */
export const errorResponse = <T>(
  error: T,
  statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
): ErrorResponseEntity<T> => {
  return new ErrorResponseEntity({
    statusCode,
    error,
  });
};
