import { EmailWorker } from './email.worker';
import { FCMWorker } from './fcm.worker';
import { IWorker } from './IWorker';
import { SMSOTPWorker } from './sms.otp.worker';
import { SMSWorker } from './sms.worker';
import { WhatsAppWorker } from './whatsapp.worker';

export function getWorker(type: 'email' | 'sms' | 'whatsapp' | 'fcm' | 'sms-otp'): IWorker {
  switch (type.toLowerCase()) {
    case 'email':
      return new EmailWorker();
    case 'sms':
      return new SMSWorker();
    case 'whatsapp':
      return new WhatsAppWorker();
    case 'fcm':
      return new FCMWorker();
    case 'sms-otp':
      return new SMSOTPWorker();
    default:
      throw new Error(`Unknown WORKER_TYPE: ${type}`);
  }
}
