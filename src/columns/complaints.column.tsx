"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ComplaintOutput } from "@/types/complaints.type";
import moment from "moment";
import CompliaintActions from "@/components/molecules/complaints/complaintActions";
import Status, { StatusKey } from "@/lib/statusClass";

export const ComplaintsColumn: ColumnDef<ComplaintOutput>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <div className=" pl-3 md:pl-7">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className=""
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className=" pl-3 md:pl-7">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "customer",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Customer
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        <p className=" text-sm font-medium">{row?.original?.customer?.name}</p>
        <span className=" text-xs">{row?.original?.customer?.email}</span>
      </div>
    ),
  },
  {
    accessorKey: "order",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Order ID
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {row.original.orderID}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Category
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {row.original.category}
      </div>
    ),
  },
  {
    accessorKey: "createdby",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Created AT
      </div>
    ),
    cell: ({ row }) => (
      <div className=" font-normal py-3.5 capitalize">
        {moment(row.original.createdAt).format("DD-MM-YYYY hh:mm A")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <span
          className={`uppercase px-2 py-1 text-xs font-medium rounded-md ${
            Status[status.toLowerCase() as StatusKey] ||
            "bg-gray-200 text-gray-800"
          }`}
        >
          {status.toLowerCase()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Actions
      </div>
    ),
    cell: ({ row }) => <CompliaintActions complaint={row.original} />,
  },
];
