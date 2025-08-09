// src/brokerHandlers/index.ts
import { handelDeliveryAgentDetailsUpdate } from './handelDeliveryAgentDetailsUpdate';
import { handelOrderAcceptedStore } from './handelOrderAcceptedStore';
import { handelOrderConfirmed } from './handelOrderConfirmed';
import { handelOrderDelivered } from './handelOrderDelivered';
import { handelDeliveryAccepted } from './handelOrderDeliveryAccepted';
import { handelOrderDeliveryArrivedStore } from './handelOrderDeliveryArrivedStore';
import { handelDeliveryArrivedUser } from './handelOrderDeliveryArrivedUser';
import { handelOrderDeliveryPicked } from './handelOrderDeliveryPicked';
import { handelOrderReadyForPickup } from './handelOrderReadyForPickup';
import { handelUserLoginOtp } from './handelSendUserLoginOtp';
import { handelShopDetailsUpdate } from './handelShopDetailsUpdate';
import { handelUserDetailsUpdate } from './handelUserDetailsUpdate';
import { handelPaymentStatusFailed } from './handlePaymentStatus';
import type { MessageHandlerRegistry } from '../Interfaces/MessageBroker';
import { BrokerTopics } from '../Interfaces/topics';

export const brokerHandlers: MessageHandlerRegistry = {
  [BrokerTopics.PAYMENT_FAILED]: [handelPaymentStatusFailed],
  [BrokerTopics.ORDER_CONFIRMED]: [handelOrderConfirmed],
  [BrokerTopics.ORDER_STORE_ACCEPTED]: [handelOrderAcceptedStore],
  [BrokerTopics.ORDER_DELIVERED]: [handelOrderDelivered],
  [BrokerTopics.ORDER_DELIVERY_ASSIGNED]: [handelDeliveryAccepted],
  [BrokerTopics.ORDER_DELIVERY_ARRIVED_STORE]: [handelOrderDeliveryArrivedStore],
  [BrokerTopics.ORDER_DELIVERY_ARRIVED_USER]: [handelDeliveryArrivedUser],
  [BrokerTopics.ORDER_DELIVERY_PICKED]: [handelOrderDeliveryPicked],
  [BrokerTopics.ORDER_READY_FOR_PICKUP]: [handelOrderReadyForPickup],
  [BrokerTopics.SEND_USER_LOGIN_OTP]: [handelUserLoginOtp],
  [BrokerTopics.DELIVERY_AGENT_DETAILS_UPDATED_COMMUNICATION]: [handelDeliveryAgentDetailsUpdate],
  [BrokerTopics.USER_DETAILS_UPDATED_COMMUNICATION]: [handelUserDetailsUpdate],
  [BrokerTopics.SHOP_DETAILS_UPDATED_COMMUNICATION]: [handelShopDetailsUpdate],
};
