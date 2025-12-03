import { useMutation, useQuery } from "@apollo/client";
import {
  ADMIN_APPROVE_OR_DISAPPROVE_RIDER,
  ADMIN_ASSIGN_RIDER_TO_ORDER,
  ADMIN_FETCH_ALL_AVAILABLE_RIDERS,
  ADMIN_FETCH_ALL_RIDERS,
  ADMIN_FETCH_ONE_RIDER,
} from "@/api/riders";
import RiderEntity from "@/types/rider.type";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types/admin.type";
import React from "react";
import { useToast } from "@/hooks/Toast";
import { useDrawerStore } from "@/store/drawer.store";
import { FETCH_ONE_ORDER } from "@/api/orders";

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

export const useFetchRider = (id: string) => {
  type fetchRiderResult = {
    AdminFetchOneRider: {
      success?: boolean;
      message?: string;
      payload?: RiderEntity;
    };
  };
  const { data, loading, error, refetch } = useQuery<fetchRiderResult>(
    ADMIN_FETCH_ONE_RIDER,
    {
      variables: { riderID: id },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    }
  );

  return { data: data?.AdminFetchOneRider.payload, loading, error, refetch };
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

export const useFetchAllAvailableRiders = () => {
  interface allAvailableRiderResponse {
    AdminFetchAllAvailableRiders: {
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
  const { pageSize, currentPage } = useTableStore();
  const { data, loading, error, fetchMore } = useQuery<
    allAvailableRiderResponse,
    { params: PaginationQuery }
  >(ADMIN_FETCH_ALL_AVAILABLE_RIDERS, {
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
      total: data?.AdminFetchAllAvailableRiders.payload?.total,
    });
  }, [data?.AdminFetchAllAvailableRiders.payload?.total]);

  return {
    data: data?.AdminFetchAllAvailableRiders.payload?.data,
    loading,
    error,
    fetchMore,
  };
};

export const useAssignOrdertoRider = (orderID: string) => {
  type assignType = {
    AdminAssignAnOrderToArider: {
      success?: boolean;
      message?: string;
      payload?: any;
    };
  };
  const { closeModal } = useDrawerStore();
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [assignOrdertoRider, { loading }] = useMutation<
    assignType,
    { orderID: string; riderID: string }
  >(ADMIN_ASSIGN_RIDER_TO_ORDER, {
    refetchQueries: [
      {
        query: FETCH_ONE_ORDER,
        variables: {
          orderID,
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.AdminAssignAnOrderToArider;
      if (!result) {
        handleError(new Error("Invalid"), "Error Updating Rider");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Rider Update Successfully");
        closeModal();
        return;
      }
      handleSuccess(result?.message || "Order Assigned to Rider Successfully");
      closeModal();
    },
    onError: (error) => {
      handleError(error, "Error Updating Rider");
    },
  });

  return { assignOrdertoRider, assignRiderLoading: loading };
};
