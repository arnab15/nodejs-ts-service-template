// src/workers/main.ts
import { getWorker } from './worker.factory';

void (async (): Promise<void> => {
  const type = process.env.WORKER_TYPE;
  if (!type) throw new Error('WORKER_TYPE env not set');

  const worker = getWorker(type as 'email' | 'sms' | 'whatsapp' | 'fcm' | 'sms-otp');
  await worker.start();
})();
