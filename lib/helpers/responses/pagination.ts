import { PaginatedData } from '../../interfaces/pagination';
import { PaginationResponseEntity } from '../../serializers/responses/pagination';

/**
 * Create success response and return a transformed response object.
 *
 * @function
 *
 * @param {any} data
 * @param {number} statusCode
 *
 * @returns {PaginationResponseEntity}
 */
export const paginationResponse = (
  paginatedData: PaginatedData,
  statusCode = 200,
): PaginationResponseEntity => {
  const { data, meta } = paginatedData;

  return new PaginationResponseEntity({
    statusCode,
    success: true,
    data,
    meta,
  });
};
