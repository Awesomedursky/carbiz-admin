import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface NotificationEntity {
  id: number;
  title: string;
  audience: string;
  method: "Push" | "Email" | "SMS" | "In-App";
  sentBy: string;
  dateTime: string | Date;
  isScheduled: boolean;
  recurringType: "One Time" | "Daily" | "Weekly" | "Bi-Weekly";
  status: "Sent" | "Scheduled";
  message?: string;
}

interface NotificationDetailsProps {
  notification: NotificationEntity;
}

const NotificationDetails: React.FC<NotificationDetailsProps> = ({
  notification,
}) => {
  if (!notification) {
    return (
      <div className="text-center text-gray-500 py-6">
        Loading notification details...
      </div>
    );
  }

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <h2 className="text-xl font-semibold">{notification.title}</h2>
        <p className="text-sm text-gray-500">
          Sent by <span className="font-medium">{notification.sentBy}</span> on{" "}
          {new Date(notification.dateTime).toLocaleString()}
        </p>
      </CardHeader>

      <Separator className="my-3" />

      <CardContent className="space-y-3">
        <p className="text-gray-700 leading-relaxed">{notification.message}</p>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              notification.status === "Sent"
                ? "bg-green-100 text-green-700"
                : notification.status === "Scheduled"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {notification.status}
          </span>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <span className="text-gray-500">Delivery Method</span>
          <span className="font-medium">{notification.method}</span>

          <span className="text-gray-500">Audience</span>
          <span className="font-medium">{notification.audience}</span>

          <span className="text-gray-500">Frequency</span>
          <span className="font-medium">{notification.recurringType}</span>

          <span className="text-gray-500">Created At</span>
          <span className="font-medium">
            {typeof notification.dateTime === "string"
              ? new Date(notification.dateTime).toLocaleString()
              : notification.dateTime.toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationDetails;
