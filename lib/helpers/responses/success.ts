import { HttpStatus } from '@nestjs/common';
import { SuccessResponseEntity } from '../../serializers/responses/success';

/**
 * Create success response and return a transformed response object.
 *
 * @function
 *
 * @param {any} data
 * @param {number} statusCode
 * @param {boolean} success
 *
 * @returns {SuccessResponseEntity}
 */
export const successResponse = (
  data: any,
  statusCode = HttpStatus.OK,
  success = true,
): SuccessResponseEntity => {
  return new SuccessResponseEntity({
    statusCode,
    success,
    data,
  });
};
