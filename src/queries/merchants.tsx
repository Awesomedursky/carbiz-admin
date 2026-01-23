import {
  GET_MERCHANTS,
  GET_ONE_MERCHANT,
  VERIFY_MERCHANT,
} from "@/api/merchants";
import { useToast } from "@/hooks/Toast";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import { useDrawerStore } from "@/store/drawer.store";
import { useMutation } from "@apollo/client";
import React from "react";

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
  const { sortOrder, startDate, endDate, status } = filters;

  const pagination = {
    limit: pageSize,
    page: currentPage,
    sortOrder,
    searchTerm,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
    ...(status && { status }),
  };

  const { data, loading, error, fetchMore, total, message } = usePaginatedQuery(
    {
      query: GET_MERCHANTS,
      pagination,
      extractData: (data) => {
        return {
          data: data?.AdminFetchAllMerchantsWithFilter?.payload?.data,
          total: data?.AdminFetchAllMerchantsWithFilter?.payload?.total,
          message: data?.AdminFetchAllMerchantsWithFilter?.message,
        };
      },
    },
  );

  React.useEffect(() => {
    if (total != null) {
      setPageTotal(total);
    }
  }, [total]);

  return {
    data,
    message,
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
  const { data, loading, error, refetch } = usePaginatedQuery({
    query: GET_ONE_MERCHANT,
    variables: { merchantID: id },
    extractData: (data) => {
      return {
        data: data?.AdminFetchOneMerchant?.payload,
        message: data?.AdminFetchOneMerchant?.message,
        success: data?.AdminFetchOneMerchant?.success,
      };
    },
  });
  return { data, loading, error, refetch };
};

export const useVerifyMerchant = (merchantID: string) => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage, filters } = useTableState("merchants");
  const { sortOrder } = filters;
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
