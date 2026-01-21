"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import NotificationActions from "@/components/molecules/notification/NotificationActions";
import { NotificationCenterOutput } from "@/types/notification-center.type";

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

export const NotificationColumns: ColumnDef<NotificationCenterOutput>[] = [
  {
    id: "id",
    header: () => (
      <div className=" pl-3  text-base font-[500] text-black !bg-[#FAFAFB] !border-none">
        #
      </div>
    ),
    cell: ({ row }) => (
      <div className=" pl-3 text-base font-[500] text-black !border-none ">
        {row.index + 1}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Title
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {row?.original?.notificationTitle}
      </div>
    ),
  },
  {
    accessorKey: "audience",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Audience
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {row?.original?.notificationAudience.replaceAll("_", " ")}
      </div>
    ),
  },
  {
    accessorKey: "method",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Method
      </div>
    ),
    cell: ({ row }) => {
      const { deliveryMethod } = row.original;
      const colorVariant =
        deliveryMethod === "Email"
          ? "outline"
          : deliveryMethod === "Push_Notification"
            ? "secondary"
            : "default";

      return (
        <Badge variant={colorVariant} className="capitalize">
          {deliveryMethod?.replaceAll("_", " ")}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "sentBy",
  //   header: () => (
  //     <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
  //       Sent By
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className=" font-normal py-3.5 capitalize">
  //       {row.original.sentBy}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "dateTime",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Date/Time
      </div>
    ),
    cell: ({ row }) => {
      const { createdAt: dateTime } = row.original;
      const formattedDate =
        typeof dateTime === "string"
          ? new Date(dateTime).toLocaleString()
          : dateTime.toLocaleString();

      return (
        <div className=" font-normal py-3.5 capitalize">
          <span className="text-gray-500">
            {/* {isScheduled ? "Scheduled:" : "Sent:"} */}
          </span>{" "}
          {formattedDate}
        </div>
      );
    },
  },
  {
    accessorKey: "recurringType",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Recurring Type
      </div>
    ),
    cell: ({ row }) => {
      const { makeBroadcastRecurringType: recurringType } = row.original;
      const colorMap: Record<string, string> = {
        One_Type: " bg-green-100 text-green-700",
        Daily: "bg-blue-100 text-blue-700",
        Weekly: "bg-purple-100 text-purple-700",
        "Bi-Weekly": "bg-indigo-100 text-indigo-700",
      };

      return (
        <Badge
          className={`uppercase px-2 py-1 text-xs font-medium rounded-md ${
            colorMap[recurringType] || "bg-gray-100 text-gray-800"
          }`}
        >
          {recurringType === "One_Type"
            ? "One Time"
            : recurringType.replaceAll("_", " ")}
        </Badge>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: () => (
  //     <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
  //       Status
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const { status } = row.original;
  //     const colorMap: Record<string, string> = {
  //       Sent: "bg-green-100 text-green-700",
  //       Scheduled: "bg-purple-100 text-purple-700",
  //     };

  //     return (
  //       <span
  //         className={`px-2 py-1 rounded-md text-xs font-medium ${
  //           colorMap[status] || "bg-gray-200 text-gray-800"
  //         }`}
  //       >
  //         {status}
  //       </span>
  //     );
  //   },
  // },
  {
    id: "actions",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Actions
      </div>
    ),
    cell: ({ row }) => <NotificationActions notification={row.original} />,
  },
];
