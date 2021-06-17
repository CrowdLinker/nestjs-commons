import { Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * Middleware dealing with addition of queried entity to request.
 *
 * @class
 */
@Injectable()
export abstract class BaseMiddleware implements NestMiddleware {
  pathsToExclude = [];

  /**
   * Defined method used by Nest for mapping this middleware.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {any} next
   */
  async use(req: Request, res: Response, next: any) {
    if (!this.isExcludedPath(req)) {
      await this.run(req, res, next);
    } else {
      next();
    }
  }

  /**
   * Run middleware.
   *
   * @param {Request} req
   * @param {Response} res
   * @param {any} next
   *
   * @returns {Promise<boolean>}
   */
  async run(req: Request, res: Response, next: any): Promise<void> {
    return;
  }

  /**
   * Validate if the current path must be excluded
   * from running the find query for the entity.
   *
   * @param {Request} req
   *
   * @returns {boolean}
   */
  protected isExcludedPath(req: Request): boolean {
    return this.pathsToExclude.filter((pathToReduce) =>
      req.path.match(new RegExp(pathToReduce, 'i')),
    ).length
      ? true
      : false;
  }
}
