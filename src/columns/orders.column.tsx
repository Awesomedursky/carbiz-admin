import { Checkbox } from "@/components/ui/checkbox";
import OrderEntity from "@/types/order.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router";

export const ordersColumns: ColumnDef<OrderEntity>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className=" pl-1 sm:pl-3 md:pl-7">
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
      <div className=" pl-1 sm:pl-3 md:pl-7">
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
    accessorKey: "items",
    header: () => (
      <div className="text-base font-[500] text-black !bg-[#FAFAFB] p-2 sm:px-3 md:py-3.5 !border-none">
        Product Name
      </div>
    ),
    cell: ({ row }) => {
      const items = row.getValue("items");
      // handle both array or object safely
      const productName = Array.isArray(items)
        ? items[0]?.product?.productName
        : items &&
          typeof items === "object" &&
          "product" in items &&
          (items as { product?: { productName?: string } }).product
            ?.productName;

      return (
        <div className="font-normal p-2 md:py-2.5 uppercase">
          {productName ?? "-"}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAT",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5 border-none">
        Created
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {moment(row.getValue("createdAT")).format("DD MMM, YYYY hh:mm A")}
        </div>
      );
    },
  },
  {
    accessorKey: "orderID",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Order ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal p-2  md:py-2.5">
          {row.getValue("orderID")}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
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
        <div className={` font-normal p-2  md:py-2.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {row.getValue("paymentStatus") ?? "-"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] p-2  sm:px-3 md:py-3.5">
        Order Status
      </div>
    ),
    cell: ({ row }) => {
      const rawStatus = row.getValue("orderStatus");
      const statusStr = String(rawStatus ?? "");
      const statusColor = () => {
        switch (statusStr.toLowerCase()) {
          case "processing":
            return "bg-[#E2DAF4] text-[#7046C6]";
          case "shipped":
            return "bg-[#FFF7E1] text-[#DC6803]";
          case "canceled":
            return "text-[#B42318] bg-[#FEE4E2]";
          case "delivered":
            return "text-[#027A48] bg-[#D1FADF]";
          case "awaiting":
            return "text-[#343239] bg-[#E6E5E8]";
          case "packed_and_ready_for_pickup":
            return "text-[#343239] bg-[#E6E5E8]";
          default:
            return null;
        }
      };
      const displayStatus = statusStr.replaceAll("_", " ");
      return (
        <div className={` font-normal p-2  md:py-2.5 `}>
          <span className={`px-3 py-1 rounded-2xl ${statusColor()} capitalize`}>
            {displayStatus || "-"}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div className=" text-base  font-[500] text-black  p-2  sm:px-3 md:py-3.5">
          <Eye
            className=" text-3xl size-5 text-[#4F4C55] cursor-pointer"
            onClick={() =>
              navigate(`/orders/${row?.original?.orderID}`, {
                relative: "route",
              })
            }
          />
        </div>
      );
    },
  },
];
