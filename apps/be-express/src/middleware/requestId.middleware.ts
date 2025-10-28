import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';

export default function requestIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const requestId = (req.headers['x-request-id'] as string) ?? uuidV4();
  req.requestId = requestId;
  res.setHeader('x-request-id', requestId);
  next();
}
