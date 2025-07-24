import { Response } from 'express';

import { ApiResponse } from '../types/ApiResponse';

export const sendResponse = (res: Response, responseData: ApiResponse): Response<unknown> => {
  return res.status(responseData.statusCode).send(responseData);
};
