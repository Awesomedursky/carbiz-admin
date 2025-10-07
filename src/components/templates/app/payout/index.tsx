import { PayoutsColumn } from "@/columns/payouts.columns";
import { DataTable } from "@/components/atoms/table";
import fetchTransactions from "@/queries/transactions.query";

const Payouts = () => {
  const { data, loading } = fetchTransactions();

  console.log("Payouts Data:", data);

  return (
    <DataTable
      tableName="Payouts"
      isClickable
      columns={PayoutsColumn}
      data={data}
      loading={loading}
    />
  );
};

export default Payouts;
