import {
  PaginationOrder,
  PaginationQueryParamInterface,
} from '../interfaces/pagination.interface';
import { Pagination } from '../constants/pagination';
import { PipeTransform, Injectable } from '@nestjs/common';

/**
 * Pipe used for transforming incoming param data for pagination.
 *
 * @class
 *
 * @implements {PipeTransform<PaginationQueryParamInterface, any>}
 */
@Injectable()
export class PaginationPipe
  implements PipeTransform<PaginationQueryParamInterface, any> {
  /**
   * Transform query data and return transformed
   * object with keys required for pagination.
   *
   * @param {PaginationQueryParamInterface} queryParams
   *
   * @returns {PaginationQueryParamInterface}
   */
  transform(
    queryParams: PaginationQueryParamInterface,
  ): PaginationQueryParamInterface {
    const { page, limit, orderBy, order } = queryParams;

    return {
      page: Number.parseInt(page as string, 10) || Pagination.PAGE,
      limit: Number.parseInt(limit as string, 10) || Pagination.PER_PAGE,
      orderBy: orderBy || Pagination.ORDER_BY,
      order:
        order === PaginationOrder.asc ||
        order === PaginationOrder.desc ||
        order === PaginationOrder.asc.toLowerCase() ||
        order === PaginationOrder.desc.toLowerCase()
          ? order
          : Pagination.ORDER,
    };
  }
}
