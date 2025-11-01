import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import OrderEntity from "@/types/order.type";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import moment from "moment";
import { Link } from "react-router";

export type OrderType = {
  id: string;
  product: string;
  created: string;
  orderId: string;
  paymentStatus: "paid" | "canceled" | "refunded";
  deliveryStatus:
    | "processing"
    | "shipped"
    | "delivered"
    | "canceled"
    | "awaiting_processing";
};

// export type productType = {
//   id: number;
//   product: string;
//   created: string;
//   orderId: string;
//   paymentStatus: string;
//   deliveryStatus: string;
// };

// const status

const OrderColumn: ColumnDef<OrderEntity>[] = [
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
    accessorKey: "orderID",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Order ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 uppercase">
          {row.getValue("orderID")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Created
      </div>
    ),
    cell: ({ row }) => {
      const createdAt = moment(row.getValue("createdAt")).format("DD-MM-YYYY");
      return <div className=" font-normal px-7 py-3.">{createdAt}</div>;
    },
  },

  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Payment
      </div>
    ),
    cell: ({ row }) => {
      //   const status: string | undefined = row.getValue("paymentStatus");
      //   const statusColor = () => {
      //     switch (status?.toLocaleLowerCase()) {
      //       case "paid":
      //         return "bg-[#D1FADF] text-[#027A48]";
      //       case "cancelled":
      //         return "bg-[#FEE4E2] text-[#B42318]";
      //       case "refunded":
      //         return "text-[#DC6803] bg-[#FFF7E1]";
      //       default:
      //         return null;
      //     }
      //   };
      return (
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl capitalize`}>
            {row.getValue("paymentStatus")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "orderId",
  //   header: () => (
  //     <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
  //       Order ID
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className=" font-normal px-7 py-3.">{row.getValue("orderId")}</div>
  //     );
  //   },
  // },
  {
    accessorKey: "orderStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status: string | undefined = row
        ?.getValue("deliveryStatus")
        ?.toString();
      const statusColor = () => {
        switch (status?.toLocaleLowerCase()) {
          case "processing":
            return "bg-[#E2DAF4] text-[#7046C6]";
          case "shipped":
            return "bg-[#FFF7E1] text-[#DC6803]";
          case "canceled":
            return "text-[#B42318] bg-[#FEE4E2]";
          case "delivered":
            return "text-[#027A48] bg-[#D1FADF]";
          case "awaiting_processing":
            return "text-[#343239] bg-[#E6E5E8]";
          default:
            return null;
        }
      };
      return (
        <div className={` font-normal px-7 py-3.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {status?.replaceAll("_", " ")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      console.log(row);
      return (
        <Button>
          <Link to={""}>
            <EyeIcon size={20} />
          </Link>
        </Button>
      );
    },
  },
];

export default OrderColumn;
