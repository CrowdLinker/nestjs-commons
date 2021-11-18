import { HttpStatus } from '@nestjs/common';
import { ErrorResponseEntity } from '../../serializers/responses/error';

/**
 * Create error response and return a transformed response object.
 *
 * @function
 *
 * @param {any} data
 * @param {number} statusCode
 *
 * @returns {ErrorResponseEntity}
 */
export const errorResponse = (
  error: any,
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
): ErrorResponseEntity => {
  return new ErrorResponseEntity({
    statusCode,
    error,
  });
};
