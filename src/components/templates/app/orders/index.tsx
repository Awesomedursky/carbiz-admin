import { columns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import fetchOrdersQuery from "@/queries/orders.query";

const Orders = () => {
  const { data, loading } = fetchOrdersQuery();
  return (
    <div>
      <DataTable
        loading={loading}
        columnKey="orderID"
        tableName="Orders"
        isClickable
        columns={columns}
        data={data || []}
      />
    </div>
  );
};

export default Orders;
