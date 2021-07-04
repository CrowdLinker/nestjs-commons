import fs from 'fs';
import {
  FileErrors,
  CsvFileErrors,
  ImageFileErrors,
  CSV_EXTENSION,
  PDF_EXTENSION,
  CSV_MIME_TYPES,
  IMAGE_MIME_TYPES,
  IMAGE_EXTENSIONS,
} from '../constants/file';
import { extname } from 'path';
import { promisify } from 'util';
import { BadRequestException } from '@nestjs/common';
import { MulterFileFilter, UploadedFile } from '../interfaces/file';

/**
 * Check if a file exists at a given path.
 *
 * @param {string} path
 *
 * @returns {boolean}
 */
export const checkIfFileOrDirectoryExists = (path: string): boolean => {
  return fs.existsSync(path);
};

/**
 * Gets file data from a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} encoding
 *
 * @returns {Promise<Buffer>}
 */
export const getFile = async (
  path: string,
  encoding: string,
): Promise<string | Buffer> => {
  const readFile = promisify(fs.readFile);

  return encoding ? readFile(path, encoding) : readFile(path, {});
};

/**
 * Writes a file at a given path via a promise interface.
 *
 * @param {string} path
 * @param {string} fileName
 * @param {string} data
 *
 * @return {Promise<void>}
 */
export const createFile = async (
  path: string,
  fileName: string,
  data: string,
  append = false,
): Promise<void> => {
  if (!checkIfFileOrDirectoryExists(path)) {
    fs.mkdirSync(path);
  }

  const writeFile = append ? promisify(fs.appendFile) : promisify(fs.writeFile);

  return await writeFile(`${path}/${fileName}`, data, 'utf8');
};

/**
 * Delete file at the given path via a promise interface
 *
 * @param {string} path
 *
 * @returns {Promise<void>}
 */
export const deleteFile = async (path: string): Promise<void> => {
  const unlink = promisify(fs.unlink);

  return await unlink(path);
};

/**
 * Parses file properties and returns a unique filename for a given file
 * Callback API is defined by multer
 *
 * @param {any} req
 * @param {File} file
 * @param {(error: Error, filename: string) => void} callback
 *
 * @returns void
 */
export const multerFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, filename: string) => void,
) => {
  const name = file.originalname.split('.')[0];

  const fileExtension = extname(file.originalname);

  callback(null, `${name}-${new Date().toISOString()}${fileExtension}`);
};

/**
 * Multer filter filter (used for validating uploaded files).
 *
 * @param {any} req
 * @param {UploadedFile} file
 * @param {(error: Error | null, acceptFile: boolean) => void} cb
 *
 * @returns {void}
 */
export const multerFileFilter: MulterFileFilter = (
  req: any,
  file: UploadedFile,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (file.mimetype) {
    cb(null, true);
  } else {
    cb(null, false);

    return cb(new BadRequestException(FileErrors.INVALID_FORMAT), false);
  }
};

/**
 * Checks if the extension is '.csv'.
 *
 * @param {string} fileName
 *
 * @returns {boolean}
 */
export const isCSVExtension = (fileName: string): boolean =>
  CSV_EXTENSION === extname(fileName);

/**
 * Checks if the extension is '.pdf'.
 *
 * @param {string} fileName
 *
 * @returns {boolean}
 */
export const isPDFExtension = (fileName: string): boolean =>
  PDF_EXTENSION === extname(fileName);

/**
 * Checks if the extension belongs to an image.
 *
 * @param {string} fileName
 *
 * @returns {boolean}
 */
export const isImageExtension = (fileName: string): boolean =>
  IMAGE_EXTENSIONS.includes(extname(fileName));

/**
 * Checks if the 'mime-type' matches an actual csv mime type
 *
 * @param {string} mimeType
 *
 * @returns {boolean}
 */
export const isCSVMimeType = (mimeType: string): boolean =>
  CSV_MIME_TYPES.includes(mimeType);

/**
 * Checks if the 'mime-type' matches an actual image mime type
 *
 * @param {string} mimeType
 *
 * @returns {boolean}
 */
export const isImageMimeType = (mimeType: string): boolean =>
  IMAGE_MIME_TYPES.includes(mimeType);

/**
 * Multer filter filter for csv files (used for validating uploaded files).
 *
 * @param {any} req
 * @param {UploadedFile} file
 * @param {(error: Error | null, acceptFile: boolean) => void} cb
 *
 * @returns {void}
 */
export const multerCsvFileFilter: MulterFileFilter = (
  req: any,
  file: UploadedFile,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  // Not validating mime type here since CSV is a text based format
  // & file type validation can only be done via parsing.
  // Note: This was also done to handle file type issues when uploading
  // "text/csv" file on Windows OS but received mime type was empty or invalid.
  // You can read more about it here:
  // https://github.com/sindresorhus/file-type/issues/264#issuecomment-568439196
  // Multer 2.x might resolve this, but the package is in beta at the moment.
  // You can read more about it here:
  // https://github.com/expressjs/multer/issues/555
  const { mimetype, originalname } = file;

  if (mimetype && mimetype.length && isCSVMimeType(mimetype)) {
    cb(null, true);
  } else if (isCSVExtension(originalname)) {
    cb(null, true);
  } else {
    cb(null, false);

    return cb(new BadRequestException(CsvFileErrors.INVALID_FORMAT), false);
  }
};

/**
 * Multer filter filter for image files (used for validating uploaded files).
 *
 * @param {any} req
 * @param {UploadedFile} file
 * @param {(error: Error | null, acceptFile: boolean) => void} cb
 *
 * @returns {void}
 */
export const multerImageFileFilter: MulterFileFilter = (
  req: any,
  file: UploadedFile,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  const { mimetype, originalname } = file;

  if (mimetype && mimetype.length && isImageMimeType(mimetype)) {
    cb(null, true);
  } else if (isImageExtension(originalname)) {
    cb(null, true);
  } else {
    cb(null, false);

    return cb(new BadRequestException(ImageFileErrors.INVALID_FORMAT), false);
  }
};
