import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { httpStatusCode } from '../constants/common.constants';
import { sendResponse } from '../utils/sendResponse';

const validateRequest = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const firstError = err.issues[0];
        const path = firstError.path
          .filter((p) => p !== 'body' && p !== 'query' && p !== 'params')
          .join('.');

        const message = path ? `${path} - ${firstError.message}` : firstError.message;

        return sendResponse(res, {
          success: false,
          statusCode: httpStatusCode.BAD_REQUEST,
          message,
          data: err.issues,
        });
      }

      return next(err);
    }
  };
};

export default validateRequest;
