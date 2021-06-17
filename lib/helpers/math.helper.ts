import ceil from 'lodash/ceil';
import round from 'lodash/round';
import divide from 'lodash/divide';

/**
 * Convert a number to it's rounded decimal form.
 *
 * @param {number} dividend
 * @param {number} divisor
 * @param {number} roundPrecision
 *
 * @returns {number}
 */
export const convertToRoundedDecimal = (
  dividend: number,
  divisor = 100,
  roundPrecision = 2,
): number => {
  return round(divide(dividend, divisor), roundPrecision);
};

/**
 * Converts Inches to Feet
 *
 * @param {number} value
 *
 * @returns {number} Retuns value in feet.
 */
export const inchesToFeet = (value: number): number =>
  ceil(0.0833333 * (value || 0), 3);

/**
 * Convert a value from a certain unit to feet.
 *
 * @param {number} value
 * @param {string} unit
 *
 * @returns {number} Retuns value in feet.
 */
export const convertToFeet = (value: number, unit: string): number => {
  switch (unit) {
    case 'in':
      return inchesToFeet(value);
    case 'ft':
    default:
      return value;
  }
};

/**
 * Returns volume calculated in a particular unit.
 *
 * @param {number} lengthValue
 * @param {string} lengthUnit
 * @param {number} widthValue
 * @param {string} widthUnit
 * @param {number} heightValue
 * @param {string} heightUnit
 *
 * @returns {number} Returns volume in a particular unit.
 */
export const calculateVolume = (
  lengthValue: number,
  lengthUnit: string,
  widthValue: number,
  widthUnit: string,
  heightValue: number,
  heightUnit: string,
  unit = 'ft',
): number => {
  switch (unit) {
    case 'ft':
    default:
      return (
        convertToFeet(lengthValue, lengthUnit) *
        convertToFeet(widthValue, widthUnit) *
        convertToFeet(heightValue, heightUnit)
      );
  }
};
