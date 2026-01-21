"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComplaintOutput } from "@/types/complaints.type";
import moment from "moment";
import CompliaintActions from "@/components/molecules/complaints/complaintActions";
import Status, { StatusKey } from "@/lib/statusClass";

export const ComplaintsColumn: ColumnDef<ComplaintOutput>[] = [
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
    accessorKey: "title",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Complaint Title
      </div>
    ),
    cell: ({ row }) => (
      <div className="py-3.5 capitalize font-normal">
        <p className=" clamp-2 max-w-[150px] text-sm font-medium">
          {row.original.title}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "details",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Complaint Details
      </div>
    ),
    cell: ({ row }) => (
      <div className="py-3.5 font-normal capitalize">
        <p className="clamp-2 max-w-[120px] text-sm font-medium break-words">
          {row.original.description}
        </p>
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
