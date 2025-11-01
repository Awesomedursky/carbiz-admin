"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import NotificationActions from "@/components/molecules/notification/NotificationActions";

export type NotificationEntity = {
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
  scheduledDate?: string;
};

export const NotificationColumns: ColumnDef<NotificationEntity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        className="h-4 w-4 accent-primary cursor-pointer"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(e.target.checked)}
        className="h-4 w-4 accent-primary cursor-pointer"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "audience",
    header: "Audience",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.audience}</div>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => {
      const { method } = row.original;
      const colorVariant =
        method === "Email"
          ? "outline"
          : method === "Push"
          ? "secondary"
          : "default";

      return (
        <Badge variant={colorVariant} className="capitalize">
          {method}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sentBy",
    header: "Sent By",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.sentBy}</div>
    ),
  },
  {
    accessorKey: "dateTime",
    header: "Date/Time",
    cell: ({ row }) => {
      const { dateTime, isScheduled } = row.original;
      const formattedDate =
        typeof dateTime === "string"
          ? new Date(dateTime).toLocaleString()
          : dateTime.toLocaleString();

      return (
        <div className="text-sm text-gray-800">
          <span className="text-gray-500">
            {isScheduled ? "Scheduled:" : "Sent:"}
          </span>{" "}
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "recurringType",
    header: "Recurring Type",
    cell: ({ row }) => {
      const { recurringType } = row.original;
      const colorMap: Record<string, string> = {
        "One Time": "bg-gray-100 text-gray-800",
        Daily: "bg-blue-100 text-blue-700",
        Weekly: "bg-purple-100 text-purple-700",
        "Bi-Weekly": "bg-indigo-100 text-indigo-700",
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            colorMap[recurringType] || "bg-gray-100 text-gray-800"
          }`}
        >
          {recurringType}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      const colorMap: Record<string, string> = {
        Sent: "bg-green-100 text-green-700",
        Scheduled: "bg-purple-100 text-purple-700",
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            colorMap[status] || "bg-gray-200 text-gray-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <NotificationActions notification={row.original} />,
  },
];
