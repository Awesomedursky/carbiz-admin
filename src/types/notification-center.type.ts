export interface NotificationMetricsOutput {
  audienceBreakdown: [AudienceMetricsOutput];
  methodBreakdown: [DeliveryMethodMetricsOutput];
  totalDelivered: Number;
  totalFailed: Number;
  totalRecipients: Number;
  totalScheduled: Number;
  totalSent: Number;
  totalSentViaEmail: Number;
  totalSentViaPush: Number;
}

export interface NotificationCenterOutput {
  broadcastDateTime: Date;
  createdAt: Date;
  deletedAt: Date;
  deliveryMethod: string;
  id: Number;
  makeBroadcastRecurringType: string;
  notificationAudience: string;
  notificationID: string;
  notificationMessage: string;
  notificationTitle: string;
  updatedAt: Date;
}

interface AudienceMetricsOutput {
  audience: string;
  count: Number;
  percentage: Number;
}

interface DeliveryMethodMetricsOutput {
  count: Number;
  method: string;
  percentage: Number;
}
