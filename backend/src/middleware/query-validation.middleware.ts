import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class QueryValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { limit, page } = req.query;

    if (limit && parseInt(limit as string) > 100) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Limit is greater than 100',
        error: 'Bad Request',
      });
    } else if (page && parseInt(page as string) < 0) {
      return res.status(400).send({
        statusCode: 400,
        message: 'Page is less than 0',
        error: 'Bad Request',
      });
    } else {
      next();
    }
  }
}
