import {
  FETCH_PRODUCT,
  GET_MERCHANTS,
  GET_ONE_MERCHANT,
  VERIFY_MERCHANT,
} from "@/api/merchants";
import { useToast } from "@/hooks/Toast";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types";
import MerchantData from "@/types/merchants.type";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
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
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
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

export const useVerifyMerchant = () => {
  const { handleError, handleSuccess } = useToast();

  const [approveOrDisApprove, { loading }] = useMutation<
    VerifyMerchantResponseType,
    VerifyMerchantInput
  >(VERIFY_MERCHANT, {
    onCompleted: (data) => {
      handleSuccess(data?.AdminApproveOrDisApproveMerchant?.message);
    },
    onError: (error) => {
      handleError("Update profile error", error.message);
    },
  });

  return { mutate: approveOrDisApprove, loading };
};

interface fetchOneProduct {
  fetchOneProduct: {
    success: boolean;
    message: string;
    payload: any;
  };
}
export const useFetchProduct = () => {
  const { handleError } = useToast();

  const [fetchOneProduct, { data, loading, error }] =
    useLazyQuery<fetchOneProduct>(FETCH_PRODUCT, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching product");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return {
    fetchOneProduct,
    data: data?.fetchOneProduct?.payload,
    loading,
    error,
  };
};
