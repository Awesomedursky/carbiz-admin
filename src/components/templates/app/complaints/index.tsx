import { ComplaintsColumn } from "@/columns/complaints.column";
import { DataTable } from "@/components/atoms/table";
import ComplaintsCards from "@/components/molecules/complaints/cards";
import { useFetchAllComplaints } from "@/queries/complaints.query";

const Complaints = () => {
  const { data, loading } = useFetchAllComplaints();

  return (
    <div className="space-y-6">
      <ComplaintsCards />

      <DataTable
        // isClickable
        tableName="Complaints"
        columns={ComplaintsColumn}
        data={data ?? []}
        columnKey="id"
        loading={loading}
      />
    </div>
  );
};

export default Complaints;
