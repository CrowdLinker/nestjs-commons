/**
 * Uploaded file variable type declaration.
 *
 * @interface
 */
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  buffer?: Buffer;
}

// Taken from @nestjs/platform-express/multer/interfaces/multer-options.interface.d.ts
export type MulterFileFilter = (
  req: any,
  file: UploadedFile,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => void;
