import {
  GET_MERCHANTS,
  GET_ONE_MERCHANT,
  VERIFY_MERCHANT,
} from "@/api/merchants";
import { useToast } from "@/hooks/Toast";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types";
import MerchantData from "@/types/merchants.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";

interface MerchantPaginatedResponseType {
  AdminFetchAllMerchants: {
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
  message: string;
  payload: {
    merchantID: string;
    isVerified: boolean;
  };
  status: number;
  success: boolean;
}

const useMerchantQuery = () => {
  const { pageSize, currentPage } = useTableStore();

  const { data, loading, error, fetchMore } = useQuery<
    MerchantPaginatedResponseType,
    { params: PaginationQuery }
  >(GET_MERCHANTS, {
    variables: {
      params: {
        limit: pageSize,
        page: currentPage,
        sortBy: "createdAt",
        sortOrder: "DESC",
      },
    },
  });

  React.useEffect(() => {
    useTableStore.setState({
      total: data?.AdminFetchAllMerchants.payload.total,
    });
  }, [data?.AdminFetchAllMerchants.payload.total]);

  return {
    data: data?.AdminFetchAllMerchants.payload.data,
    loading,
    error,
    fetchMore,
  };
};

export default useMerchantQuery;

type VerifyMerchantInput = {
  approve: boolean;
  merchantID: string;
};

export const useFetchOneMerchant = (id: string) => {
  const { data, loading, error } = useQuery<MerchantPreviewResponseType>(
    GET_ONE_MERCHANT,
    { variables: { merchantID: id } }
  );

  return { data: data?.AdminFetchOneMerchant.payload, loading, error };
};

export const useVerifyMerchant = () => {
  const { handleError, handleSuccess } = useToast();

  const [approveOrDisApprove, { loading }] = useMutation<
    VerifyMerchantResponseType,
    VerifyMerchantInput
  >(VERIFY_MERCHANT, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      handleError("Update profile error", error.message);
    },
  });

  return { mutate: approveOrDisApprove, loading };
};
