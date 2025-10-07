import { DataTable } from "@/components/atoms/table";
import AdminColumns from "@/columns/adminusers.column";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type adminType = {
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
};

const Admins = () => {
  const newData: adminType[] = [];
  // const;

  return (
    <div className="grid">
      {/* <div className="inline-flex justify-end"></div> */}
      <DataTable
        tableName="Admins"
        isClickable
        columns={AdminColumns}
        showSearch={false}
        data={newData}
        actions
      >
        <Button
          variant="default"
          className="md:py-6  border-0 shadow text-sm font-bold"
        >
          <Plus className="size-4" />
          New Admin
        </Button>
      </DataTable>
    </div>
  );
};

export default Admins;
