import { HttpStatus } from '@nestjs/common';
import { SuccessResponseEntity } from '../../serializers/responses/success';

/**
 * Create success response and return a transformed response object.
 *
 * @function
 *
 * @param {T} data
 * @param {number} statusCode
 * @param {boolean} success
 *
 * @returns {SuccessResponseEntity<T>}
 */
export const successResponse = <T>(
  data: T,
  statusCode: number = HttpStatus.OK,
  success: boolean = true,
): SuccessResponseEntity<T> => {
  return new SuccessResponseEntity({
    statusCode,
    success,
    data,
  });
};
