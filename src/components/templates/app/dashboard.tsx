import { ordersColumns } from "@/columns/orders.column";
import { DataTable } from "@/components/atoms/table";
import DashboardCards from "@/components/molecules/DashboardCards";
import { Spinner } from "@/components/ui/spinner";
import { useAdminProfile } from "@/queries/dashboard";
import { useFetchAllOrders } from "@/queries/orders.query";

const Dashboard = () => {
  const { data, loading, message } = useFetchAllOrders();
  const { loading: profileLoading } = useAdminProfile();

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="text-primary size-10 " />
      </div>
    );
  }

  return (
    <div className="font-satoshi">
      <div className="pb-6 md:pb-10">
        <DashboardCards />
      </div>

      <DataTable
        message={message}
        tableKey="orders"
        tableName="Recent Orders"
        loading={loading}
        columnKey="orderID"
        columns={ordersColumns}
        data={data || []}
      />
    </div>
  );
};

export default Dashboard;
