// import { columns } from "@/columns/columns";
import { ordersColumns } from "@/columns/orders.column";
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
        columns={ordersColumns}
        data={data || []}
      />
    </div>
  );
};

export default Orders;
