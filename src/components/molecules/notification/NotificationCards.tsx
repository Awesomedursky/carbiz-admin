import Analytics from "@/components/atoms/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchAllNotificationMetrics } from "@/queries/notifications.query";
import { Bell, PaperPlaneTilt, Envelope, Clock } from "@phosphor-icons/react";

const analyticIcon = {
  totalSent: Bell,
  sentPush: PaperPlaneTilt,
  sentEmail: Envelope,
  scheduled: Clock,
};

type analyticKey = keyof typeof analyticIcon;

const NotificationCards = () => {
  const { data, loading } = useFetchAllNotificationMetrics();
  const notificationStats = [
    {
      title: "Total Sent",
      value: (data as any)?.totalSent ?? 0,
      name: "totalSent",
      color: "#027A48",
    },
    {
      title: "Sent via Push",
      value: (data as any)?.totalSentViaPush ?? 0,
      name: "sentPush",
      color: "#DC6803",
    },
    {
      title: "Sent via Email",
      value: (data as any)?.totalSentViaEmail ?? 0,
      name: "sentEmail",
      color: "#7046C6",
    },
    {
      title: "Scheduled",
      value: (data as any)?.totalScheduled ?? 0,
      name: "scheduled",
      color: "#155EEF",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {loading
        ? Array(4)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                className="rounded-lg h-24 sm:h-32 md:h-36 lg:h-44"
              />
            ))
        : notificationStats.map(({ title, value, name, color }) => {
            const Icon = analyticIcon[name as analyticKey];
            return (
              <Analytics
                key={name}
                title={title}
                value={value ?? 0}
                iconColor={color}
                icon={Icon}
              />
            );
          })}
    </div>
  );
};

export default NotificationCards;
