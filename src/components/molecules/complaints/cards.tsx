import Analytics from "@/components/atoms/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchComplainMetrics } from "@/queries/complaints.query";
import {
  CheckCircle,
  HourglassSimpleMedium,
  ClockAfternoon,
} from "@phosphor-icons/react";
import { MailCheckIcon } from "lucide-react";

const analyticIcon = {
  resolved: CheckCircle,
  pending: HourglassSimpleMedium,
  inProgress: ClockAfternoon,
  closed: MailCheckIcon,
};

type analyticKey = keyof typeof analyticIcon;

const ComplaintsCards = () => {
  const { loading, data } = useFetchComplainMetrics();
  console.log(data);

  const complaintsCard = [
    {
      title: "Resolved Complaints",
      value: data?.resolved ?? 0,
      name: "resolved",
      color: "#4DA167",
    },
    {
      title: "Pending Complaints",
      value: data?.pending ?? 0,
      name: "pending",
      color: "#DC6803",
    },
    {
      title: "In-Progress Complaints",
      value: data?.inProgress ?? 0,
      name: "inProgress",
      color: "#7046C6",
    },
    {
      title: "Closed Complaints",
      value: data?.closed ?? 0,
      name: "closed",
      color: "#0337C1",
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
        : complaintsCard.map(({ title, value, name, color }) => {
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

export default ComplaintsCards;
