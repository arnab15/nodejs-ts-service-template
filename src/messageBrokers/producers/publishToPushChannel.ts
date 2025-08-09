import { publish } from './publish';
import logger from '../../logger';
import { PublishToFCMData } from '../Interfaces/MessageType';
import { BrokerTopics } from '../Interfaces/topics';

export const publishToPushChannel = async ({ data }: { data: PublishToFCMData }): Promise<void> => {
  await publish(BrokerTopics.SEND_TO_PUSH_CHANNEL, {
    data,
    type: BrokerTopics.SEND_TO_PUSH_CHANNEL,
  });
  logger.info(`Message published to ${BrokerTopics.SEND_TO_PUSH_CHANNEL} topic`);
};
