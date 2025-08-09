import mongoose, { ObjectId } from 'mongoose';

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
export interface FCMToken {
  token: string;
  deviceType: DeviceType;
  lastSeenAt: Date;
}

export interface Preferences {
  allowSMS: boolean;
  allowEmail: boolean;
  allowPush: boolean;
  allowWhatsApp: boolean;
}

export interface IRecipient extends Document {
  _id: ObjectId;
  entityId: string; // actual ID of user/shop/delivery partner
  entityType: EntityType;
  name?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: Preferences;
}
export interface CreateRecipientDto {
  entityId: string;
  entityType: EntityType;
  name?: string;
  email?: string;
  phone?: string;
  preferences: Preferences;
}

export interface IFcmToken extends Document {
  recipientId: mongoose.Types.ObjectId;
  token: string;
  platform: 'ios' | 'android' | 'web';
  lastUsedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
