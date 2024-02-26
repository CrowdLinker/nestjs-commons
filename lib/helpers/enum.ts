import sample from 'lodash/sample';

/**
 * Picks a random enum value.
 *
 * @see https://stackoverflow.com/a/60802894
 *
 * @param {T} enumeration
 *
 * @returns {T}
 */
export function randomFromEnum<T>(
  enumeration: { [s: string]: T } | ArrayLike<T>,
): T {
  return sample(Object.values(enumeration)) as T;
}
