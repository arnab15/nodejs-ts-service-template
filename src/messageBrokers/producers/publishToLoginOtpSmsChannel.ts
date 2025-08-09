import { publish } from './publish';
import logger from '../../logger';
import { PublishToSmsData } from '../Interfaces/MessageType';
import { BrokerTopics } from '../Interfaces/topics';

export const publishToLoginOtpSMSChannel = async (data: PublishToSmsData): Promise<void> => {
  await publish(BrokerTopics.SEND_LOGIN_OTP_SMS_CHANNEL, {
    data,
    type: BrokerTopics.SEND_LOGIN_OTP_SMS_CHANNEL,
  });
  logger.info(`Message published to ${BrokerTopics.SEND_LOGIN_OTP_SMS_CHANNEL} topic`);
};
