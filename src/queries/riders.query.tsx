import { useQuery } from "@apollo/client";
import { ADMIN_FETCH_ALL_RIDERS } from "@/api/riders";
import RiderEntity from "@/types/rider.type";

const useRidersQuery = () => {
  const { data, loading, error } = useQuery(ADMIN_FETCH_ALL_RIDERS);

  if (error) {
    console.error("Error fetching riders:", error.message);
  }

  const riders: RiderEntity[] =
    data?.RiderOutput?.map((r: any) => ({
      ...r,
      createdAt: new Date(r.createdAt),
      updatedAt: new Date(r.updatedAt),
      deletedAt: r.deletedAt ? new Date(r.deletedAt) : null,
    })) || [];

  return { data: riders, loading, error };
};

export default useRidersQuery;
