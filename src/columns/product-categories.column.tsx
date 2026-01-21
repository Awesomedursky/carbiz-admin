import { ColumnDef } from "@tanstack/react-table";
import { productCategoryType } from "@/queries/product-categories.query";
import moment from "moment";
import ProductCategoryActions from "@/components/molecules/product-category/categoryActions";

const ProductCategoryColumn: ColumnDef<productCategoryType>[] = [
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
    accessorKey: "commissionRate",
    header: () => (
      <div className=" text-base font-[500] text-black bg-[#FAFAFB] px-7 py-3.5 border-none">
        Commission Rate
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className=" font-normal px-7 py-3.">
          {row?.original?.commissionRate}
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
