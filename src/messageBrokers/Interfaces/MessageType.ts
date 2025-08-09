export interface PublishToFCMData {
  tokens: string[];
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface PublishToEmailData {
  to: string[];
  subject: string;
  bodyHtml: string;
  bodyText: string;
}

export interface PublishToSmsData {
  to: string[];
  body: string;
}

export interface IHandelUserLoginOtp {
  data: {
    to: string[];
    otp: string;
    appHash: string;
  };
  type: string;
  corelationId?: string;
}
export interface IUserDetailsUpdate {
  data: {
    userId: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  type: string;
  corelationId?: string;
}
export interface IDeliveryAgentDetailsUpdate {
  data: {
    deliveryAgentId: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  type: string;
  corelationId?: string;
}
export interface IShopDetailsUpdate {
  data: {
    shopId: string;
    name?: string;
    email?: string;
    phone?: string;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelPaymentFailed {
  data: {
    orderId: string;
    userId: string;
    amount: number;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelOrderConfirmed {
  data: {
    orderId: string;
    storeName: string;
    storeId: string;
    itemCount: number;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelDeliveryAccepted {
  data: {
    orderId: string;
    storeId: string;
    deliveryPartnerId: string;
  };
  type: string;
  corelationId?: string;
}

export interface IHandelOrderAcceptedStore {
  data: {
    orderId: string;
    storeId: string;
    userId: string;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelOrderDelivered {
  data: {
    orderId: string;
    userId: string;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelOrderDeliveryPicked {
  data: {
    orderId: string;
    userId: string;
    deliveryPartnerId: string;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelDeliveryArrivedStore {
  data: {
    orderId: string;
    storeId: string;
    deliveryPartnerId: string;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelOrderReadyForPickup {
  data: {
    orderId: string;
    storeId: string;
    deliveryPartnerId: string;
  };
  type: string;
  corelationId?: string;
}
export interface IHandelDeliveryArrivedUser {
  data: {
    orderId: string;
    userId: string;
    deliveryPartnerId: string;
  };
  type: string;
  corelationId?: string;
}
