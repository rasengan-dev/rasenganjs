import type { Request, Response, NextFunction } from 'express';
import { logGetRequest as log } from '../utils/log.js';

export const loggerMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const url = req.originalUrl;

  log(url);

  next();
};
