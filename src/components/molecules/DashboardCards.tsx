import { ArrowSwapHorizontal, MoneySend, People, Car } from "iconsax-reactjs";
import Analytics from "../atoms/analytics";
import { useFetchAdminMetrics } from "@/queries/dashboard";
import { Skeleton } from "../ui/skeleton";

const analyticIcon = {
  product: ArrowSwapHorizontal,
  revenue: MoneySend,
  customer: People,
  rider: Car,
};

type analyticKey = keyof typeof analyticIcon;
const DashboardCards = () => {
  const { merchantCount, customerCount, revenue, ridersCount } =
    useFetchAdminMetrics();
  const { loading, data } = merchantCount;

  const dashboardAnalytics = [
    {
      title: "Revenue",
      value: "0",
      name: "revenue",
      color: "#DC6803",
    },
    {
      title: "Merchant",
      value: data?.AdminFetchMerchantCount?.payload,
      name: "product",
      color: "#027A48",
    },
    {
      title: "Customer",
      value: customerCount?.data?.AdminFetchCustomerCount?.payload,
      name: "customer",
      color: "#7046C6",
    },
    {
      title: "Rider",
      value: ridersCount?.data?.AdminFetchRiderCount?.payload,
      name: "rider",
      color: "#0046C8",
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {loading &&
      revenue?.loading &&
      customerCount?.loading &&
      ridersCount?.loading
        ? Array(4)
            .fill(0)
            .map((_, idx) => (
              <Skeleton
                key={idx}
                className=" rounded-lg h-24 sm:h-32 md:h-36 lg:h-40"
              />
            ))
        : dashboardAnalytics.map(({ title, value, name, color }) => (
            <Analytics
              key={name}
              title={title}
              value={value ?? 0}
              iconColor={color}
              icon={analyticIcon[name as analyticKey]}
              isCurrency={name == "revenue"}
            />
          ))}
    </div>
  );
};

export default DashboardCards;
