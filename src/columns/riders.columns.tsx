"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import RiderActions from "@/components/molecules/RiderActions";
import RiderEntity from "@/types/rider.type";

export const RiderColumns: ColumnDef<RiderEntity>[] = [
  {
    accessorKey: "riderID",
    header: "Rider ID",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">{row.original.riderID}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="text-gray-800 font-medium">{row.original.name}</div>
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
    accessorKey: "isApproved",
    header: "Status",
    cell: ({ row }) => {
      const { isApproved, status } = row.original;
      const displayStatus = isApproved
        ? "APPROVED"
        : status === "disabled"
        ? "DISABLED"
        : "PENDING";

      const colorMap: Record<string, string> = {
        APPROVED: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        DISABLED: "bg-red-100 text-red-700",
      };

      return (
        <Badge
          className={`capitalize px-2 py-1 text-xs font-medium rounded-md ${
            colorMap[displayStatus] || "bg-gray-100 text-gray-700"
          }`}
        >
          {displayStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Updated",
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

export default RiderColumns;