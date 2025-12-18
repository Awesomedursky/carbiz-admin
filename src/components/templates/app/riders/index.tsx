import { DataTable } from "@/components/atoms/table";
import { RiderColumns } from "@/columns/riders.columns";
import useRidersQuery from "@/queries/riders.query";

const Riders = () => {
  const { data, loading, message } = useRidersQuery();

  return (
    <DataTable
      tableKey="riders"
      message={message}
      tableName="Riders"
      columns={RiderColumns}
      data={data ?? []}
      columnKey="riderID"
      loading={loading}
    />
  );
};

export default Riders;
