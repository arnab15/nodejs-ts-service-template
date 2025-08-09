import createBroker from './brokers';
import { IMessageBroker } from './Interfaces/MessageBroker';

let brokerInstance: IMessageBroker | null = null;

export function getBroker(): IMessageBroker {
  if (!brokerInstance) {
    const instance = createBroker();

    if (!instance) {
      throw new Error('Failed to create broker instance');
    }

    brokerInstance = instance;
  }

  return brokerInstance;
}
