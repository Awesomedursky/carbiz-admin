// src/schema/notification.schema.ts
import { z } from "zod";

export const NotificationSchema = z.object({
  broadcastDateTime: z.string().optional(),
  deliveryMethod: z.enum(["Email", "Push_Notification",]),
  makeBroadcastRecurringType: z.string().optional(),
  time: z.string().optional(),
  recurring: z.boolean().optional(),
  notificationAudience: z.enum([
    "Merchants",
    "Riders",
    "Customers",
    "All_Users",
  ]),
  notificationMessage: z.string().min(1, "Message is required"),
  notificationTitle: z.string().min(1, "Title is required"),
});

export type NotificationSchemaType = z.infer<typeof NotificationSchema>;
