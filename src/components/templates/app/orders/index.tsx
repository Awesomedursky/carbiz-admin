import { columns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";

type Payment = {
  id: number;
  product: string;
  created: string;
  orderId: string;
  paymentStatus: "paid" | "cancelled" | "refunded";
  deliveryStatus:
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "awaiting";
};

const payments: Payment[] = [];

const Orders = () => {
  return (
    <div>
      <DataTable
        tableName="Orders"
        isClickable
        columns={columns}
        data={payments}
      />
    </div>
  );
};

export default Orders;
