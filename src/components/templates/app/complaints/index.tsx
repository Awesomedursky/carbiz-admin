import { ComplaintsColumn } from "@/columns/complaints.column";
import { DataTable } from "@/components/atoms/table";
import ComplaintsCards from "@/components/molecules/complaints/cards";
import { useFetchAllComplaints } from "@/queries/complaints.query";

const Complaints = () => {
  const { data, loading } = useFetchAllComplaints();
  console.log(data);
  return (
    <div className="space-y-6">
      <ComplaintsCards />

      <DataTable
        // isClickable
        tableName="Complaints"
        columns={ComplaintsColumn}
        data={data ?? []}
        actions
        columnKey="id"
        loading={loading}
      ></DataTable>
    </div>
  );
};

export default Complaints;
