export interface FCMNotificationPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export interface SendNotificationRequest {
  tokens: string[];
  payload: FCMNotificationPayload;
}
