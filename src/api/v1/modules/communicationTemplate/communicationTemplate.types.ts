import { Document } from 'mongoose';

export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WHATSAPP = 'whatsapp',
}

export interface ICommunicationTemplate extends Document {
  topic: string; // e.g. BrokerTopics.ORDER_CONFIRMED
  channel: NotificationChannel;

  title?: string; // for email / push
  description?: string; // short text for push / sms fallback

  html?: string; // email template
  text?: string; // sms or fallback plain text
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonPayload?: Record<string, any>; // optional push data payload

  variables: string[]; // e.g. ["userName", "orderId"]
  lang?: string; // e.g. "en", "hi"

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
