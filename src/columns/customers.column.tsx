import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";
import Customer from "@/types/customer.type";
import CustomerActions from "@/components/molecules/customer/customerActions";
import { Badge } from "@/components/ui/badge";

const CustomerColumns: ColumnDef<Customer>[] = [
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
    accessorKey: "customerID",
    header: () => (
      <div className="normal text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none ">
        Customer ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize font-normal py-3.5 normal">
          {row.getValue("customerID")}
        </div>
      );
    },
  },
  {
    accessorKey: "Customer Name",
    header: () => (
      <div className="normal text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none ">
        Customer Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="capitalize font-normal py-3.5 normal">
          {row?.original?.name ?? "-"}
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
        <div className=" font-normal px-7 py-3.">
          {row?.original?.email ?? "-"}
        </div>
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
      return (
        <div className="font-normal px-7 py-3.">
          {row?.original?.phoneNumber ?? "Unknown"}
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
        const { status } = row.original;
  
        const colorMap: Record<string, string> = {
          ACTIVE: "bg-green-100 text-green-700",
          INACTIVE: "bg-red-100 text-red-700",
        };
  
        return (
          <Badge
            className={`uppercase px-2 py-1 text-xs font-medium rounded-md 
              ${colorMap[status?.toUpperCase()] }
              `
          }
          >
           {status}
          </Badge>
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
          {moment(row.getValue("createdAt")).format("DD-MM-YYYY hh:mm A")}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CustomerActions customer={row.original} />,
  },
];

export default CustomerColumns;
