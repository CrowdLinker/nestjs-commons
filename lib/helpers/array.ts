import get from 'lodash/get';

/**
 * Returns the values of mapped keys.
 *
 * @function
 *
 * @param {T[]} inputs
 * @param {string} key
 * @param {Function} callback
 *
 * @returns {any[]}
 */
export const mapKeyValues = <K, T = Record<string, unknown>>(
  inputs: T[],
  key: string,
  callback?: (value: K) => K,
): K[] => {
  return inputs
    .map((input) => {
      const value: K = get(input, key, null);

      return callback ? callback(value) : value;
    })
    .filter((value) => value);
};

/**
 * Runs async operations in a forEach loop
 *
 * @function
 *
 * @param {T[]} arr
 * @param {Function} fn
 *
 * @returns {any}
 */
export async function asyncForEach<T, K = any>(
  arr: T[],
  fn: (value: T, index: number, array: T[]) => K,
): Promise<K[]> {
  return await Promise.all(arr.map(fn));
}

/**
 * Min max range interval type declaration
 *
 * @interface
 */
export interface MinMaxRangeInterval {
  min: number;
  max: number;
}

/**
 * Creates a range interval with each object
 * containing min max according to step size.
 *
 * @param {number} minValue
 * @param {number} maxValue
 * @param {number} step
 *
 * @returns {MinMaxRangeInterval[]}
 */
export function createMinMaxRangeInterval(
  minValue: number,
  maxValue: number,
  step = 100,
): MinMaxRangeInterval[] {
  let count = 0;
  let currentValue = minValue;
  const minMaxRangeInterval: MinMaxRangeInterval[] = [];

  while (currentValue < maxValue) {
    const min = count ? currentValue + 1 : currentValue;

    currentValue = maxValue - currentValue > step ? min + step - 1 : maxValue;

    minMaxRangeInterval.push({
      min,
      max: currentValue,
    });

    count++;
  }

  return minMaxRangeInterval;
}
