/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBroker } from '../brokerContext';
import { BrokerTopics } from '../Interfaces/topics';

export async function publish(
  topic: BrokerTopics,
  message: { data: any; type: string; corelationId?: string },
): Promise<void> {
  const broker = getBroker();
  await broker.publish(topic, message);
}
