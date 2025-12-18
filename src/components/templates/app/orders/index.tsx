// import { columns } from "@/columns/columns";
import { ordersColumns } from "@/columns/orders.column";
import { DataTable } from "@/components/atoms/table";
import { useFetchAllOrders } from "@/queries/orders.query";

const Orders = () => {
  const { data, loading, message } = useFetchAllOrders();
  return (
    <div>
      <DataTable
        message={message}
        tableKey="orders"
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
