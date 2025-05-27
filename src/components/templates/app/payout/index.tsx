import { PayoutsColumn } from "@/columns/payouts.columns";
import { DataTable } from "@/components/atoms/table";
import fetchTransactions from "@/queries/transactions.query";

const Payouts = () => {
  const { data, loading } = fetchTransactions();

  console.log("Payouts Data:", data);

  return (
    <div className="space-y-10">
      <div className="bg-white py-10 rounded-2xl">
        {loading && <p className="capitalize">fetching data...</p>}

        {data?.length > 0 && (
          <DataTable
            tableName="Payouts"
            isClickable
            columns={PayoutsColumn}
            data={data}
          />
        )}
      </div>
    </div>
  );
};

export default Payouts;
