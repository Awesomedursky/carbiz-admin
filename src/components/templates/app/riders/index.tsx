// import { Download } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/atoms/table";
import { RiderColumns } from "@/columns/riders.columns";
import useRidersQuery from "@/queries/riders.query";
import RiderEntity from "@/types/rider.type";

const Riders = () => {
  // ✅ Correct typing using RiderEntity
  const { data, loading } = useRidersQuery() as {
    data: RiderEntity[];
    loading: boolean;
  };

  return (
    <DataTable
      tableName="Riders"
      columns={RiderColumns}
      data={data}
      actions
      columnKey="riderID"
      loading={loading}
    >
      {/* <Button
        variant="secondary"
        className="md:py-6 border-0 bg-white shadow text-sm font-bold flex items-center gap-2"
      >
        <Download className="size-4" />
        Export Data
      </Button> */}
    </DataTable>
  );
};

export default Riders;
