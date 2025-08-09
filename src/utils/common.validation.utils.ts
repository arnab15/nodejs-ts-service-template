import mongoose from 'mongoose';
import z from 'zod';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const zObjectId = () =>
  z
    .string()
    .trim()
    .nonempty({
      message: 'ID is required and must be a valid MongoDB ObjectId',
    })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid MongoDB ObjectId',
    });
