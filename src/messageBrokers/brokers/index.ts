// brokers/index.ts

import { SQSClient } from '@aws-sdk/client-sqs';

import logger from '../../logger';
import { IMessageBroker } from '../Interfaces/MessageBroker';
import { queueTopicMap } from '../sqsQueueConfigMap';
import { SQSBroker } from './SQSBroker';

export function createBroker(): IMessageBroker | null {
  const type = process.env.BROKER_TYPE ?? 'sqs';

  if (type === 'sqs') {
    const client = new SQSClient({ region: process.env.AWS_REGION });

    return new SQSBroker(client, queueTopicMap);
  }
  logger.error(`Unsupported broker type: ${type}`);
  return null;
}

export default createBroker;
