import { DataTable } from "@/components/atoms/table";
import AdminColumns from "@/columns/adminusers.column";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDrawerStore } from "@/store/drawer.store";
import NewAdminForm from "@/components/organisms/form/newAdmin.form";
import { useAdminQuery } from "@/queries/admin.query";

const Admins = () => {
  const { data, loading } = useAdminQuery();

  const { openModal } = useDrawerStore();

  const onOpenModal = () => {
    openModal({
      type: "dialog",
      content: NewAdminForm,
      props: { type: false },
    });
  };

  return (
    <div className="grid">
      {/* <div className="inline-flex justify-end"></div> */}
      <DataTable
        loading={loading}
        tableName="Admins"
        isClickable
        columns={AdminColumns}
        showSearch={false}
        data={Array.isArray(data) ? data : []}
        actions
      >
        <Button
          onClick={onOpenModal}
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
