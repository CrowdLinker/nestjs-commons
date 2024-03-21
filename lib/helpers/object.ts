import has from 'lodash/has';
import omit from 'lodash/omit';
import unset from 'lodash/unset';
import mapKeys from 'lodash/mapKeys';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import cloneDeep from 'lodash/cloneDeep';
import mapValues from 'lodash/mapValues';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

/**
 * Unsets object properties.
 *
 * @function
 *
 * @param {T} data
 * @param {string[]|number[]} keys
 * @param {boolean} shouldClone
 *
 * @returns {T} Returns data with removed properties.
 */
export const unsetObjectProperties = <T = any>(
  data: T,
  keys: string[] | number[] = [],
  shouldClone = true,
): Partial<T> => {
  if (!data || !keys.length || !isObject(data)) {
    return data;
  }

  const newData = shouldClone ? cloneDeep(data) : data;

  keys.forEach((key) => {
    if (has(newData, key)) {
      unset(newData, key);
    }
  });

  return omit(newData, keys);
};

/**
 * Maps keys deeply
 *
 * @param {T} data
 * @param {callback: (cbValue?: any, cbKey?: any) => any} callback
 *
 * @returns {T}
 */
export const mapKeysDeep = (
  data: any,
  callback: (cbValue?: any, cbKey?: any) => any,
): any => {
  if (!data || isArray(data) || !isObject(data)) {
    return data;
  }

  return mapValues(mapKeys(data, callback), (value) =>
    isObject(value) ? mapKeysDeep(value, callback) : value,
  );
};

/**
 * Maps values deeply
 *
 * @param {any} data
 * @param {callback: (cbValue?: any, cbKey?: any) => any} callback
 *
 * @returns {any}
 */
export const mapValuesDeep = (
  data: any,
  callback: (cbValue?: any, cbKey?: any) => any,
): any => {
  if (!data || isArray(data) || !isObject(data)) {
    return data;
  }

  return isObject(data)
    ? mapValues(data, (value) => mapValuesDeep(value, callback))
    : callback(data);
};

/**
 * Converts object keys from snake_case to camelCase
 *
 * @function
 *
 * @param {any} data
 *
 * @returns {any} Returns data with converted key.
 */
export const convertKeysFromSnakeToCamel = (data: any): any => {
  if (!data || isArray(data) || !isObject(data)) {
    return data;
  }

  return mapKeysDeep(data, (_, key) => camelCase(key));
};

/**
 * Converts object keys from camelCases to snake_case
 *
 * @function
 *
 * @param {any} data
 *
 * @returns {any} Returns data with converted key.
 */
export const convertKeysFromCamelToSnake = (data: any): any => {
  if (!data || isArray(data) || !isObject(data)) {
    return data;
  }

  return mapKeys(data, (_, key) => snakeCase(key));
};
