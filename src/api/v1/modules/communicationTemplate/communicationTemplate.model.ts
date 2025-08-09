import mongoose, { Schema } from 'mongoose';

import { ICommunicationTemplate, NotificationChannel } from './communicationTemplate.types';

const CommunicationTemplateSchema: Schema = new Schema<ICommunicationTemplate>(
  {
    topic: {
      type: String,
      required: true,
      index: true,
    },
    channel: {
      type: String,
      enum: Object.values(NotificationChannel),
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    html: {
      type: String,
    },
    text: {
      type: String,
    },
    jsonPayload: {
      type: Schema.Types.Mixed,
    },
    variables: {
      type: [String],
      default: [],
    },
    lang: {
      type: String,
      default: 'en',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Compound index for fast lookup
CommunicationTemplateSchema.index({ topic: 1, channel: 1, lang: 1 });

export const CommunicationTemplateModel = mongoose.model<ICommunicationTemplate>(
  'CommunicationTemplate',
  CommunicationTemplateSchema,
);
