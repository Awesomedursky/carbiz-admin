import { Skeleton } from "@/components/ui/skeleton";
import DetailsSection from "../order/DetailsSection";
import { adminEntity } from "@/types";
import { useFetchOneAdmin } from "@/queries/admin.query";

const AdminDetail = ({ admin }: { admin: adminEntity }) => {
  const { data, loading } = useFetchOneAdmin(admin.adminID);

  const filteredData = Object.fromEntries(
    Object.entries(data ?? {}).filter(
      ([key, value]) =>
        !["deletedat", "id"].includes(key.toLowerCase()) &&
        !Array.isArray(value) &&
        key !== "__typename"
    )
  ) as Record<string, unknown>;

  //   const my_completed_payouts = data?.my_completed_payouts;

  if (loading) {
    return (
      <div className="grid w-full p-2.5 md:p-3.5 grid-cols-1 space-y-1.5 h-full">
        {Array.from({ length: 2 }).map((_, p) => (
          <Skeleton key={p} className=" h-30" />
        ))}
      </div>
    );
  }

  return (
    <div className=" p-2.5 md:p-3.5">
      <DetailsSection title="Personal Details" details={filteredData} />
      <DetailsSection title="Completed Payouts" details={{}} />
    </div>
  );
};

export default AdminDetail;
