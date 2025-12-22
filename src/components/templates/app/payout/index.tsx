import { PayoutsColumn } from "@/columns/payouts.columns";
import { DataTable } from "@/components/atoms/table";
import payoutQuery from "@/queries/payouts.query";

const Payouts = () => {
  const { data, loading, message } = payoutQuery();

  return (
    <DataTable
      tableKey="payouts"
      message={message}
      tableName="Payouts"
      isClickable
      columns={PayoutsColumn}
      data={data ?? []}
      loading={loading}
    />
  );
};

export default Payouts;
