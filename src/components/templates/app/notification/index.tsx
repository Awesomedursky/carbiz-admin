import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/atoms/table";
import { NotificationColumns } from "@/columns/notifications.columns";
import NotificationCards from "@/components/molecules/NotificationCards";
import fetchNotifications from "@/queries/notifications.query";

const NotificationCenter = () => {
  const { data, loading } = fetchNotifications();

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
        isClickable
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
        >
          <Plus className="size-4" />
          Create Notification
        </Button>
      </DataTable>
    </div>
  );
};

export default NotificationCenter;
