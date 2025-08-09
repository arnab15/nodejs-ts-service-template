// src/workers/email.worker.ts

import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

import { pollQueue } from './worker.consumer.util';
import { PublishToFCMData } from '../messageBrokers/Interfaces/MessageType';
import { BrokerTopics } from '../messageBrokers/Interfaces/topics';
import { sendPushNotification } from '../utils/firebase/fcmService';

dotenv.config();
export class FCMWorker {
  private readonly client = new SQSClient({ region: process.env.AWS_REGION });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private readonly queueUrl = process.env.COMMUNICATION_PUSH_CHANNEL_COMMUNICATION! as string;

  private readonly topics: BrokerTopics[] = [BrokerTopics.SEND_TO_PUSH_CHANNEL];
  async start(): Promise<void> {
    if (!this.queueUrl) {
      throw new Error(
        'COMMUNICATION_PUSH_CHANNEL_COMMUNICATION is not defined in the environment variables',
      );
    }
    await pollQueue<BrokerTopics>({
      client: this.client,
      queueUrl: this.queueUrl,
      topics: this.topics,
      handlers: {
        SEND_TO_PUSH_CHANNEL: [this.handlePushChannel],
      },
    });
  }

  private async handlePushChannel(pushPayload: { data: PublishToFCMData }): Promise<void> {
    console.log('📧 Order placed: sending push', pushPayload);
    await sendPushNotification({
      tokens: pushPayload.data.tokens,
      payload: {
        title: pushPayload.data.title,
        body: pushPayload.data.body,
        data: pushPayload.data.data,
      },
    });
  }
}
