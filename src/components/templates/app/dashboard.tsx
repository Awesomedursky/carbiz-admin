import { columns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import DashboardCards from "@/components/molecules/DashboardCards";

export type Payment = {
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

export const payments: Payment[] = [];

const Dashboard = () => {
  return (
    <div className="font-satoshi">
      {/* User breadcrumb */}

      {/* New user card */}

      {/* summary card */}
      <div className="pb-6 md:pb-10">
        <DashboardCards />
      </div>

      {/* Recent order logs */}
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default Dashboard;
