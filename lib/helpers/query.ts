import map from 'lodash/map';
import {
  SearchQuery,
  StringQuery,
  FindOperator as FindOperatorInterface,
} from '../interfaces/query';
import { Dayjs } from 'dayjs';
import {
  PaginatedData,
  PaginationQueryParamInterface,
} from '../interfaces/pagination';
import flatMap from 'lodash/flatMap';
import { isUUID } from 'class-validator';
import { classToPlain } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { SelectQueryBuilder, FindOperator, Raw } from 'typeorm';

/**
 * Returns if an object id is a valid postgres uuid.
 *
 * @function
 *
 * @param {string} input
 * @param {boolean} throw
 * @param {string} message
 *
 * @returns {boolean}
 *
 * @throws {NotFoundException}
 */
export const validatePostgresUUID = (
  id: string,
  throws = true,
  message = 'Invalid UUID',
): boolean => {
  const isValid = isUUID(id);

  if (!isValid && throws) {
    throw new NotFoundException(message);
  }

  return isValid;
};

/**
 * Converts queried inputs into a string based query object
 * to run queries in a string based format.
 *
 * For eg: This will convert the following object:
 *
 * ```
 * {
 *   id: In([1])
 * }
 * ```
 *
 * to
 *
 * ```
 * {
 *   query: "id IN (:param0)",
 *   value: [1],
 * }
 * ```
 *
 * Note: Works with nested objects as well.
 * Also, "lastIndex" is an object because count value
 * needs to be passed in as reference argument and not value
 * to the recursively called functions.
 *
 * @function
 *
 * @param {SearchQuery<any>} queriedInputs
 * @param {null|string} parentKey
 * @param {boolean} flatten
 * @param {{count: number}} lastIndex
 *
 * @returns {StringQuery[]}
 */
export const convertQueriedInputsToStringBasedQueries = (
  queriedInputs: SearchQuery<any>,
  parentKey: null | string = null,
  flatten = true,
  lastIndex: { count: number } = { count: 0 },
): StringQuery[] => {
  const queriedInputsKeys = Object.keys(queriedInputs);

  // Maps through a query input to convert it
  // into a string based query.
  const convertor = (
    queriedInputsKey: string,
    index: number,
  ): StringQuery | StringQuery[] => {
    const queriedInput = queriedInputs[queriedInputsKey];

    // Checks if "queriedInput" is not an object/array and has reached its final find term.
    // If not, then recursively run the function until the last object.
    if (queriedInput.constructor.name !== 'FindOperator') {
      return convertQueriedInputsToStringBasedQueries(
        queriedInput as SearchQuery<any>,
        queriedInputsKey,
        Object.keys(queriedInput).length > 1 ? false : true,
        lastIndex, // Helps in keeping track of "paramIndex" in the loop.
      );
    }
    // If yes, convert it a "StringQuery" type object.
    else {
      const operatorData = classToPlain(
        queriedInput as FindOperator<any>,
      ) as FindOperatorInterface;

      let currentKey = queriedInputsKey;

      if (parentKey) {
        currentKey = `${parentKey}.${currentKey}`;
      }

      let keyword = '=';
      let valueType = ` :param${lastIndex.count}`;

      // Using "between", "not", "brackets" might not be possible with this.
      switch (operatorData._type) {
        case 'in':
          keyword = 'IN';
          valueType = ` (:...param${lastIndex.count})`;
          break;
        case 'like':
          keyword = 'LIKE';
          break;
        case 'ilike':
          keyword = 'ILIKE';
          break;
        case 'moreThan':
          keyword = '>';
          break;
        case 'moreThanOrEqual':
          keyword = '>=';
          break;
        case 'lessThan':
          keyword = '<';
          break;
        case 'lessThanOrEqual':
          keyword = '<=';
          break;
        case 'any':
          keyword = 'ANY';
          valueType = `(:param${lastIndex.count})`;
          break;
        case 'isNull':
          keyword = 'IS NULL';
          valueType = '';
          break;
      }

      lastIndex.count++;

      return {
        query: `${currentKey} ${keyword}${valueType}`,
        paramIndex: lastIndex.count - 1, // Because of line 130.
        value: operatorData._value,
      } as StringQuery;
    }
  };

  // If in array, don't flatten, else flatten.
  // See line 101.
  return flatten
    ? (flatMap(queriedInputsKeys, convertor) as StringQuery[])
    : (map(queriedInputsKeys, convertor) as StringQuery[]);
};

/**
 * Generates a query builder that runs queries in a string
 * based format so its easier for TypeOrm to run queries
 * inside relational tables.
 *
 * @function
 *
 * @param {SelectQueryBuilder<T>} qb
 * @param {SearchQuery<any>} queriedInputs
 *
 * @returns {SelectQueryBuilder<T>}
 */
export const generateRelationalSearchQueryBuilder = <T>(
  qb: SelectQueryBuilder<T>,
  queriedInputs: SearchQuery<any>,
): SelectQueryBuilder<T> => {
  let newQueryBuilder: SelectQueryBuilder<T> = qb;

  // Get string based queries.
  const convertedQueries =
    convertQueriedInputsToStringBasedQueries(queriedInputs);

  // Add queries to query builder.
  convertedQueries.forEach((convertedQuery) => {
    const type = Array.isArray(convertedQuery) ? 'or' : 'and';
    const { query, value, paramIndex } = Array.isArray(convertedQuery)
      ? convertedQuery[0]
      : convertedQuery;

    switch (type) {
      case 'or':
        newQueryBuilder = qb.orWhere(query, { [`param${paramIndex}`]: value });

        break;
      case 'and':
        newQueryBuilder = qb.andWhere(query, { [`param${paramIndex}`]: value });

        break;
    }
  });

  return newQueryBuilder;
};

/**
 * Retuns an object matching the structure for paginated results.
 *
 * @param {any[]} result
 * @param {number} count
 * @param {PaginationQueryParamInterface} paginationParams
 *
 * @returns {PaginatedData}
 */
export const generatePaginatedResult = (
  data: any[],
  count: number,
  paginationParams: PaginationQueryParamInterface,
): PaginatedData => {
  const { page, limit, orderBy, order } = paginationParams;

  return {
    data,
    meta: {
      data: {
        total: count,
      },
      pagination: {
        last: Math.ceil(count / (limit as number)) || 1,
        current: page as number,
        perPage: limit as number,
      },
      sorting: {
        order,
        by: orderBy,
      },
    },
  } as PaginatedData;
};

/**
 * Creates a between query for a start & end date.
 *
 * @param {Date|Dayjs} startDate
 * @param {Date|Dayjs} endDate
 *
 * @returns {FindOperator<any>}
 */
export const convertDateToRawBetween = (
  startDate: Date | Dayjs,
  endDate: Date | Dayjs,
): FindOperator<any> =>
  Raw(
    (columnName) =>
      `${columnName} >= '${startDate.toISOString()}' AND ${columnName} <= '${endDate.toISOString()}'`,
  );
