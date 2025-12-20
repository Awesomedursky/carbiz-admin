import { PayoutsColumn } from "@/columns/payouts.columns";
import { DataTable } from "@/components/atoms/table";
import payoutQuery from "@/queries/payouts.query";

const Payouts = () => {
  const { data, loading, singlePayoutDetails } = payoutQuery(
    "CARBIZ_PAYOUT_ID_123"
  );

  console.log("Single Payout Details:", singlePayoutDetails);

  console.log("Payouts Data:", data);

  return (
    <DataTable
      tableKey="payout"
      tableName="Payouts"
      isClickable
      columns={PayoutsColumn}
      data={[]}
      loading={loading}
    />
  );
};

export default Payouts;
