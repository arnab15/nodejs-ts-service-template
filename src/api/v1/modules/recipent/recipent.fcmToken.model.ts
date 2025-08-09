// src/models/fcmToken.model.ts
import mongoose, { Schema, Model } from 'mongoose';

import { DeviceType, IFcmToken } from './recipient.types';
import { collectionNames } from '../../../../constants/collection.name.constant';

const FcmTokenSchema = new Schema<IFcmToken>(
  {
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.recipient,
      required: true,
      index: true,
    },
    token: { type: String, required: true, index: true },
    platform: { type: String, enum: Object.values(DeviceType), required: true },
    lastUsedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Optional: TTL Index to auto-remove unused tokens after 180 days
FcmTokenSchema.index({ lastUsedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 }); // 180 days

export const FcmTokenModel: Model<IFcmToken> = mongoose.model<IFcmToken>(
  collectionNames.fcmToken,
  FcmTokenSchema,
);
