"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import RiderActions from "@/components/molecules/RiderActions";

export type RiderEntity = {
  riderId: string;
  email: string;
  phoneNumber: string;
  status: "APPROVED" | "PENDING" | "INACTIVE";
  updatedAt: string;
};


export const RiderColumns: ColumnDef<RiderEntity>[] = [
  {
    accessorKey: "riderId",
    header: "Rider ID",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">{row.original.riderId}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.phoneNumber}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      const colorMap: Record<string, string> = {
        APPROVED: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        INACTIVE: "bg-gray-100 text-gray-700",
      };

      return (
        <Badge
          className={`capitalize px-2 py-1 text-xs font-medium rounded-md ${
            colorMap[status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return (
        <div className="text-sm text-gray-800">
          {new Date(updatedAt).toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <RiderActions rider={row.original} />,
  },
];
