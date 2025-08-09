// src/queue/queue.consumer.ts

import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';

import logger from '../logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HandlerFunction<T = any> = (data: T) => Promise<void>;

export type HandlersMap<Topic extends string = string> = Partial<{
  [K in Topic]: HandlerFunction[];
}>;

interface QueuePollerConfig<Topic extends string = string> {
  queueUrl: string;
  client: SQSClient;
  topics: Topic[];
  handlers: HandlersMap<Topic>;
  waitTimeSeconds?: number;
  maxNumberOfMessages?: number;
}

export async function pollQueue<Topic extends string = string>(
  config: QueuePollerConfig<Topic>,
): Promise<void> {
  const {
    queueUrl,
    client,
    topics,
    handlers,
    waitTimeSeconds = 10,
    maxNumberOfMessages = 10,
  } = config;
  logger.info(`Registering handlers for topics: ${topics.join(', ')}`);
  const poll = async (): Promise<void> => {
    try {
      const response = await client.send(
        new ReceiveMessageCommand({
          QueueUrl: queueUrl,
          WaitTimeSeconds: waitTimeSeconds,
          MaxNumberOfMessages: maxNumberOfMessages,
        }),
      );

      const messages = response.Messages ?? [];

      for (const msg of messages) {
        try {
          const parsed = JSON.parse(msg.Body ?? '{}');
          const topic = parsed.topic as Topic;
          const data = parsed.data;
          if (topics.includes(topic) && handlers[topic]) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            for (const handler of handlers[topic]!) {
              await handler(data);
            }
          } else {
            logger.warn(`[${queueUrl}] Unhandled topic: ${topic}`);
          }

          await client.send(
            new DeleteMessageCommand({
              QueueUrl: queueUrl,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ReceiptHandle: msg.ReceiptHandle!,
            }),
          );
        } catch (err) {
          logger.error(`[${queueUrl}] Error processing message:`, err);
        }
      }
    } catch (err) {
      logger.error(`[${queueUrl}] Polling error:`, err);
    } finally {
      // eslint-disable-next-line no-undef
      setImmediate(poll); // Non-blocking loop
    }
  };

  void poll();
}
