const PAYMENT_FAILED = [
  // EMAIL
  {
    topic: 'PAYMENT_FAILED',
    channel: 'email',
    lang: 'en',
    title: 'Payment Failed for Order #{{orderId}}',
    html: '<p>Hi {{userName}},</p><p>Your payment of ₹{{amount}} for order <strong>#{{orderId}}</strong> has failed.</p><p>Please try again or contact support if the amount was deducted.</p>',
    text: 'Hi {{userName}}, your payment of ₹{{amount}} for order #{{orderId}} has failed. Please retry or contact support.',
    variables: ['userName', 'orderId', 'amount'],
    isActive: true,
  },

  // SMS
  {
    topic: 'PAYMENT_FAILED',
    channel: 'sms',
    lang: 'en',
    text: 'Hi {{userName}}, your payment of ₹{{amount}} for order #{{orderId}} has failed. Retry or contact support.',
    variables: ['userName', 'orderId', 'amount'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'PAYMENT_FAILED',
    channel: 'whatsapp',
    lang: 'en',
    text: 'Hi {{userName}}, your payment of ₹{{amount}} for order #{{orderId}} failed. Please retry or reach out to support if already paid.',
    variables: ['userName', 'orderId', 'amount'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'PAYMENT_FAILED',
    channel: 'push',
    lang: 'en',
    title: 'Payment Failed',
    description: 'Payment of ₹{{amount}} for order #{{orderId}} failed. Tap to retry.',
    jsonPayload: {
      type: 'PAYMENT_FAILED',
      orderId: '{{orderId}}',
      amount: '{{amount}}',
    },
    variables: ['orderId', 'amount'],
    isActive: true,
  },
];

const ORDER_CONFIRMED = [
  // EMAIL
  {
    topic: 'ORDER_CONFIRMED',
    channel: 'email',
    lang: 'en',
    title: 'New Order #{{orderId}} Confirmed',
    html: `
      <p>Hi {{storeName}},</p>
      <p>A new order <strong>#{{orderId}}</strong> with <strong>{{itemCount}} items</strong> has been confirmed.</p>
      <p>Please begin preparing the items immediately to avoid delay in delivery.</p>
      <p>Timely processing helps ensure great customer experience. Thank you!</p>
    `,
    text: 'Hi {{storeName}}, order #{{orderId}} with {{itemCount}} items has been confirmed. Please start preparing the order immediately. Thank you!',
    variables: ['storeName', 'orderId', 'itemCount'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_CONFIRMED',
    channel: 'sms',
    lang: 'en',
    text: 'Hi {{storeName}}, order #{{orderId}} with {{itemCount}} items is confirmed. Please prepare it at the earliest.',
    variables: ['storeName', 'orderId', 'itemCount'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_CONFIRMED',
    channel: 'whatsapp',
    lang: 'en',
    text: 'Hello {{storeName}}, a new order #{{orderId}} ({{itemCount}} items) has been confirmed. Please start preparing it right away for a smooth delivery experience.',
    variables: ['storeName', 'orderId', 'itemCount'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_CONFIRMED',
    channel: 'push',
    lang: 'en',
    title: 'Order #{{orderId}} Confirmed',
    description: 'You have a new order with {{itemCount}} items. Start preparing it now.',
    jsonPayload: {
      type: 'ORDER_CONFIRMED',
      orderId: '{{orderId}}',
      itemCount: '{{itemCount}}',
    },
    variables: ['storeName', 'orderId', 'itemCount'],
    isActive: true,
  },
];

const ORDER_STORE_ACCEPTED = [
  // EMAIL
  {
    topic: 'ORDER_STORE_ACCEPTED',
    channel: 'email',
    lang: 'en',
    title: 'Great news! Your order #{{orderId}} is being prepared',
    html: `
      <p>Hi {{userName}},</p>
      <p>Your order <strong>#{{orderId}}</strong> has been accepted by <strong>{{storeName}}</strong>.</p>
      <p>They’ve started preparing your items and it will be on the way shortly!</p>
      <p>You’ll be notified when it’s out for delivery. Thank you for shopping with us 😊</p>
    `,
    text: "Hi {{userName}}, your order #{{orderId}} has been accepted by {{storeName}} and is being prepared. You'll be notified once it's out for delivery!",
    variables: ['userName', 'orderId', 'storeName'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_STORE_ACCEPTED',
    channel: 'sms',
    lang: 'en',
    text: "Hi {{userName}}, your order #{{orderId}} has been accepted by {{storeName}}. It's being packed and will be dispatched soon.",
    variables: ['userName', 'orderId', 'storeName'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_STORE_ACCEPTED',
    channel: 'whatsapp',
    lang: 'en',
    text: 'Hey {{userName}}! 🎉 Your order #{{orderId}} has been accepted by {{storeName}}. It’s being packed and will be on its way soon. Thanks for choosing us!',
    variables: ['userName', 'orderId', 'storeName'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_STORE_ACCEPTED',
    channel: 'push',
    lang: 'en',
    title: 'Your Order is Being Prepared!',
    description: '{{storeName}} accepted your order #{{orderId}}. It’ll be on the way shortly.',
    jsonPayload: {
      type: 'ORDER_STORE_ACCEPTED',
      orderId: '{{orderId}}',
      storeName: '{{storeName}}',
    },
    variables: ['orderId', 'storeName'],
    isActive: true,
  },
];

const DELIVERY_ASSIGN = [
  // EMAIL
  {
    topic: 'DELIVERY_ASSIGN',
    channel: 'email',
    lang: 'en',
    title: '🚨 New Delivery Assigned – Order #{{orderId}}',
    html: `
      <p>Hi {{deliveryPartnerName}},</p>
      <p>You have a new delivery request from <strong>{{storeName}}</strong>.</p>
      <ul>
        <li><strong>Order ID:</strong> {{orderId}}</li>
        <li><strong>Pickup Location:</strong> {{storeName}}</li>
      </ul>
      <p>Please check your app and accept the task as soon as possible.</p>
    `,
    text: 'Hi {{deliveryPartnerName}}, a new delivery (Order #{{orderId}}) from {{storeName}} has been assigned to you. Please accept it in your app.',
    variables: ['deliveryPartnerName', 'orderId', 'storeName'],
    isActive: true,
  },

  // SMS
  {
    topic: 'DELIVERY_ASSIGN',
    channel: 'sms',
    lang: 'en',
    text: 'Hi {{deliveryPartnerName}}, new delivery #{{orderId}} from {{storeName}} assigned. Accept it in your app now.',
    variables: ['deliveryPartnerName', 'orderId', 'storeName'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'DELIVERY_ASSIGN',
    channel: 'whatsapp',
    lang: 'en',
    text: '🚚 New Delivery Assigned!\n\nHi {{deliveryPartnerName}},\n\nOrder #{{orderId}} is ready for pickup from {{storeName}}.\n\nPlease open your app and accept the task.',
    variables: ['deliveryPartnerName', 'orderId', 'storeName'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'DELIVERY_ASSIGN',
    channel: 'push',
    lang: 'en',
    title: '🚚 New Delivery Task',
    description: 'Order #{{orderId}} from {{storeName}}. Accept it now in the app.',
    jsonPayload: {
      type: 'DELIVERY_ASSIGN',
      orderId: '{{orderId}}',
      storeName: '{{storeName}}',
    },
    variables: ['deliveryPartnerName', 'orderId', 'storeName'],
    isActive: true,
  },
];
const ORDER_DELIVERY_ASSIGNED = [
  // EMAIL
  {
    topic: 'ORDER_DELIVERY_ASSIGNED',
    channel: 'email',
    lang: 'en',
    title: '🚚 Delivery Partner Assigned – Order #{{orderId}}',
    html: `
      <p>Hi {{storeName}},</p>
      <p>A delivery partner has been assigned for <strong>Order #{{orderId}}</strong>.</p>
      <ul>
        <li><strong>Delivery Partner:</strong> {{deliveryPartnerName}}</li>
      </ul>
      <p>You can now prepare the package for pickup.</p>
    `,
    text: 'Hi {{storeName}}, delivery partner {{deliveryPartnerName}} is assigned for Order #{{orderId}}. Please prepare the package.',
    variables: ['storeName', 'orderId', 'deliveryPartnerName'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_DELIVERY_ASSIGNED',
    channel: 'sms',
    lang: 'en',
    text: 'Order #{{orderId}}: {{deliveryPartnerName}} has been assigned for delivery. Please prepare the order.',
    variables: ['storeName', 'orderId', 'deliveryPartnerName'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_DELIVERY_ASSIGNED',
    channel: 'whatsapp',
    lang: 'en',
    text: '🚚 *Delivery Assigned*\n\nOrder #{{orderId}} now has a delivery partner:\n👤 {{deliveryPartnerName}}\n\nPlease pack the order for pickup.',
    variables: ['storeName', 'orderId', 'deliveryPartnerName'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_DELIVERY_ASSIGNED',
    channel: 'push',
    lang: 'en',
    title: '🚚 Delivery Assigned: Order #{{orderId}}',
    description: '{{deliveryPartnerName}} is assigned for delivery. Get the order ready.',
    jsonPayload: {
      type: 'ORDER_DELIVERY_ASSIGNED',
      orderId: '{{orderId}}',
      deliveryPartnerName: '{{deliveryPartnerName}}',
    },
    variables: ['orderId', 'deliveryPartnerName'],
    isActive: true,
  },
];

const ORDER_READY_FOR_PICKUP = [
  // EMAIL
  {
    topic: 'ORDER_READY_FOR_PICKUP',
    channel: 'email',
    lang: 'en',
    title: '📦 Order Ready for Pickup – #{{orderId}}',
    html: `
      <p>Hi {{deliveryPartnerName}},</p>
      <p>The store has marked <strong>Order #{{orderId}}</strong> as ready for pickup.</p>
      <p>Please proceed to the assigned store to collect the order.</p>
      <p>Make sure to verify the order ID upon pickup.</p>
    `,
    text: 'Hi {{deliveryPartnerName}}, Order #{{orderId}} is ready for pickup. Please collect it from the assigned store.',
    variables: ['deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_READY_FOR_PICKUP',
    channel: 'sms',
    lang: 'en',
    text: 'Order #{{orderId}} is ready for pickup. Please collect it from the assigned store.',
    variables: ['deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_READY_FOR_PICKUP',
    channel: 'whatsapp',
    lang: 'en',
    text: '📦 *Order Ready for Pickup*\n\nHi {{deliveryPartnerName}}, Order #{{orderId}} is ready. Please visit the store and collect it now.',
    variables: ['deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_READY_FOR_PICKUP',
    channel: 'push',
    lang: 'en',
    title: '📦 Order Ready for Pickup',
    description: 'Order #{{orderId}} is ready. Head to {{storeName}} store now to collect it.',
    jsonPayload: {
      type: 'ORDER_READY_FOR_PICKUP',
      orderId: '{{orderId}}',
    },
    variables: ['deliveryPartnerName', 'orderId', 'storeName'],
    isActive: true,
  },
];

const ORDER_DELIVERY_ARRIVED_STORE = [
  // EMAIL
  {
    topic: 'ORDER_DELIVERY_ARRIVED_STORE',
    channel: 'email',
    lang: 'en',
    title: '🚴 Delivery Partner Has Arrived – Order #{{orderId}}',
    html: `
      <p>Hi {{storeName}},</p>
      <p>Your delivery partner <strong>{{deliveryPartnerName}}</strong> is now at your store to collect <strong>Order #{{orderId}}</strong>.</p>
      <p>Please have the package ready for pickup to ensure a smooth and timely delivery!</p>
    `,
    text: 'Delivery partner {{deliveryPartnerName}} is now at your store to collect Order #{{orderId}}. Please have it ready.',
    variables: ['storeName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_DELIVERY_ARRIVED_STORE',
    channel: 'sms',
    lang: 'en',
    text: '{{deliveryPartnerName}} has reached your store to pick up Order #{{orderId}}. Please keep the order ready.',
    variables: ['storeName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_DELIVERY_ARRIVED_STORE',
    channel: 'whatsapp',
    lang: 'en',
    text: '🚴 *Delivery Partner at Store*\n\n{{deliveryPartnerName}} is now at your store to collect *Order #{{orderId}}*.\nPlease have the package ready for pickup.',
    variables: ['storeName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_DELIVERY_ARRIVED_STORE',
    channel: 'push',
    lang: 'en',
    title: '🚴 Delivery Partner is at Your Store',
    description:
      '{{deliveryPartnerName}} is here to collect Order #{{orderId}}. Please hand over the package.',
    jsonPayload: {
      type: 'ORDER_DELIVERY_ARRIVED_STORE',
      orderId: '{{orderId}}',
    },
    variables: ['deliveryPartnerName', 'orderId'],
    isActive: true,
  },
];

const ORDER_DELIVERY_PICKED = [
  // EMAIL
  {
    topic: 'ORDER_DELIVERY_PICKED',
    channel: 'email',
    lang: 'en',
    title: '🚚 Your Order is on the Way! – Order #{{orderId}}',
    html: `
      <p>Hi {{userName}},</p>
      <p>Great news! Your order <strong>#{{orderId}}</strong> has just been picked up from the store by <strong>{{deliveryPartnerName}}</strong>.</p>
      <p>It’s now on its way to you. Sit back and relax – we’ll be at your doorstep soon! 🏡</p>
    `,
    text: 'Your order #{{orderId}} is on the way! Picked up by {{deliveryPartnerName}} and will be delivered shortly.',
    variables: ['userName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_DELIVERY_PICKED',
    channel: 'sms',
    lang: 'en',
    text: 'Your order #{{orderId}} is on the way! {{deliveryPartnerName}} has picked it up and will deliver it soon.',
    variables: ['userName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_DELIVERY_PICKED',
    channel: 'whatsapp',
    lang: 'en',
    text: '📦 *Order Picked Up!*\n\nYour order *#{{orderId}}* has been picked up by *{{deliveryPartnerName}}* and is on the way to you.\nGet ready to receive it soon! 🎉',
    variables: ['userName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_DELIVERY_PICKED',
    channel: 'push',
    lang: 'en',
    title: '🎉 Order Picked Up!',
    description:
      '{{deliveryPartnerName}} has picked up your order #{{orderId}}. It’ll be with you soon!',
    jsonPayload: {
      type: 'ORDER_DELIVERY_PICKED',
      orderId: '{{orderId}}',
    },
    variables: ['deliveryPartnerName', 'orderId'],
    isActive: true,
  },
];

const ORDER_DELIVERY_ARRIVED_USER = [
  // EMAIL
  {
    topic: 'ORDER_DELIVERY_ARRIVED_USER',
    channel: 'email',
    lang: 'en',
    title: '🚪 Your Order Has Arrived! – Order #{{orderId}}',
    html: `
      <p>Hi {{userName}},</p>
      <p>Your delivery partner <strong>{{deliveryPartnerName}}</strong> has reached your location with order <strong>#{{orderId}}</strong>.</p>
      <p>Please keep your phone nearby and be ready to receive it. 😊</p>
    `,
    text: 'Hi {{userName}}, your delivery partner {{deliveryPartnerName}} has arrived with order #{{orderId}}. Please be ready to receive it.',
    variables: ['userName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_DELIVERY_ARRIVED_USER',
    channel: 'sms',
    lang: 'en',
    text: 'Hey {{userName}}, your order #{{orderId}} is here! {{deliveryPartnerName}} is waiting to hand it over. 🚪',
    variables: ['userName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_DELIVERY_ARRIVED_USER',
    channel: 'whatsapp',
    lang: 'en',
    text: '📦 *Order Delivered!*\n\nHey {{userName}}, your delivery partner *{{deliveryPartnerName}}* has arrived with your order *#{{orderId}}*.\nPlease collect it promptly. Thank you! 🙌',
    variables: ['userName', 'deliveryPartnerName', 'orderId'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_DELIVERY_ARRIVED_USER',
    channel: 'push',
    lang: 'en',
    title: '🚪 Order Arrived at Your Location!',
    description:
      '{{deliveryPartnerName}} is at your doorstep with order #{{orderId}}. Please collect it now.',
    jsonPayload: {
      type: 'ORDER_DELIVERY_ARRIVED_USER',
      orderId: '{{orderId}}',
    },
    variables: ['deliveryPartnerName', 'orderId'],
    isActive: true,
  },
];

const ORDER_DELIVERED = [
  // EMAIL
  {
    topic: 'ORDER_DELIVERED',
    channel: 'email',
    lang: 'en',
    title: '🎉 Order Delivered Successfully – #{{orderId}}',
    html: `
      <p>Hi {{userName}},</p>
      <p>Your order <strong>#{{orderId}}</strong> has been delivered by <strong>{{deliveryPartnerName}}</strong>.</p>
      <p>We hope everything was perfect! If you enjoyed your experience, don't forget to rate and review. 😊</p>
    `,
    text: 'Hi {{userName}}, your order #{{orderId}} has been delivered by {{deliveryPartnerName}}. We hope you loved it!',
    variables: ['userName', 'orderId', 'deliveryPartnerName'],
    isActive: true,
  },

  // SMS
  {
    topic: 'ORDER_DELIVERED',
    channel: 'sms',
    lang: 'en',
    text: 'Hi {{userName}}, your order #{{orderId}} has been successfully delivered by {{deliveryPartnerName}}. Enjoy! 🍽️',
    variables: ['userName', 'orderId', 'deliveryPartnerName'],
    isActive: true,
  },

  // WHATSAPP
  {
    topic: 'ORDER_DELIVERED',
    channel: 'whatsapp',
    lang: 'en',
    text: '✅ *Order Delivered!*\n\nHi {{userName}}, your order *#{{orderId}}* has just been delivered by *{{deliveryPartnerName}}*.\nWe hope you enjoy your order. Thanks for choosing us! 💚',
    variables: ['userName', 'orderId', 'deliveryPartnerName'],
    isActive: true,
  },

  // PUSH
  {
    topic: 'ORDER_DELIVERED',
    channel: 'push',
    lang: 'en',
    title: '🎉 Order Delivered!',
    description: 'Your order #{{orderId}} has been successfully delivered. Hope you loved it!',
    jsonPayload: {
      type: 'ORDER_DELIVERED',
      orderId: '{{orderId}}',
    },
    variables: ['orderId'],
    isActive: true,
  },
];

const SEND_LOGIN_OTP_SMS_CHANNEL = [
  {
    topic: 'SEND_LOGIN_OTP_SMS_CHANNEL',
    channel: 'sms',
    lang: 'en',
    text: 'Your login OTP is {{otp}}. It is valid for 5 minutes.\n\n{{otp}} is your verification code for login.\n\n#{{otp}} @{{appHash}}', // The appHash enables auto-read
    variables: ['otp', 'appHash'],
    isActive: true,
  },

  {
    topic: 'SEND_LOGIN_OTP_SMS_CHANNEL',
    channel: 'whatsapp',
    lang: 'en',
    text: '*Login Verification*\n\nYour OTP is *{{otp}}*. It is valid for 5 minutes.\nDo not share this code with anyone.',
    variables: ['otp'],
    isActive: true,
  },

  {
    topic: 'SEND_LOGIN_OTP_SMS_CHANNEL',
    channel: 'email',
    lang: 'en',
    title: 'Your Login OTP – {{otp}}',
    html: `
      <p>Hi,</p>
      <p>Your login OTP is <strong>{{otp}}</strong>. It is valid for 5 minutes.</p>
      <p>If you didn't request this code, please ignore this message.</p>
    `,
    text: 'Your login OTP is {{otp}}. It is valid for 5 minutes.',
    variables: ['otp'],
    isActive: true,
  },

  {
    topic: 'SEND_LOGIN_OTP_SMS_CHANNEL',
    channel: 'push',
    lang: 'en',
    title: 'Login OTP',
    description: 'Your login OTP is {{otp}}. Valid for 5 minutes.',
    jsonPayload: {
      type: 'SEND_LOGIN_OTP_SMS_CHANNEL',
      otp: '{{otp}}',
    },
    variables: ['otp'],
    isActive: true,
  },
];

export const eventMapTemplateForAllEvents = {
  PAYMENT_FAILED: PAYMENT_FAILED,
  ORDER_CONFIRMED: ORDER_CONFIRMED,
  ORDER_STORE_ACCEPTED: ORDER_STORE_ACCEPTED,
  DELIVERY_ASSIGN: DELIVERY_ASSIGN,
  ORDER_DELIVERY_ASSIGNED: ORDER_DELIVERY_ASSIGNED,
  ORDER_READY_FOR_PICKUP: ORDER_READY_FOR_PICKUP,
  ORDER_DELIVERY_ARRIVED_STORE,
  ORDER_DELIVERY_PICKED,
  ORDER_DELIVERY_ARRIVED_USER,
  ORDER_DELIVERED,
  SEND_LOGIN_OTP_SMS_CHANNEL,
};
