// src/workers/email.worker.ts

import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

import { pollQueue } from './worker.consumer.util';
import { PublishToFCMData } from '../messageBrokers/Interfaces/MessageType';
import { BrokerTopics } from '../messageBrokers/Interfaces/topics';

dotenv.config();
export class EmailWorker {
  private readonly client = new SQSClient({ region: process.env.AWS_REGION });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private readonly queueUrl = process.env.COMMUNICATION_EMAIL_CHANNEL_COMMUNICATION! as string;

  private readonly topics: BrokerTopics[] = [BrokerTopics.SEND_TO_EMAIL_CHANNEL];
  async start(): Promise<void> {
    if (!this.queueUrl) {
      throw new Error(
        'COMMUNICATION_EMAIL_CHANNEL_COMMUNICATION is not defined in the environment variables',
      );
    }
    await pollQueue<BrokerTopics>({
      client: this.client,
      queueUrl: this.queueUrl,
      topics: this.topics,
      handlers: {
        SEND_TO_EMAIL_CHANNEL: [this.handleEmailChannel],
      },
    });
  }

  private async handleEmailChannel(data: PublishToFCMData): Promise<void> {
    console.log('📧 Order placed: sending email', data);
  }
}
