import {
  FETCH_ALL_COMPLAINTS,
  FETCH_COMPLAINTS_METRICS,
  UPDATE_COMPLAINT,
} from "@/api/complaints";
import { useToast } from "@/hooks/Toast";
import { useDrawerStore } from "@/store/drawer.store";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types/admin.type";
import { ComplaintOutput } from "@/types/complaints.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";

interface AdminFetchAllComplaintsWithFiltType {
  AdminFetchAllComplaintsWithFiltType: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: ComplaintOutput[];
      pageSize: number;
      total: number;
    };
  };
}

interface complaintMetricsType {
  AdminfetchComplaintMetrics: {
    message: string;
    success: boolean;
    payload: any;
  };
}

interface AdminFetchoneComplaintType {
  AdminfetchaOneComplant: {
    message: string;
    success: boolean;
    payload: ComplaintOutput[];
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
  const { pageSize, currentPage } = useTableStore();
  const { data, loading, error, fetchMore } = useQuery<
    AdminFetchAllComplaintsWithFiltType,
    { params: PaginationQuery }
  >(FETCH_ALL_COMPLAINTS, {
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
      total: data?.AdminFetchAllComplaintsWithFiltType.payload.total,
    });
  }, [data?.AdminFetchAllComplaintsWithFiltType.payload.total]);

  return {
    data: data?.AdminFetchAllComplaintsWithFiltType?.payload,
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
    }
  );

  return {
    data: data?.AdminfetchComplaintMetrics?.payload,
    loading,
    error,
  };
};

export const useFetchOneComplaint = (complainID: string) => {
  const { data, loading, error } = useQuery<
    AdminFetchoneComplaintType,
    { complainID: string }
  >(FETCH_ALL_COMPLAINTS, {
    variables: {
      complainID,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: data?.AdminfetchaOneComplant?.payload,
    loading,
    error,
  };
};

export const useUpdateComplaint = () => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage } = useTableStore();
  const { closeModal } = useDrawerStore();

  const [adminUpdateComplaint, { loading }] = useMutation<
    AdminUpdateComplaintType,
    { complaintID: string; input: any }
  >(UPDATE_COMPLAINT, {
    refetchQueries: [
      {
        query: FETCH_ALL_COMPLAINTS,
        variables: {
          params: {
            limit: pageSize,
            page: currentPage,
            sortBy: "createdAt",
            sortOrder: "DESC",
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
