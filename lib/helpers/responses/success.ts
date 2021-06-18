import { SuccessResponseEntity } from '../../serializers/responses/success';

/**
 * Create success response and return a transformed response object.
 *
 * @function
 *
 * @param {any} data
 * @param {number} statusCode
 *
 * @returns {SuccessResponseEntity}
 */
export const successResponse = (
  data: any,
  statusCode = 200,
): SuccessResponseEntity => {
  return new SuccessResponseEntity({
    statusCode,
    success: true,
    data,
  });
};
