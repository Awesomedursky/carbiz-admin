import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/atoms/table";
import { NotificationColumns } from "@/columns/notifications.columns";
import NotificationCards from "@/components/molecules/NotificationCards";
import NotificationForm from "@/components/molecules/NotificationForm";
import { useState } from "react";

import fetchNotifications from "@/queries/notifications.query";

import { useDrawerStore } from "@/store/drawer.store";

const NotificationCenter = () => {
  const { data, loading } = fetchNotifications();
  const { openModal } = useDrawerStore();

  const [, setNotifications] = useState<any[]>(data || []);
  const [] = useState(false);

  const mappedData =
    data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      message: item.message,
      audience: item.audience,
      method: item.method,
      sentBy: item.sentBy,
      dateTime: item.dateTime,
      isScheduled: item.isScheduled ?? false,
      recurringType: item.recurringType ?? "",
      status: item.status ?? "",
    })) || [];

  return (
    <div className="space-y-6">
      <NotificationCards />

      <DataTable
        // isClickable
        tableName="Notification Center"
        columns={NotificationColumns}
        data={mappedData}
        actions
        columnKey="id"
        loading={loading}
      >
        <Button
          variant="default"
          className="md:py-6 border-0 shadow text-sm font-bold"
          onClick={() =>
            openModal({
              title: "Create New Notification",
              content: NotificationForm,
              width: 600,
              placement: "center",
              showCloseIcon: false,
              description: "Fill the correct information in the field provided below.",
              props: {
                onCreate: (newNotification: any) => {
                  console.log("Created notification:", newNotification);

                  setNotifications((prev) => [...prev, newNotification]);
                },
              },
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
