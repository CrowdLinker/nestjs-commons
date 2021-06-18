import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import { Request, Response } from 'express';
import { AppConfigServiceInterface } from '../../interfaces/config';

/**
 * Used for catching all exceptions.
 *
 * @class
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * App Config Service
   *
   * @private
   *
   * @var {AppConfigServiceInterface}
   */
  private appConfigService: AppConfigServiceInterface;

  /**
   * Create an instance of class.
   *
   * @param {AppConfigServiceInterface} appConfigService
   */
  constructor(appConfigService: AppConfigServiceInterface) {
    this.appConfigService = appConfigService;
  }

  /**
   * Catch and return app exceptions.
   *
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      success: false,
      data: this.transform(exception),
      timestamp: new Date().toISOString(),
      ...(this.appConfigService.env === 'development'
        ? {
            path: request.url,
            stack: exception.stack.split('\n    ').join(' '),
          }
        : {}),
    });
  }

  /**
   * Transform exception data
   *
   * @param {HttpException} exception
   */
  transform(exception: HttpException): any {
    let exceptionData: any = exception.getResponse();

    if (isString(exceptionData)) {
      exceptionData = { message: exceptionData };
    } else if (isObject(exceptionData)) {
      exceptionData = exceptionData as any;

      exceptionData = exceptionData.message
        ? {
            error: exceptionData.error || 'Unknown Error',
            message: exceptionData.message,
          }
        : exceptionData;
    }

    return exceptionData;
  }
}
