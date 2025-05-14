import { PaginatedData } from '../../interfaces/pagination';
import { PaginationResponseEntity } from '../../serializers/responses/pagination';

/**
 * Create success response and return a transformed response object.
 *
 * @function
 *
 * @param {PaginatedData<T>} paginatedData
 * @param {number} statusCode
 *
 * @returns {PaginationResponseEntity<T>}
 */
export const paginationResponse = <T>(
  paginatedData: PaginatedData<T>,
  statusCode: number = 200,
): PaginationResponseEntity<T> => {
  const { data, meta } = paginatedData;

  return new PaginationResponseEntity({
    statusCode,
    success: true,
    data,
    meta,
  });
};
