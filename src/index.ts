import app from './app';
import { AppError, errorHandler } from './error/AppError';
import logger from './logger';

// eslint-disable-next-line no-magic-numbers
const PORT = process.env.PORT ?? 3000;
process.on('unhandledRejection', (reason: Error) => {
  logger.error(reason);
  throw reason;
});

process.on('uncaughtException', (error: AppError) => {
  void errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});
app.listen(PORT, async () => {
  logger.info(`Server is Up On http://localhost:${PORT}`);
  logger.info(`API Docs: http://localhost:${PORT}/api-docs`);
});
