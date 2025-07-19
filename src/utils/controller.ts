import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps all provided async route handlers with error handling
 */
export function controller<T extends Record<string, RequestHandler>>(handlers: T): T {
  const wrapped: Partial<T> = {};

  for (const key in handlers) {
    const handler = handlers[key];
    wrapped[key] = async function (req: Request, res: Response, next: NextFunction) {
      try {
        await handler(req, res, next);
      } catch (error) {
        next(error);
      }
    } as T[typeof key];
  }

  return wrapped as T;
}
