import has from 'lodash/has';
import omit from 'lodash/omit';
import unset from 'lodash/unset';
import isObject from 'lodash/isObject';
import cloneDeep from 'lodash/cloneDeep';

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
