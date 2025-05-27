import { Checkbox } from "@/components/ui/checkbox";
import TransactionEntity from "@/types/transaction.types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const PayoutsColumn: ColumnDef<TransactionEntity>[] = [
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
    accessorKey: "merchant",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Merchant
      </div>
    ),
    cell: ({ row }) => {
      const merchant = row.getValue(
        "merchant"
      ) as TransactionEntity["merchant"];
      const merchantName = merchant?.businessName || "Unknown Merchant";

      return (
        <div className=" font-normal py-3.5 uppercase">{merchantName}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Date
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date | string;
      const formattedDate = moment(date).format("DD-MM-YYYY");
      return <div className=" font-normal px-7 py-3.">{formattedDate}</div>;
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
        <div className=" font-normal px-7 py-3.">{row.getValue("amount")}</div>
      );
    },
  },

  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Payment Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row.getValue("paymentStatus");
      const statusColor = () => {
        switch (status?.toLocaleLowerCase()) {
          case "paid":
            return "bg-[#D1FADF] text-[#027A48]";
          case "cancelled":
            return "bg-[#FEE4E2] text-[#B42318]";
          case "refunded":
            return "text-[#DC6803] bg-[#FFF7E1]";
          default:
            return null;
        }
      };
      return (
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl capitalize ${statusColor()}`}>
            {row.getValue("paymentStatus")}
          </span>
        </div>
      );
    },
  },
];
