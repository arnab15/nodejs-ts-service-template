import { SMSFactory, SMSProviderType } from './sms.factory';

export class SMSService {
  private readonly provider;

  constructor() {
    const providerType = (process.env.SMS_PROVIDER as SMSProviderType) || SMSProviderType.TWILIO;
    this.provider = SMSFactory.create(providerType);
  }

  async send(to: string, message: string): Promise<void> {
    return await this.provider.sendSMS(to, message);
  }
}
