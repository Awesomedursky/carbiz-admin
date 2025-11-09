import { DataTable } from "@/components/atoms/table";
import { NotificationColumns } from "@/columns/notifications.columns";
// import fetchNotifications from "@/queries/notifications.query";
import ComplaintsCards from "@/components/molecules/complaints/cards";

const Complaints = () => {
  //   const { data, loading } = fetchNotifications();

  //   const mappedData =
  //     data?.map((item: any) => ({
  //       id: item.id,
  //       title: item.title,
  //       message: item.message,
  //       audience: item.audience,
  //       method: item.method,
  //       sentBy: item.sentBy,
  //       dateTime: item.dateTime,
  //       isScheduled: item.isScheduled ?? false,
  //       recurringType: item.recurringType ?? "",
  //       status: item.status ?? "",
  //     })) || [];

  return (
    <div className="space-y-6">
      <ComplaintsCards />

      <DataTable
        // isClickable
        tableName="Complaints"
        columns={NotificationColumns}
        data={[]}
        actions
        columnKey="id"
        // loading={loading}
      ></DataTable>
    </div>
  );
};

export default Complaints;
