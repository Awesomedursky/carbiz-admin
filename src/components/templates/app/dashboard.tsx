import { ordersColumns } from "@/columns/orders.column";
import { DataTable } from "@/components/atoms/table";
import DashboardCards from "@/components/molecules/DashboardCards";
import fetchOrdersQuery from "@/queries/orders.query";

const Dashboard = () => {
  const { data, loading } = fetchOrdersQuery();
  return (
    <div className="font-satoshi">
      {/* User breadcrumb */}

      {/* New user card */}

      {/* summary card */}
      <div className="pb-6 md:pb-10">
        <DashboardCards />
      </div>

      {/* Recent order logs */}
      <DataTable
        loading={loading}
        columnKey="orderID"
        columns={ordersColumns}
        data={data || []}
      />
    </div>
  );
};

export default Dashboard;
