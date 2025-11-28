import MerchantAction from "@/components/molecules/merchant/MerchantActions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Merchant from "@/types/merchants.type";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

const MerchantColumn: ColumnDef<Merchant>[] = [
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
    id: "merchantID",
    accessorKey: "merchantID",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Merchant Id
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {row.original.merchantID}
        </div>
      );
    },
  },
  {
    accessorKey: "businessName",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Merchant Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {row.getValue("businessName")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Email
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5">{row.getValue("email")}</div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Phone
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.5">
          {row.getValue("phoneNumber")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB]">
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
    accessorKey: "createdAt",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Added On
      </div>
    ),
    cell: ({ row }) => {
      const addedOn = moment(row.getValue("createdAt")).format("DD-MM-YYYY");
      return <div className=" font-normal px-7 py-3.5">{addedOn}</div>;
    },
  },
  {
    id: "actions",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Actions
      </div>
    ),
    cell: ({ row }) => <MerchantAction merchant={row.original} />,
  },
];
export default MerchantColumn;
