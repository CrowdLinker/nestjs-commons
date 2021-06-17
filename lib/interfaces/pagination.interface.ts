import { InputInterface } from './inputs.interface';

/**
 * Enumerations defining variables in pagination interfaces.
 *
 * @enum
 */
export enum PaginationOrder {
  asc = 'ASC',
  desc = 'DESC',
}

/**
 * Pagination constants type declaration.
 *
 * @interface
 */
export interface PaginationInterface {
  PAGE: number;
  PER_PAGE: number;
  ORDER_BY: string;
  ORDER: PaginationOrder;
}

/**
 * Pagination query params variables type declaration.
 *
 * @interface
 */
export interface PaginationQueryParamInterface extends InputInterface {
  page: string | number; // Incoming: string, Outgoing: number
  limit: string | number; // Incoming: string, Outgoing: number
  orderBy: string;
  order: PaginationOrder;
}

/**
 * Paginated data type declaration.
 *
 * @interface
 */
export interface PaginatedData<T = any> {
  data: T[];
  meta: PaginatedMetaData;
}

/**
 * Paginated meta data type declaration.
 *
 * @interface
 */
export interface PaginatedMetaData {
  data: {
    total: number;
  };
  pagination: {
    last: number;
    current: number;
    perPage: number;
  };
  sorting: {
    order: PaginationOrder;
    by: string;
  };
}
