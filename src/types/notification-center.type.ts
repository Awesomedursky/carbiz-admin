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
  broadcastDateTime: string;
  createdAt: Date;
  deletedAt: Date;
  deliveryMethod: "Email" | "Push_Notification" | undefined;
  id: number;
  makeBroadcastRecurringType: "One_Type" | "Daily" | "Bi_Weekly" | "Weekly";
  notificationAudience: "Merchants" | "Riders" | "Customers" | "All_Users";
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
