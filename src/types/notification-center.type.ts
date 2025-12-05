export interface NotificationMetricsOutput {
  audienceBreakdown: [AudienceMetricsOutput];
  methodBreakdown: [DeliveryMethodMetricsOutput];
  totalDelivered: number;
  totalFailed: number;
  totalRecipients: number;
  totalScheduled: number;
  totalSent: number;
  totalSentViaEmail: number;
  totalSentViaPush: number;
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
