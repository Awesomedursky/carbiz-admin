import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import Customer from "@/types/customer.type";

// type CustomerType = {
//   customerID: string;
//   name: string;
//   email: string;
//   createdAt: Date;
//   phoneNumber: string;
// };

const CustomerColumns: ColumnDef<Customer>[] = [
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
    accessorKey: "name",
    header: () => (
      <div className="normal text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none ">
        Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 normal">{row.getValue("name")}</div>
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
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Phone
      </div>
    ),
    cell: ({ row }) => {
      const phone = row.getValue("phoneNumber")?.toString();
      return (
        <div className=" font-normal px-7 py-3.">
          {phone?.replaceAll("-", "")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Added on
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {moment(row.getValue("createdAt")).format("DD-MM-YYYY")}
        </div>
      );
    },
  },
];

export default CustomerColumns;
