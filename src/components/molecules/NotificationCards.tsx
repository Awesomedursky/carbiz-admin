import { Bell, PaperPlaneTilt, Envelope, Clock } from "@phosphor-icons/react";
import Analytics from "../atoms/analytics";
import { Skeleton } from "../ui/skeleton";

const analyticIcon = {
  totalSent: Bell,
  sentPush: PaperPlaneTilt,
  sentEmail: Envelope,
  scheduled: Clock,
};

type analyticKey = keyof typeof analyticIcon;

const NotificationCards = () => {
  // Mock data for now — replace with your API data later
  const loading = false;
  const notificationStats = [
    {
      title: "Total Sent",
      value: 160,
      name: "totalSent",
      color: "#027A48",
    },
    {
      title: "Sent via Push",
      value: 56,
      name: "sentPush",
      color: "#DC6803",
    },
    {
      title: "Sent via Email",
      value: 104,
      name: "sentEmail",
      color: "#7046C6",
    },
    {
      title: "Scheduled",
      value: 19,
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
