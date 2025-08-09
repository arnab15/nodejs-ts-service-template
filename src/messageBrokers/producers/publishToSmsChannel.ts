import { publish } from './publish';
import logger from '../../logger';
import { PublishToEmailData } from '../Interfaces/MessageType';
import { BrokerTopics } from '../Interfaces/topics';

export const publishToSMSChannel = async ({
  data,
}: {
  data: PublishToEmailData;
}): Promise<void> => {
  await publish(BrokerTopics.SEND_TO_SMS_CHANNEL, {
    data,
    type: BrokerTopics.SEND_TO_SMS_CHANNEL,
  });
  logger.info(`Message published to ${BrokerTopics.SEND_TO_SMS_CHANNEL} topic`);
};
