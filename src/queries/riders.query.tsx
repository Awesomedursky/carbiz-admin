import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADMIN_APPROVE_OR_DISAPPROVE_RIDER,
  ADMIN_FETCH_ALL_RIDERS,
  ADMIN_FETCH_ONE_RIDER,
} from "@/api/riders";
import RiderEntity from "@/types/rider.type";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types";
import React from "react";
import { useToast } from "@/hooks/Toast";
import { useDrawerStore } from "@/store/drawer.store";

// const useRidersQuery = () => {
//   const { data, loading, error } = useQuery(ADMIN_FETCH_ALL_RIDERS);

//   if (error) {
//     console.error("Error fetching riders:", error.message);
//   }

//   const riders: RiderEntity[] =
//     data?.RiderOutput?.map((r: any) => ({
//       ...r,
//       createdAt: new Date(r.createdAt),
//       updatedAt: new Date(r.updatedAt),
//       deletedAt: r.deletedAt ? new Date(r.deletedAt) : null,
//     })) || [];

//   return { data: riders, loading, error };
// };

// export default useRidersQuery;

interface AdminFetchAllRidersResponseType {
  AdminFetchAllRiders: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: RiderEntity[];
      pageSize: number;
      total: number;
    };
  };
}

interface approveRiderType {
  AdminApproveOrDisApproveRider: {
    message: string;
    success: boolean;
    payload: RiderEntity;
  };
}

const fetchOrdersQuery = () => {
  const { pageSize, currentPage } = useTableStore();
  const { data, loading, error, fetchMore } = useQuery<
    AdminFetchAllRidersResponseType,
    { params: PaginationQuery }
  >(ADMIN_FETCH_ALL_RIDERS, {
    variables: {
      params: {
        limit: pageSize,
        page: currentPage,
        sortBy: "createdAt",
        sortOrder: "DESC",
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    useTableStore.setState({
      total: data?.AdminFetchAllRiders.payload?.total,
    });
  }, [data?.AdminFetchAllRiders.payload?.total]);
  return {
    data: data?.AdminFetchAllRiders.payload?.data,
    loading,
    error,
    fetchMore,
  };
};

export default fetchOrdersQuery;

export const useFetchRider = () => {
  const { handleError } = useToast();
  type fetchRiderResult = {
    AdminFetchOneRider: {
      success?: boolean;
      message?: string;
      payload?: RiderEntity;
    };
  };

  const [AdminFetchOneRider, { data, loading, error }] =
    useLazyQuery<fetchRiderResult>(ADMIN_FETCH_ONE_RIDER, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching order");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return {
    AdminFetchOneRider,
    data: data?.AdminFetchOneRider?.payload,
    loading,
    error,
  };
};

export const useRiderApproveDisapprove = (riderID: string) => {
  const { pageSize, currentPage } = useTableStore();
  const { closeModal } = useDrawerStore();
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [approveDisapproveRider, { loading }] = useMutation<
    approveRiderType,
    { approve: { approve: boolean }; riderID: string }
  >(ADMIN_APPROVE_OR_DISAPPROVE_RIDER, {
    refetchQueries: [
      {
        query: ADMIN_FETCH_ALL_RIDERS,
        variables: {
          params: {
            limit: pageSize,
            page: currentPage,
            sortBy: "createdAt",
            sortOrder: "DESC",
          },
        },
      },
      {
        query: ADMIN_FETCH_ONE_RIDER,
        variables: { riderID },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.AdminApproveOrDisApproveRider;
      if (!result) {
        handleError(new Error("Invalid"), "Error Updating Rider");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Rider Update Successfully");
        closeModal();
        return;
      }
      handleSuccess(result.message);
      closeModal();
    },
    onError: (error) => {
      handleError(error, "Error Updating Rider");
    },
  });

  return { approveDisapproveRider, loading };
};
