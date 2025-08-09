import twilio from 'twilio';

import { ISMSProvider } from './sms.provider.interface';

export class TwilioProvider implements ISMSProvider {
  private readonly client;

  constructor(
    private readonly accountSid: string,
    private readonly authToken: string,
    private readonly fromNumber: string,
  ) {
    this.client = twilio(accountSid, authToken);
  }

  async sendSMS(to: string, message: string): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: this.fromNumber,
      to,
    });
  }
}
