import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MerchantTableType = {
  businessName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  merchandID?: string;
};

const MerchantColumn: ColumnDef<MerchantTableType>[] = [
  {
    id: 'id',
    accessorKey: "merchandID",
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
    accessorKey: "businessName",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Name
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
        <div className=" font-normal px-7 py-3.">{row.getValue("email")}</div>
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
        <div className=" font-normal px-7 py-3.">
          {row.getValue("phoneNumber")}
        </div>
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
      return <div className=" font-normal px-7 py-3.">{addedOn}</div>;
    },
  },
];
export default MerchantColumn;
