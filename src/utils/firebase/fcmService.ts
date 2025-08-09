import { firebaseAdmin } from './firebase';
import { SendNotificationRequest } from './firebase.types';
import { httpStatusCode } from '../../constants/common.constants';
import { AppError } from '../../error/AppError';
import logger from '../../logger';

const INVALID_TOKEN_ERRORS = [
  'messaging/invalid-registration-token',
  'messaging/registration-token-not-registered',
];

export async function sendPushNotification({ tokens, payload }: SendNotificationRequest): Promise<{
  successCount: number;
  failureCount: number;
  invalidTokens: string[];
}> {
  if (tokens.length === 0) {
    return { successCount: 0, failureCount: 0, invalidTokens: [] };
  }

  const message = {
    notification: {
      title: payload.title,
      body: payload.body,
    },
    data: payload.data ?? {},
    tokens,
    android: {
      notification: {
        sound: 'notification',
      },
    },
  };

  try {
    const response = await firebaseAdmin.messaging().sendEachForMulticast(message);
    logger.info(`✅ Successfully sent to: ${response.successCount} devices`);

    const invalidTokens: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response.responses.forEach((res: any, idx: number) => {
      if (!res.success && res.error?.code && INVALID_TOKEN_ERRORS.includes(res.error.code)) {
        invalidTokens.push(tokens[idx]);
      }
    });

    return {
      successCount: response.successCount,
      failureCount: response.failureCount,
      invalidTokens,
    };
  } catch (error) {
    logger.error('FCM send error:', error);
    throw new AppError(httpStatusCode.INTERNAL_SERVER_ERROR, 'Failed to send notification', error);
  }
}
