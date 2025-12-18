import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { productCategoryType } from "@/queries/product-categories.query";
import moment from "moment";
import ProductCategoryActions from "@/components/molecules/product-category/categoryActions";

const ProductCategoryColumn: ColumnDef<productCategoryType>[] = [
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
    accessorKey: "id",
    header: () => (
      <div className="normal text-base font-[500] text-black !bg-[#FAFAFB] py-3.5  !border-none ">
        Product Category ID
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal py-3.5 normal flex items-center gap-1.5">
          <p>{row.original.productCategoryID}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Product Category Name
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row.original.productCategoryName}
        </div>
      );
    },
  },
  {
    accessorKey: "created",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Created At
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {moment(row.original.createdAt).format("YYYY-MM-DD hh:mm A")}
        </div>
      );
    },
  },
  {
    id: "Action",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB]  py-3.5 border-none">
        Action
      </div>
    ),
    cell: ({ row }) => {
      // return <AdminActions admin={row.original} />;
      return <ProductCategoryActions category={row.original} />;
    },
  },
];

export default ProductCategoryColumn;
