/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

import logger from '../../logger';
import { IMessageBroker } from '../Interfaces/MessageBroker';
import { BrokerTopics } from '../Interfaces/topics';

// Map of QueueURL => Topics[]
type QueueTopicMap = Record<string, BrokerTopics[]>;

export class SQSBroker implements IMessageBroker {
  private readonly handlers: Partial<Record<BrokerTopics, ((data: any) => Promise<void>)[]>> = {};
  private readonly topicQueueMap: Record<BrokerTopics, string>;

  constructor(
    private readonly client: SQSClient,
    private readonly queueTopicMap: QueueTopicMap,
  ) {
    // Create reverse map for publishing
    this.topicQueueMap = Object.entries(queueTopicMap)
      .flatMap(([queueUrl, topics]) =>
        topics.map((topic) => [topic, queueUrl] as [BrokerTopics, string]),
      )
      .reduce(
        (acc, [topic, queueUrl]) => {
          acc[topic] = queueUrl;
          return acc;
        },
        {} as Record<BrokerTopics, string>,
      );
  }

  async publish(topic: BrokerTopics, message: Record<string, any>): Promise<void> {
    const queueUrl = this.topicQueueMap[topic];
    if (!queueUrl) {
      throw new Error(`Queue not found for topic: ${topic}`);
    }

    const payload = JSON.stringify({ topic, data: message });

    await this.client.send(
      new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: payload,
      }),
    );
  }

  subscribe(topic: string, handler: (message: any) => Promise<void>): Promise<void> {
    const typedTopic = topic as BrokerTopics;

    this.handlers[typedTopic] ??= [];

    this.handlers[typedTopic]?.push(handler);
    return Promise.resolve(); // ensure Promise<void> is returned
  }

  startPolling(): void {
    const queueToSubscribedTopics: Record<string, BrokerTopics[]> = {};

    // Find subscribed handlers
    for (const [topic, handlers] of Object.entries(this.handlers)) {
      if (!handlers || handlers.length === 0) continue;

      const brokerTopic = topic as BrokerTopics;

      // Find which queues this topic is associated with from queueTopicMap
      for (const [queueUrl, queueTopics] of Object.entries(this.queueTopicMap)) {
        if (queueTopics.includes(brokerTopic)) {
          if (!queueToSubscribedTopics[queueUrl]) {
            queueToSubscribedTopics[queueUrl] = [];
          }
          queueToSubscribedTopics[queueUrl].push(brokerTopic);
        }
      }
    }

    // Start polling only those queues with subscribed topics
    for (const [queueUrl, subscribedTopics] of Object.entries(queueToSubscribedTopics)) {
      const queueName = queueUrl.split('/').pop();
      logger.info(`Subscribed to ${queueName} for topics: ${subscribedTopics.join(', ')}`);
      void this.pollQueue(queueUrl, subscribedTopics);
    }
  }

  private async pollQueue(queueUrl: string, topics: BrokerTopics[]): Promise<void> {
    const poll = async (): Promise<void> => {
      try {
        const response = await this.client.send(
          new ReceiveMessageCommand({
            QueueUrl: queueUrl,
            WaitTimeSeconds: 10,
            MaxNumberOfMessages: 10,
          }),
        );

        if (response.Messages) {
          for (const msg of response.Messages) {
            try {
              const parsed = JSON.parse(msg.Body ?? '{}');
              const topic = parsed.topic as BrokerTopics;
              const data = parsed.data;

              if (topics.includes(topic) && this.handlers[topic]) {
                for (const handler of this.handlers[topic]) {
                  await handler(data);
                }
              } else {
                logger.warn(`[${queueUrl}] Unhandled topic: ${topic}`);
              }

              await this.client.send(
                new DeleteMessageCommand({
                  QueueUrl: queueUrl,
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  ReceiptHandle: msg.ReceiptHandle!,
                }),
              );
            } catch (err) {
              logger.error(`[${queueUrl}] Message handler error:`, err);
            }
          }
        }
      } catch (err) {
        logger.error(`[${queueUrl}] Polling error:`, err);
      } finally {
        // eslint-disable-next-line no-undef
        setImmediate(poll); // Recursively poll
      }
    };

    void poll();
  }

  async disconnect(): Promise<void> {
    // Optional: add logic if you need to stop polling or close the client
  }
}
