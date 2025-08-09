module.exports = {
  apps: [
    {
      name: 'worker-email',
      script: 'src/workers/main.ts',
      interpreter: 'ts-node',
      env: { WORKER_TYPE: 'email' },
    },
    {
      name: 'worker-sms',
      script: 'src/workers/main.ts',
      interpreter: 'ts-node',
      env: { WORKER_TYPE: 'sms' },
    },
    {
      name: 'worker-whatsapp',
      script: 'src/workers/main.ts',
      interpreter: 'ts-node',
      env: { WORKER_TYPE: 'whatsapp' },
    },
    {
      name: 'worker-fcm',
      script: 'src/workers/main.ts',
      interpreter: 'ts-node',
      env: { WORKER_TYPE: 'fcm' },
    },
    {
      name: 'worker-sms-otp',
      script: 'src/workers/main.ts',
      interpreter: 'ts-node',
      env: { WORKER_TYPE: 'sms-otp' },
    },
  ],
};
