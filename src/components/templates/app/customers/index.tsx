import { DataTable } from "@/components/atoms/table";
import CustomerColumns from "@/columns/customers.column";
import fetchCustomersQuery from "@/queries/customers.query";

const Customers = () => {
  const { data, loading } = fetchCustomersQuery();
  return (
    <DataTable
      tableName="Customers"
      columns={CustomerColumns}
      data={data || []}
      loading={loading}
      columnKey="customerID"
    />
  );
};

export default Customers;
