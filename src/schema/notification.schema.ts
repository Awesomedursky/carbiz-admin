// src/schema/notification.schema.ts
import { z } from "zod";

export const NotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  audience: z.string().min(1, "Audience is required"),
  method: z.enum(["Email", "Push", "SMS", "In-App"]),
  recurringType: z.enum(["One Time", "Daily", "Weekly", "Bi-Weekly"]),
  isScheduled: z.boolean().optional(),
  scheduledDate: z.string().optional(),
  dateTime: z.string().optional(),
});

export type NotificationSchemaType = z.infer<typeof NotificationSchema>;
