import winston, { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { timestamp, combine, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const buildDevLogger = (): winston.Logger => {
  const isProduction = process.env.NODE_ENV === 'production';

  const loggerTransports: winston.transport[] = [
    new transports.Console({
      level: 'debug',
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
      stderrLevels: ['error'], // ensures error logs go to stderr
    }),
  ];

  if (isProduction) {
    loggerTransports.push(
      new DailyRotateFile({
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        zippedArchive: true,
        maxFiles: '15d',
      }),
      new DailyRotateFile({
        dirname: 'logs',
        filename: 'error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        zippedArchive: true,
        maxFiles: '15d',
      }),
    );
  }

  return createLogger({
    level: 'debug',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat,
    ),
    transports: loggerTransports,
    exceptionHandlers: isProduction
      ? [
          new DailyRotateFile({
            dirname: 'logs',
            filename: 'exceptions-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '15d',
          }),
        ]
      : [new transports.Console()],
    rejectionHandlers: isProduction
      ? [
          new DailyRotateFile({
            dirname: 'logs',
            filename: 'rejections-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxFiles: '15d',
          }),
        ]
      : [new transports.Console()],
  });
};

export default buildDevLogger;
