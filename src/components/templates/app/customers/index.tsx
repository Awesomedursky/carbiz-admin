import { DataTable } from "@/components/atoms/table";
import CustomerColumns from "@/columns/customers.column";
import fetchCustomersQuery from "@/queries/customers.query";

const Customers = () => {
  const { data, loading } = fetchCustomersQuery();
  return (
    <DataTable
      message={data?.message}
      tableName="Customers"
      columns={CustomerColumns}
      data={data?.payload?.data || []}
      loading={loading}
      columnKey="customerID"
    />
  );
};

export default Customers;
