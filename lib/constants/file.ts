export const CSV_MIME_TYPES = ['text/csv', 'application/vnd.ms-excel'];
export const CSV_EXTENSION = '.csv';

export const FileErrors = {
  INVALID_FORMAT: 'The file format is invalid!',
  EMPTY: 'The uploaded file does not contain any data.',
  MISSING_REQUIRED_COLUMNS: 'The uploaded file is missing required column(s).',
  INVALID_FORMAT_CSV: `The file format is invalid! Only "${CSV_EXTENSION}" files are allowed!'`,
};
