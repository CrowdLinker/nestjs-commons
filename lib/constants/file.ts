// File Mime Types
export const IMAGE_MIME_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
  'image/gif',
];
export const PDF_MIME_TYPES = ['application/pdf'];
export const CSV_MIME_TYPES = ['text/csv', 'application/vnd.ms-excel'];

// File Extensions
export const CSV_EXTENSION = '.csv';
export const PDF_EXTENSION = '.pdf';

// Image Extensions
export const PNG_EXTENSION = '.png';
export const JPG_EXTENSION = '.jpg';
export const JPEG_EXTENSION = '.jpeg';
export const JPG_EXTENSIONS = ['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp'];
export const SVG_EXTENSION = '.svg';
export const WEBP_EXTENSION = '.webp';
export const GIF_EXTENSION = '.gif';
export const IMAGE_EXTENSIONS = [
  ...JPG_EXTENSIONS,
  PNG_EXTENSION,
  SVG_EXTENSION,
  WEBP_EXTENSION,
  GIF_EXTENSION,
];

// File Errros
export const FileErrors = {
  INVALID_FORMAT: 'The file format is invalid!',
  EMPTY: 'The uploaded file does not contain any data.',
  INVALID_FORMAT_PDF: `The file format is invalid! Only "${PDF_EXTENSION}" files are allowed!'`,
};
export const CsvFileErrors = {
  ...FileErrors,
  MISSING_REQUIRED_COLUMNS: 'The uploaded file is missing required column(s).',
  INVALID_FORMAT: `The file format is invalid! Only "${CSV_EXTENSION}" files are allowed!'`,
};
export const PdfFileErrors = {
  ...FileErrors,
  INVALID_FORMAT: `The file format is invalid! Only "${PDF_EXTENSION}" files are allowed!'`,
};
export const ImageFileErrors = {
  INVALID_FORMAT: 'The image format is invalid!',
  EMPTY: 'The image file does not contain any data.',
  INVALID_FORMAT_IMAGE: `The file format is invalid! Only images are allowed!'`,
};
