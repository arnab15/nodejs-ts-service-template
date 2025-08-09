/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ISMSProvider } from './providers/sms.provider.interface';
import { TwilioProvider } from './providers/twilio.provider';

export enum SMSProviderType {
  TWILIO = 'TWILIO',
}

export class SMSFactory {
  static create(providerType: SMSProviderType): ISMSProvider {
    switch (providerType) {
      case SMSProviderType.TWILIO:
        return new TwilioProvider(
          process.env.TWILIO_ACCOUNT_SID!,
          process.env.TWILIO_AUTH_TOKEN!,
          process.env.TWILIO_FROM_NUMBER!,
        );
      default:
        throw new Error(`Unsupported SMS provider: ${providerType}`);
    }
  }
}
