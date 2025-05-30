import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/atoms/table";
import { productsColumn } from "@/columns/products.column";
import { useFetchMerchantProducts } from "@/queries/products";

const Products = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading } = useFetchMerchantProducts(id || "");

  console.log("Products data:", data);

  return (
    <div className="space-y-10">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2.5 cursor-pointer"
      >
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Products
        </h4>
      </button>

      <div className="bg-white py-10 px-6 rounded-md space-y-10">
        <DataTable
          columns={productsColumn}
          isClickable
          columnKey={"productID"}
          loading={loading}
          data={data || []}
          tableName="Products"
        />
      </div>
    </div>
  );
};

export default Products;
