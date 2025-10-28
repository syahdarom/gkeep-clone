import { ErrorHttpResponse } from '@/model/http';
import logger from '@/util/logger';
import type { NextFunction, Request, Response } from 'express';

export default function errorHandlerMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error({
    requestId: req.requestId,
    message: err,
    logOrigin: {
      type: 'middleware',
      name: 'errorHandler',
    },
  });

  res.status(500).json(
    new ErrorHttpResponse(500, {
      message: 'Something went wrong',
    }),
  );
}
