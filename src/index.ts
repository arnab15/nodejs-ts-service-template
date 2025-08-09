import app from './app';
import { connectDB } from './config/database/mongo.connection';
import { AppError, errorHandler } from './error/AppError';
import logger from './logger';
import startBroker from './messageBrokers/brokers/startBroker';

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
  await connectDB();
  // await publishToPushChannel({
  //   data: {
  //     body: 'Hello World',
  //     title: 'Hello World',
  //     tokens: [
  //       'eMh33EF2TqO3tw4asWj0ZC:APA91bFwjpYvXo_C1s62wb6tviwt3vYMhQunM60MXSdZQfVbJN5DhxNBTpnhK5CYj-78h4JPzm7U9V-K4O9ezoMXQikYGkv_Ipwz3P7gWUAuCs9xQBoJDkA',
  //     ],
  //     data: {
  //       foo: 'bar',
  //       thumbnail_url:
  //         'https://fastly.picsum.photos/id/1014/200/300.jpg?hmac=nxBnyyuXuAKEA6yVxBtNN4YjpjaciQXA3KwTRICTlWU',
  //       image_url:
  //         'https://fastly.picsum.photos/id/1014/200/300.jpg?hmac=nxBnyyuXuAKEA6yVxBtNN4YjpjaciQXA3KwTRICTlWU',
  //     },
  //   },
  // });
  startBroker().catch((err) => {
    logger.error('❌ Failed to start broker', err);
    process.exit(1);
  });
  logger.info(`Server is Up On http://localhost:${PORT}`);
  logger.info(`API Docs: http://localhost:${PORT}/api-docs`);
});
