import { FindOperator as TypeOrmFindOperator, ObjectLiteral } from 'typeorm';

/**
 * Query type variable type declaration.
 *
 * @enum
 */
export enum QueryType {
  or = 'or',
  and = 'and',
}

/**
 * Search query variable type declaration.
 *
 * @interface
 */
export interface SearchQuery<T> extends ObjectLiteral {
  [key: string]: any | TypeOrmFindOperator<T> | SearchQuery<T>;
}

/**
 * Find operator variable type declaration (Copy of TypeORM FindOperator class).
 *
 * @interface
 */
export interface FindOperator {
  _type: string;
  _value: any;
  _useParameters: boolean;
  _multipleParameters: boolean;
}

/**
 * String query variable type declaration.
 *
 * @interface
 */
export interface StringQuery {
  query: string;
  value: any;
  paramIndex: number;
}
