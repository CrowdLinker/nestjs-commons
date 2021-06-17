/**
 * Stringifies a JSON object for logging.
 *
 * @param {any} value
 * @param {boolean} prettify
 *
 * @returns {string}
 */
export const logJSON = (value: any, prettify = true): string =>
  prettify ? JSON.stringify(value, null, 2) : JSON.stringify(value);

/**
 * Returns the message with log lines.
 *
 * @param {string} message
 *
 * @returns {string}
 */
export const logLine = (message: string): string =>
  `------------------- ${message} -------------------`;
