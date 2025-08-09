/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '../../logger';
import { getBroker } from '../brokerContext';
import { brokerHandlers } from '../handlers';

async function startBroker(): Promise<void> {
  const broker = getBroker();

  for (const [topic, handlers] of Object.entries(brokerHandlers)) {
    for (const handler of handlers) {
      await broker.subscribe(topic, handler);
    }
  }

  if ('startPolling' in broker) {
    // Optional: Only for SQS; Kafka might have its own consumer.start()
    (broker as any).startPolling?.();
  }

  logger.info('🚀 Broker started.');
}

export default startBroker;
