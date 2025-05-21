import { CheckCircle } from "@phosphor-icons/react";
import { Progress } from "@/components/ui/progress";
import { columns } from "@/columns/columns";
import { DataTable } from "@/components/atoms/table";
import { useAuthStore } from "@/store/auth.store";
import { useMerchantProfile } from "@/queries/dashboard";
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

export const payments: Payment[] = [
  {
    id: 1,
    product: "728ed52f",
    created: "2023-10-01",
    orderId: "1234567890",
    paymentStatus: "paid",
    deliveryStatus: "processing",
  },
  {
    id: 2,
    product: "728ed52f",
    created: "2023-10-02",
    orderId: "13332",
    paymentStatus: "cancelled",
    deliveryStatus: "awaiting",
  },
];

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
