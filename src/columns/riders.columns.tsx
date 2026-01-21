"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import RiderActions from "@/components/molecules/riders/RiderActions";
import RiderEntity from "@/types/rider.type";

export const RiderColumns: ColumnDef<RiderEntity>[] = [
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
    accessorKey: "riderID",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Rider ID
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {row.original.riderID}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Name
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {`${row.original.firstName} ${row.original.lastName}` || "-"}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Email
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Phone Number
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {row.original.phoneNumber}
      </div>
    ),
  },
  {
    accessorKey: "isApproved",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Status
      </div>
    ),
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
          className={`uppercase px-2 py-1 text-xs font-medium rounded-md ${
            colorMap[displayStatus] || "bg-gray-100 text-gray-700"
          }`}
        >
          {displayStatus}
        </Badge>
      );
    },
  },
  {
    accessorKey: "availabilityStatus",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Availability Status
      </div>
    ),
    cell: ({ row }) => {
      const { availabilityStatus } = row.original;

      const statusText = availabilityStatus?.toLowerCase()

      const colorMap: Record<string, string> = {
        available: "bg-green-100 text-green-700",
        busy_with_an_order: "bg-yellow-100 text-yellow-700",
      };

      return (
        <Badge
          className={`uppercase px-2 py-1 text-xs font-medium rounded-md ${
            colorMap[statusText] || "bg-gray-100 text-gray-700"
          }`}
        >
          {statusText.replaceAll("_", " ") || "unavailable"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Last Updated
      </div>
    ),
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      return (
        <div className=" font-normal py-3.5 capitalize">
          {new Date(updatedAt).toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] ">
        Actions
      </div>
    ),
    cell: ({ row }) => <RiderActions rider={row.original} />,
  },
];

export default RiderColumns;
