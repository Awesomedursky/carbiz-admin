import { productsColumn, productsType } from "@/columns/products.column";
import { DataTable } from "@/components/atoms/table";

const index = () => {
  const productsData: productsType[] = [
    {
      name: "Elizabeth Ali",
      email: "example@gmail.com",
      phone: "1223456789",
      addedOn: "15-3-2024",
    },
  ];
  return (
    <>
      <DataTable
        tableName="Merchants"
        isClickable={true}
        columns={productsColumn}
        data={productsData}
      />
    </>
  );
};

export default index;
