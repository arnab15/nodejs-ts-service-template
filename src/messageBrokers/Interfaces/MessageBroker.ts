/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMessageBroker {
  publish(topic: string, message: any): Promise<void>;
  subscribe(topic: string, handler: (message: any) => Promise<void>): Promise<void>;
  disconnect(): Promise<void>;
}

import { BrokerTopics } from './topics';

export type MessageHandler = (data: any) => Promise<void>;

export type MessageHandlerRegistry = {
  [key in BrokerTopics]?: MessageHandler[];
};
