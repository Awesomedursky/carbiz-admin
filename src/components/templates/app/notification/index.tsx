import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/atoms/table";
import { NotificationColumns } from "@/columns/notifications.columns";
import NotificationForm from "@/components/molecules/notification/NotificationForm";

import { useDrawerStore } from "@/store/drawer.store";
import NotificationCards from "@/components/molecules/notification/NotificationCards";
import { useFetchAllNotifications } from "@/queries/notifications.query";

const NotificationCenter = () => {
  const { openModal } = useDrawerStore();
  const { data, loading, message } = useFetchAllNotifications();

  return (
    <div className="space-y-6">
      <NotificationCards />

      <DataTable
        // isClickable
        message={message}
        // tableName="Notification Center"
        columns={NotificationColumns}
        data={data ?? []}
        actions
        columnKey="id"
        loading={loading}
      >
        <Button
          variant="default"
          className="md:py-6 border-0 shadow text-sm font-bold"
          onClick={() =>
            openModal({
              type: "dialog",
              title: "Create New Notification",
              content: NotificationForm,
              placement: "center",
            })
          }
        >
          <Plus className="size-4" />
          Create Notification
        </Button>
      </DataTable>
    </div>
  );
};

export default NotificationCenter;
