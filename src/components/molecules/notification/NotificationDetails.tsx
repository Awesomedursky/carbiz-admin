// import React from "react";
// import { useFetchOneNotification } from "@/queries/notifications.query";
// import { NotificationCenterOutput } from "@/types/notification-center.type";
// import { Skeleton } from "@/components/ui/skeleton";

// interface NotificationDetailsProps {
//   notification: NotificationCenterOutput;
// }

// const NotificationDetails: React.FC<NotificationDetailsProps> = ({
//   notification,
// }) => {
//   const { data, loading } = useFetchOneNotification(
//     notification?.notificationID
//   );

//   if (loading) {
//     return (
//       <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
//         {Array.from({ length: 2 }).map((_, p) => (
//           <Skeleton key={p} className=" h-30" />
//         ))}
//       </div>
//     );
//   }

//   return <div>Notificaton</div>;
// };

// export default NotificationDetails;
