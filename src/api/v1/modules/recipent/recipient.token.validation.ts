/* eslint-disable no-magic-numbers */
import z from 'zod';

import { DeviceType, EntityType } from './recipent.model';
import { zObjectId } from '../../../../utils/common.validation.utils';
const fcmTokenRegex = /^[a-zA-Z0-9_\-:.]{100,255}$/;

export const recipientTokenValidationSchema = z.object({
  body: z.object({
    platform: z.nativeEnum(DeviceType),
    recipientId: zObjectId(),
    token: z
      .string()
      .regex(fcmTokenRegex, 'Invalid FCM token format')
      .min(100, 'FCM token is too short')
      .max(255, 'FCM token is too long'),
    entityType: z.nativeEnum(EntityType),
  }),
});
