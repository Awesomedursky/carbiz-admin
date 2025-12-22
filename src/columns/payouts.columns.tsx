import PayoutActions from "@/components/molecules/payouts/PayoutActions";
import { Checkbox } from "@/components/ui/checkbox";
import { PayoutOutput } from "@/types/payouts.types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const PayoutsColumn: ColumnDef<PayoutOutput>[] = [
  {
    id: "select",
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
    enableHiding: false,
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
    accessorKey: "date",
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
          {row?.original?.merchant?.businessName ||
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
          {row?.original?.merchant !== null ? "Merchant" : "Rider"}
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
          {row.original?.paymentMethod ?? "~~~~"}
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
        switch (status?.toLocaleLowerCase()) {
          case "successful":
            return "bg-[#F6FAF7] text-[#027A48]";
          case "processing":
            return "bg-[#FAF3FE] text-[#7046C6]";
          case "pending":
            return "text-[#96650D] bg-[#FFFBF3]";
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
              <span
                className={`px-2 py-1 rounded text-sm  font-normal capitalize ${statusColor()}`}
              >
                {row?.original?.paymentStatus}
              </span>
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
