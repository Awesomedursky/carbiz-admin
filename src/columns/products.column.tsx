import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type productsType = {
  name: string;
  email: string;
  phone: string;
  addedOn: string;
};

export const productsColumn: ColumnDef<productsType>[] = [
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
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 capitalize">
          {row.getValue("name")}
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
    accessorKey: "phone",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Phone
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("phone")}</div>
      );
    },
  },
  {
    accessorKey: "addedOn",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Added On
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">{row.getValue("addedOn")}</div>
      );
    },
  },
];
