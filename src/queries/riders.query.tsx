import { useQuery } from "@apollo/client";
import { ADMIN_FETCH_ALL_RIDERS } from "@/api/riders";

const useRidersQuery = () => {
  const { data, loading, error } = useQuery(ADMIN_FETCH_ALL_RIDERS);

  if (error) {
    console.error("Error fetching riders:", error.message);
  }

  return {
    data: data?.RiderOutput || [],
    loading,
    error,
  };
};

export default useRidersQuery;