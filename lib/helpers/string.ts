import map from 'lodash/map';
import isString from 'lodash/isString';
import snakeCase from 'lodash/snakeCase';
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
