import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import mainRouter from './api/v1/modules/index.router';
import { httpStatusCode, messages } from './constants/common.constants';
import { globalErrorHandler } from './middlewares/globalErrorMiddleware';
import { sendResponse } from './utils/sendResponse';
import { loadSwaggerSpec } from './utils/swagger';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
const swaggerSpec = loadSwaggerSpec();
app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    message: 'Welcome to the API',
    statusCode: httpStatusCode.OK,
    success: true,
  });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', mainRouter);
app.use((req: Request, res: Response) => {
  sendResponse(res, {
    message: messages.INVALID_ROUTE_REQUESTED,
    statusCode: httpStatusCode.NOT_FOUND,
    success: false,
  });
});

app.use(globalErrorHandler);
export default app;
