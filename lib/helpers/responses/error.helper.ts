import { ErrorResponseEntity } from '../../serializers/responses/error.serializer';

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
  statusCode = 200,
): ErrorResponseEntity => {
  return new ErrorResponseEntity({
    statusCode,
    error,
  });
};
