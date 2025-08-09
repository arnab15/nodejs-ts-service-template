/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';

import {
  CreateQueueCommand,
  GetQueueUrlCommand,
  GetQueueUrlCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';

dotenv.config();

const REGION = process.env.AWS_REGION ?? 'ap-south-1';
const ENV = (process.env.SQS_SCOPE ?? 'dev').toUpperCase();
const ENV_FILE_PATH = path.join(process.cwd(), '.env');

const sqsClient = new SQSClient({ region: REGION });

//Update the queue names here when adding new queues
const queueNames = [
  'PAYMENT_FAILED_COMMUNICATION',
  'ORDER_CONFIRMED_COMMUNICATION',
  'ORDER_STORE_ACCEPTED_COMMUNICATION',
  'DELIVERY_ASSIGN_COMMUNICATION',
  'ORDER_DELIVERY_ASSIGNED_COMMUNICATION',
  'ORDER_READY_FOR_PICKUP_COMMUNICATION',
  'ORDER_DELIVERY_ARRIVED_STORE_COMMUNICATION',
  'ORDER_DELIVERY_PICKED_COMMUNICATION',
  'ORDER_DELIVERY_ARRIVED_USER_COMMUNICATION',
  'ORDER_DELIVERED_COMMUNICATION',

  'SHOP_DETAILS_UPDATE_COMMUNICATION',
  'USER_DETAILS_UPDATE_COMMUNICATION',
  'DELIVERY_AGENT_DETAILS_UPDATE_COMMUNICATION',
  'SEND_USER_LOGIN_OTP_COMMUNICATION',

  'COMMUNICATION_LOGIN_OTP_SMS_CHANNEL_COMMUNICATION',
  'COMMUNICATION_SMS_CHANNEL_COMMUNICATION',
  'COMMUNICATION_EMAIL_CHANNEL_COMMUNICATION',
  'COMMUNICATION_PUSH_CHANNEL_COMMUNICATION',
  'COMMUNICATION_WHATSAPP_CHANNEL_COMMUNICATION',
];

const getFullQueueName = (baseName: string): string => `${baseName}_${ENV}`;

async function ensureQueueAndGetUrl(baseQueueName: string): Promise<string> {
  const fullQueueName = getFullQueueName(baseQueueName);

  try {
    const getQueueUrlCmd = new GetQueueUrlCommand({ QueueName: fullQueueName });
    const result: GetQueueUrlCommandOutput = await sqsClient.send(getQueueUrlCmd);
    console.log(`✅ Queue exists: ${fullQueueName}`);
    return result.QueueUrl!;
  } catch (error: any) {
    console.log(`⚠️ Queue does not exist: ${fullQueueName}`);
    if (error.name?.includes('NonExistentQueue') || error.name?.includes('QueueDoesNotExist')) {
      const createQueueCmd = new CreateQueueCommand({
        QueueName: fullQueueName,
        Attributes: {
          VisibilityTimeout: '30',
          DelaySeconds: '0',
        },
      });
      await sqsClient.send(createQueueCmd);

      const getQueueUrlCmd = new GetQueueUrlCommand({ QueueName: fullQueueName });
      const result: GetQueueUrlCommandOutput = await sqsClient.send(getQueueUrlCmd);
      console.log(`🚀 Created queue: ${fullQueueName}`);
      return result.QueueUrl!;
    } else {
      throw error;
    }
  }
}

function readEnvFile(filepath: string): Record<string, string> {
  const envVars: Record<string, string> = {};
  if (!fs.existsSync(filepath)) {
    return envVars;
  }

  const lines = fs.readFileSync(filepath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...rest] = trimmed.split('=');
      envVars[key] = rest.join('=');
    }
  }
  return envVars;
}

function writeEnvFile(vars: Record<string, string>, filepath: string): void {
  const sortedEntries = Object.entries(vars).sort(([a], [b]) => a.localeCompare(b));
  const lines = sortedEntries.map(([key, value]) => `${key}=${value}`);
  fs.writeFileSync(filepath, lines.join('\n') + '\n');
  console.log(`📝 .env updated and sorted at ${filepath}`);
}

async function seedQueues(): Promise<void> {
  const existingEnv = readEnvFile(ENV_FILE_PATH);

  for (const queueName of queueNames) {
    const queueUrl = await ensureQueueAndGetUrl(queueName);
    existingEnv[queueName] = queueUrl;
  }

  writeEnvFile(existingEnv, ENV_FILE_PATH);
}

seedQueues()
  .then(() => console.log('🎉 SQS queue seeding and .env update complete!'))
  .catch((err) => {
    console.error('❌ Failed to seed SQS queues:', err);
    process.exit(1);
  });
