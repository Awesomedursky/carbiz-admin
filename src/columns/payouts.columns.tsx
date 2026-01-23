import PayoutActions from "@/components/molecules/payouts/PayoutActions";
import { Badge } from "@/components/ui/badge";
import { PayoutOutput } from "@/types/payouts.types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const PayoutsColumn: ColumnDef<PayoutOutput>[] = [
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
    accessorKey: "payoutID",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Payout ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 uppercase">
          {row?.original?.payoutID}
        </div>
      );
    },
  },
  {
    accessorKey: "created-date",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Created Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {moment(row?.original?.createdAt).format("DD/MM/YYYY") !==
          "Invalid date"
            ? moment(row?.original?.createdAt).format("DD/MM/YYYY")
            : "~~~~"}
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        User Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5">
          {row.original?.customer?.name ||
            row?.original?.merchant?.businessName ||
            `${row?.original?.rider?.firstName} ${row?.original?.rider?.lastName}`}
        </div>
      );
    },
  },
  {
    accessorKey: "usertype",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        User Type
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5">
          {row?.original?.customer !== null
            ? "Customer"
            : row?.original?.merchant !== null
              ? "Merchant"
              : "Rider"}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Amount
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          ₦{row.original?.netPayout}
        </div>
      );
    },
  },
  {
    accessorKey: "method",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Payout Method
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.original?.paymentMethod?.replaceAll("_", " ") ?? "~~~~"}
        </div>
      );
    },
  },

  {
    accessorKey: "date",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Payment Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {moment(row?.original?.payoutAt).format("DD/MM/YYYY") !==
          "Invalid date"
            ? moment(row?.original?.payoutAt).format("DD/MM/YYYY")
            : "~~~~"}
        </div>
      );
    },
  },

  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB]">
        Payment Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("paymentStatus");
      const statusColor = () => {
        switch (status?.toLowerCase()) {
          case "successful":
          case "approved":
            return "bg-[#F6FAF7] text-[#027A48]";
          case "processing":
            return "bg-[#FAF3FE] text-[#7046C6]";
          case "pending":
            return "text-[#96650D] bg-[#FFFBF3]";
          case "cancelled":
          case "failed":
            return "text-[#B42318] bg-[#FEE4E2]";
          default:
            return null;
        }
      };
      return (
        <div>
          {row?.original?.paymentStatus && (
            <div>
              <Badge
                className={`uppercase px-2 py-1 text-xs font-medium rounded-md ${statusColor()}`}
              >
                {row?.original?.paymentStatus?.toLowerCase()}
              </Badge>
            </div>
          )}
        </div>
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
    cell: ({ row }) => <PayoutActions payout={row.original} />,
  },
];
