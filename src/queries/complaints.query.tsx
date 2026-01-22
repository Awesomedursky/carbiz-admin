import {
  FETCH_ALL_COMPLAINTS,
  FETCH_COMPLAINTS_METRICS,
  FETCH_ONE_COMPLAINTS,
  UPDATE_COMPLAINT,
} from "@/api/complaints";
import { useToast } from "@/hooks/Toast";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import { useDrawerStore } from "@/store/drawer.store";
import { ComplaintOutput } from "@/types/complaints.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ADMIN_INITIATE_CUSTOMER_PAYOUT, GET_PAYOUTS } from "@/api/payouts";
import { initiatePayoutType } from "@/components/molecules/complaints/initiateCustomerPayout";

interface complaintMetricsType {
  AdminfetchComplaintMetrics: {
    message: string;
    success: boolean;
    payload: {
      closed: number;
      inProgress: number;
      pending: number;
      percentages: {
        resolved: number;
        inProgress: number;
        closed: number;
        pending: number;
      };
      resolved: number;
      total: number;
    };
  };
}

interface AdminUpdateComplaintType {
  AdminUpdateComplaint: {
    message: string;
    success: boolean;
    payload: ComplaintOutput[];
  };
}

export const useFetchAllComplaints = () => {
  const { pageSize, currentPage, searchTerm, filters, setPageTotal, update } =
    useTableState("complaints");
  const { status, sortOrder, startDate, endDate } = filters;

  const pagination = {
    limit: pageSize,
    page: currentPage,
    sortOrder,
    searchTerm,
    ...(status && { status }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  const { data, loading, error, fetchMore, total, message } = usePaginatedQuery(
    {
      pollInterval: 20000,
      query: FETCH_ALL_COMPLAINTS,
      pagination,
      extractData: (response) => {
        return {
          data:
            response?.AdminFetchAllComplaintsWithFilter?.payload?.data || [],
          total:
            response?.AdminFetchAllComplaintsWithFilter?.payload?.total || 0,
          message: response?.AdminFetchAllComplaintsWithFilter?.message || "",
        };
      },
    },
  );

  React.useEffect(() => {
    if (total != null) {
      setPageTotal(total);
    }
  }, [total, update]);

  return {
    data,
    message,
    loading,
    error,
    fetchMore,
  };
};

export const useFetchComplainMetrics = () => {
  const { data, loading, error } = useQuery<complaintMetricsType>(
    FETCH_COMPLAINTS_METRICS,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  );

  return {
    data: data?.AdminfetchComplaintMetrics?.payload,
    loading,
    error,
  };
};

export const useFetchOneComplaint = (complaintID: string) => {
  const { data, loading, error } = usePaginatedQuery({
    query: FETCH_ONE_COMPLAINTS,
    variables: { complaintID },
    extractData: (response) => {
      return {
        data: response?.AdminfetchaOneComplant?.payload || [],
      };
    },
  });

  return {
    data,
    loading,
    error,
  };
};

interface updateInput {
  closedComplaintsNote?: string;
  resolutionNotes?: string;
  status?: "Resolved" | "InProgress" | "Closed" | "Pending";
}

export const useUpdateComplaint = () => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage, filters } = useTableState("complaints");
  const { closeModal } = useDrawerStore();

  const [adminUpdateComplaint, { loading }] = useMutation<
    AdminUpdateComplaintType,
    { complaintID: string; input: updateInput }
  >(UPDATE_COMPLAINT, {
    refetchQueries: [
      { query: FETCH_COMPLAINTS_METRICS },
      {
        query: FETCH_ALL_COMPLAINTS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortOrder: filters.sortOrder,
          },
        },
      },
    ],
    onCompleted: (data) => {
      handleSuccess(data?.AdminUpdateComplaint?.message);
      closeModal();
    },
    onError: (error) => {
      handleError("Error!", error.message);
    },
  });

  return {
    adminUpdateComplaint,
    updateComplaintLoading: loading,
  };
};

interface AdminInitiateCustomerPayoutType {
  AdminInitiateCustomerPayout: {
    message: string;
    success: boolean;
    payload: any;
  };
}

export const initiateCustomerPayout = () => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage, filters } = useTableState("complaints");
  const { closeModal } = useDrawerStore();

  const [adminInitiatPayout, { loading }] = useMutation<
    AdminInitiateCustomerPayoutType,
    { input: initiatePayoutType }
  >(ADMIN_INITIATE_CUSTOMER_PAYOUT, {
    refetchQueries: [
      { query: FETCH_COMPLAINTS_METRICS },
      { query: GET_PAYOUTS },
      {
        query: FETCH_ALL_COMPLAINTS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortOrder: filters.sortOrder,
          },
        },
      },
    ],
    onCompleted: (data) => {
      handleSuccess(data?.AdminInitiateCustomerPayout?.message);
      closeModal();
    },
    onError: (error) => {
      handleError("Error!", error.message);
    },
  });

  return {
    adminInitiatPayout,
    loading,
  };
};
