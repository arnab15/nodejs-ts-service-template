// src/workers/email.worker.ts

import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

import { pollQueue } from './worker.consumer.util';
import { PublishToFCMData } from '../messageBrokers/Interfaces/MessageType';
import { BrokerTopics } from '../messageBrokers/Interfaces/topics';

dotenv.config();
export class SMSWorker {
  private readonly client = new SQSClient({ region: process.env.AWS_REGION });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private readonly queueUrl = process.env.COMMUNICATION_SMS_CHANNEL_COMMUNICATION! as string;

  private readonly topics: BrokerTopics[] = [BrokerTopics.SEND_TO_SMS_CHANNEL];
  async start(): Promise<void> {
    if (!this.queueUrl) {
      throw new Error(
        'COMMUNICATION_SMS_CHANNEL_COMMUNICATION is not defined in the environment variables',
      );
    }
    await pollQueue<BrokerTopics>({
      client: this.client,
      queueUrl: this.queueUrl,
      topics: this.topics,
      handlers: {
        SEND_TO_SMS_CHANNEL: [this.handleSmsChannel],
      },
    });
  }

  private async handleSmsChannel(data: PublishToFCMData): Promise<void> {
    console.log('📧 sending sms', data);
  }
}
