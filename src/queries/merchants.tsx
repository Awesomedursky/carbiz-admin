import {
  GET_MERCHANTS,
  GET_ONE_MERCHANT,
  VERIFY_MERCHANT,
} from "@/api/merchants";
import { useToast } from "@/hooks/Toast";
import { useTableState } from "@/hooks/useTableState";
import { useDrawerStore } from "@/store/drawer.store";
import { PaginationQuery } from "@/types/admin.type";
import MerchantData from "@/types/merchants.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";

interface MerchantPaginatedResponseType {
  AdminFetchAllMerchantsWithFilter: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: MerchantData[];
      pageSize: number;
      total: number;
    };
  };
}

interface MerchantPreviewResponseType {
  AdminFetchOneMerchant: {
    message: string;
    success: boolean;
    payload: MerchantData;
  };
}

interface VerifyMerchantResponseType {
  AdminApproveOrDisApproveMerchant: {
    message: string;
    payload: {
      merchantID: string;
      isVerified: boolean;
    };
    status: number;
    success: boolean;
  };
}

const useMerchantQuery = () => {
  const { pageSize, currentPage, searchTerm, filters, setPageTotal } =
    useTableState("merchants");

  const { sortBy, sortOrder, startDate, endDate, status } = filters;

  const { data, loading, error, fetchMore, refetch } = useQuery<
    MerchantPaginatedResponseType,
    { paginationQuery: PaginationQuery }
  >(GET_MERCHANTS, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        sortBy,
        sortOrder,
        searchTerm,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(status && { status }),
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    if (data?.AdminFetchAllMerchantsWithFilter?.payload?.total != null) {
      const total = data?.AdminFetchAllMerchantsWithFilter.payload.total;
      setPageTotal(total);
    }
  }, [data?.AdminFetchAllMerchantsWithFilter.payload.total]);

  React.useEffect(() => {
    refetch();
  }, [currentPage, pageSize, startDate, endDate, sortBy, sortOrder, status]);

  return {
    data: data?.AdminFetchAllMerchantsWithFilter.payload.data,
    message: data?.AdminFetchAllMerchantsWithFilter.message,
    loading,
    error,
    fetchMore,
  };
};

export default useMerchantQuery;

type VerifyMerchantInput = {
  approve: { approve: boolean };
  merchantID: string;
};

export const useFetchOneMerchant = (id: string) => {
  const { data, loading, error, refetch } =
    useQuery<MerchantPreviewResponseType>(GET_ONE_MERCHANT, {
      variables: { merchantID: id },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return { data: data?.AdminFetchOneMerchant.payload, loading, error, refetch };
};

export const useVerifyMerchant = (merchantID: string) => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage, filters } = useTableState("merchants");
  const { sortBy, sortOrder } = filters;
  const { closeModal } = useDrawerStore();

  const [approveDisApproveMerchant, { loading: merchantLoading }] = useMutation<
    VerifyMerchantResponseType,
    VerifyMerchantInput
  >(VERIFY_MERCHANT, {
    refetchQueries: [
      {
        query: GET_MERCHANTS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy,
            sortOrder,
          },
        },
      },
      { query: GET_ONE_MERCHANT, variables: { merchantID } },
    ],
    onCompleted: (data) => {
      handleSuccess(data?.AdminApproveOrDisApproveMerchant?.message);
      closeModal();
    },
    onError: (error) => {
      handleError("Update profile error", error.message);
    },
  });

  return {
    approveDisApproveMerchant,
    merchantLoading,
  };
};
