import dotenv from 'dotenv';
import mongoose from 'mongoose';

import logger from '../../logger';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
  logger.error('MONGO_URI is not defined in the environment variables');
  throw new Error('MONGO_URI is not defined in the environment variables');
}

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    logger.info('MongoDB connected successfully');
    mongoose.connection.on('disconnected', function () {
      logger.warn('Mongoose default connection is disconnected ❗');
    });
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
