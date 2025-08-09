// src/workers/email.worker.ts

import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

import { pollQueue } from './worker.consumer.util';
import { PublishToFCMData } from '../messageBrokers/Interfaces/MessageType';
import { BrokerTopics } from '../messageBrokers/Interfaces/topics';

dotenv.config();
export class WhatsAppWorker {
  private readonly client = new SQSClient({ region: process.env.AWS_REGION });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private readonly queueUrl = process.env.COMMUNICATION_WHATSAPP_CHANNEL_COMMUNICATION! as string;

  private readonly topics: BrokerTopics[] = [BrokerTopics.SEND_TO_WHATSAPP_CHANNEL];
  async start(): Promise<void> {
    if (!this.queueUrl) {
      throw new Error(
        'COMMUNICATION_WHATSAPP_CHANNEL_COMMUNICATION is not defined in the environment variables',
      );
    }
    await pollQueue<BrokerTopics>({
      client: this.client,
      queueUrl: this.queueUrl,
      topics: this.topics,
      handlers: {
        SEND_TO_WHATSAPP_CHANNEL: [this.handleWhatsappChannel],
      },
    });
  }

  private async handleWhatsappChannel(data: PublishToFCMData): Promise<void> {
    console.log('📧 sending whatsapp', data);
  }
}
