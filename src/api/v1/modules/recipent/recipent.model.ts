import { Schema, model } from 'mongoose';

import { collectionNames } from '../../../../constants/collection.name.constant';
export enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

export enum EntityType {
  USER = 'user',
  SHOP = 'shop',
  DELIVERY_PARTNER = 'delivery_partner',
}

const RecipientSchema = new Schema(
  {
    entityId: { type: String, required: true },
    entityType: { type: String, enum: Object.values(EntityType), required: true },
    name: String,
    email: String,
    phone: String,
    preferences: {
      allowSMS: { type: Boolean, default: true },
      allowEmail: { type: Boolean, default: false },
      allowPush: { type: Boolean, default: true },
      allowWhatsApp: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

RecipientSchema.index({ entityId: 1, entityType: 1 }, { unique: true });

export const RecipientModel = model(collectionNames.recipient, RecipientSchema);
