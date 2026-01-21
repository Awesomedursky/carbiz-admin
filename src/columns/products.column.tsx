import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type productsType = {
  productID: string;
  productName: string;
  price: number;
  priceCurrencyType: string;
  productStock: number;
  productStatus: string;
};

const statusColor = (status: string | null) => {
  switch (status) {
    case "new_arrival":
      return "text-yellow-500 bg-yellow-50";
    case "out_of_stock":
      return "text-red-500 bg-red-50";
    case "available":
      return "text-green-500 bg-green-50";
    default:
      return "text-gray-500";
  }
};

export const productsColumn: ColumnDef<productsType>[] = [
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
    accessorKey: "productName",
    header: () => (
      <div className=" text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none">
        Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="font-normal py-3.5 capitalize">
          {row.getValue("productName")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => (
      <div className=" text-base font-medium text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Price
      </div>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const currency = row.original.priceCurrencyType;

      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "NGN",
      }).format(price);
      return <div className=" font-normal px-7 py-3.5">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "productStock",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Quantity
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.getValue("productStock")}
        </div>
      );
    },
  },
  {
    accessorKey: "productStatus",
    header: () => (
      <div className=" text-base  font-[500] text-black bg-[#FAFAFB] px-7 py-3.5">
        Status
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("productStatus") as string | null;
      const statusColorClass = statusColor(status?.toLowerCase() || "");
      return (
        <div>
          <span
            className={`font-normal px-4 py-3 text-sm ${statusColorClass} rounded-full`}
          >
            {status?.replaceAll("_", " ")}
          </span>
        </div>
      );
    },
  },
];
