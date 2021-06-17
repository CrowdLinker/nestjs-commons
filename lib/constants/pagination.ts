import {
  PaginationOrder,
  PaginationInterface,
} from '../interfaces/pagination.interface';

/**
 * Constants defining pagination variables.
 *
 * @constant
 */
export const Pagination: PaginationInterface = {
  PAGE: 1,
  PER_PAGE: 20,
  ORDER_BY: 'createdAt',
  ORDER: PaginationOrder.asc,
};
