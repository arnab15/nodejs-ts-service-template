import { SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

import { pollQueue } from './worker.consumer.util';
import logger from '../logger';
import { PublishToSmsData } from '../messageBrokers/Interfaces/MessageType';
import { BrokerTopics } from '../messageBrokers/Interfaces/topics';
import { SMSService } from '../utils/sms/sms.service';

dotenv.config();
const smsService = new SMSService();
export class SMSOTPWorker {
  private readonly client = new SQSClient({ region: process.env.AWS_REGION });
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private readonly queueUrl = process.env
    .COMMUNICATION_LOGIN_OTP_SMS_CHANNEL_COMMUNICATION! as string;

  private readonly topics: BrokerTopics[] = [BrokerTopics.SEND_LOGIN_OTP_SMS_CHANNEL];
  async start(): Promise<void> {
    if (!this.queueUrl) {
      throw new Error(
        'COMMUNICATION_LOGIN_OTP_SMS_CHANNEL_COMMUNICATION is not defined in the environment variables',
      );
    }
    await pollQueue<BrokerTopics>({
      client: this.client,
      queueUrl: this.queueUrl,
      topics: this.topics,
      handlers: {
        SEND_LOGIN_OTP_SMS_CHANNEL: [this.handleSmsOtpChannel],
      },
    });
  }

  private async handleSmsOtpChannel({ data }: { data: PublishToSmsData }): Promise<void> {
    console.log('📧 sending login otp..', data);

    if (data?.to?.length === 0) {
      logger.error('No phone numbers provided');
      return;
    }
    try {
      await smsService.send(data.to[0], data.body);
    } catch (error) {
      logger.error('Error sending login otp', error);
    }
  }
}
