import map from 'lodash/map';
import keys from 'lodash/keys';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import snakeCase from 'lodash/snakeCase';
import sampleSize from 'lodash/sampleSize';
import { default as lodashIsNull } from 'lodash/isNull';

/**
 * Uppercase the first character in a string.
 *
 * @function
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const ucFirst = (input: string): string => {
  return input.charAt(0).toUpperCase() + input.slice(1);
};

/**
 * Uppercase the first character in words of a string.
 *
 * @function
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const getWords = (input: string): string[] => {
  return isString(input) ? snakeCase(input).split('_') : [];
};

/**
 * Uppercase the first character in words of a string.
 *
 * @function
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const ucWords = (input: string): string => {
  return map(getWords(input), ucFirst).join(' ');
};

/**
 * Converts string to sentence case.
 *
 * @function
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const sentenceCase = (input: string): string => {
  return ucFirst(getWords(input).join(' ').toLowerCase());
};

/**
 * Converts string to lowercase.
 *
 * @function
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const toLowerCase = (input: string): string => {
  return isString(input) ? input.toLowerCase() : input;
};

/**
 * Joins strings with a symbol.
 *
 * @function
 *
 * @param {string} joinSymbol
 * @param {string[]} strings
 *
 * @returns {string}
 */
export const join = (joinSymbol: string, ...strings: string[]): string => {
  return strings.join(joinSymbol);
};

/**
 * Validates if a string value is null.
 *
 * @param {string} input
 *
 * @returns {boolean}
 */
export const isNull = (input: string): boolean => {
  return lodashIsNull(input) ? true : input === 'null' ? true : false;
};

/**
 * Removing trailing spaces from a multi line string.
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const removeTrailingSpaces = (input: string): string => {
  return input
    .split(/\r?\n/)
    .map((c) => (!c.length ? '\n' : c.trim()))
    .map((c) => (c.indexOf(':') > 1 ? `${c} ` : c))
    .join('');
};

/**
 * Trims email string and converts to lower case.
 *
 * @param {string} input
 *
 * @returns {string}
 */
export const convertToEmailString = (input: string): string => {
  return trim(input).toLowerCase();
};

/**
 * Generates a random code of max 10 characters.
 *
 * @see https://stackoverflow.com/a/17484158/2528625
 *
 * @param {number} length
 *
 * @returns {string}
 */
export const createNumericCode = (length = 10): string => {
  return sampleSize('1234567890', length).join('');
};

/**
 * Add query params to url string
 *
 * @param {string} url
 * @param {Record<string,string>} queryParams
 *
 * @returns {string}
 */
export const addQueryParamsToUrl = (
  url: string,
  queryParams: Record<string, string>,
): string => {
  if (isEmpty(queryParams)) {
    return url;
  }

  const queryStringElements: string[] = [];
  keys(queryParams).map((paramName) => {
    queryStringElements.push(`${paramName}=${queryParams[paramName]}`);
  });

  return `${url}&${queryStringElements.join('&')}`;
};

/**
 * Converts a number to a numeric string
 *
 * @param {number} value
 * @param {number} precision
 *
 * @returns {string}
 */
export const toNumericString = (
  value: string | number,
  precision = 2,
): string => {
  return Number(value).toFixed(precision);
};

/**
 * If data can be parsed using JSON.parse, return the parsed data.
 * Otherwise, return the original data.
 *
 * @param {any} data
 *
 * @returns {any}
 */
export const parseJSONString = (data: any): any => {
  try {
    const parsedData = JSON.parse(data);

    if (parsedData && isObject(parsedData)) {
      return parsedData;
    }
  } catch (e) {
    return data;
  }

  return data;
};
