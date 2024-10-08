/**
 * Default image upload size
 *
 * @constant
 */
export const DEFAULT_IMAGE_UPLOAD_SIZE = 5_242_880; // 5 MB


/**
 * Constant defining file sizes
 *
 * @constant
 */
export const FILE_SIZE = {
    KB: {
        THREE: 3072,
        FIVE: 5120,
        TEN: 10240,
    },
    MB: {
        THREE: 3_145_728,
        FIVE: 5_242_880,
        TEN: 10_485_760,
    }
}

/**
 * Constant defining the regex to validate file
 */
export const VALID_FILE_NAME_REGEX =
  /^[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)?$/;
