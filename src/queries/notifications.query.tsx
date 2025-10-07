import { useEffect, useState } from "react";
import NotificationEntity from "@/types/notification.types";

// 🧠 Mock notification data (temporary placeholder)
const mockNotification: NotificationEntity = {
  id: "notif-001",
  title: "System Maintenance Alert",
  message:
    "We’ll be performing scheduled maintenance on the platform this Saturday at 11:00 PM.",
  audience: "All Users",
  method: "Email",
  sentBy: "Admin",
  dateTime: new Date("2025-10-05T23:00:00Z"),
  isScheduled: true,
  recurringType: "One Time",
  status: "Scheduled",
  recipients: [
    { id: "r1", name: "John Doe", email: "john@example.com", status: "Sent" },
    { id: "r2", name: "Jane Smith", email: "jane@example.com", status: "Pending" },
  ],
};

// 🧩 Fetch all notifications (for Notification Center table)
export const fetchNotifications = () => {
  const [data, setData] = useState<NotificationEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setData([mockNotification]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return { data, loading };
};

// 🧩 Fetch single notification by ID (for PreviewNotification)
export const fetchNotificationPreviewQuery = (id: string) => {
  const [data, setData] = useState<NotificationEntity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Mock fetching logic — normally you'd filter or call your GraphQL endpoint here
      setData(mockNotification);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [id]);

  return { data, loading };
};
export default fetchNotifications;