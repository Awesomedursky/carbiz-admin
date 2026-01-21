import { DataTable } from "@/components/atoms/table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/drawer.store";
import CategoryForm from "@/components/organisms/form/categoryForm";
import { useFetchAllProductCategoryQuery } from "@/queries/product-categories.query";
import ProductCategoryColumn from "@/columns/product-categories.column";

const ProductCategory = () => {
  const { data: rawData, loading,message } = useFetchAllProductCategoryQuery();
  const data = rawData;

  console.log("Product Category Data:", data);

  const { openModal } = useDrawerStore();

  const onOpenModal = () => {
    openModal({
      type: "dialog",
      content: CategoryForm,
      props: { type: false },
    });
  };

  return (
    <div className="">
      {/* <div className="inline-flex justify-end"></div> */}
      <DataTable
        tableKey="products"
        loading={loading}
        tableName="Product Categories"
        message={message}
        columns={ProductCategoryColumn}
        showSearch={false}
        data={Array.isArray(data) ? data : []}
        actions
      >
        <Button
          onClick={onOpenModal}
          variant="default"
          className="md:py-6  border-0 shadow text-sm font-bold"
        >
          <Plus className="size-4" />
          Create Product Category
        </Button>
      </DataTable>
    </div>
  );
};

export default ProductCategory;
