// src/workers/dev.ts
import { EmailWorker } from './email.worker';
import { FCMWorker } from './fcm.worker';
import { SMSOTPWorker } from './sms.otp.worker';
import { SMSWorker } from './sms.worker';
import { WhatsAppWorker } from './whatsapp.worker';

async function startAllWorkers(): Promise<void> {
  const workers = [
    new EmailWorker(),
    new SMSWorker(),
    new WhatsAppWorker(),
    new FCMWorker(),
    new SMSOTPWorker(),
  ];

  await Promise.all(workers.map((worker) => worker.start()));

  console.log('🚀 All workers started in dev mode');
}

void startAllWorkers();
