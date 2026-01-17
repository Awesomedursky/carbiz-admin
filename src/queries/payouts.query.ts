import { PaginationQuery } from "@/types/admin.type";
import {
  ADMIN_CANCEL_PAYOUT,
  ADMIN_INITIATE_PAYOUT,
  FETCH_ONE_PAYOUT,
  // GET_ONE_PAYOUT_STATUS,
  GET_PAYOUTS,
} from "@/api/payouts";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useTableState } from "@/hooks/useTableState";
import { useToast } from "@/hooks/Toast";
import { PayoutOutput } from "@/types/payouts.types";

interface payoutResponseType {
  AdminFetchAllPayoutsWithFilter: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: PayoutOutput[];
      pageSize: number;
      total: number;
    };
  };
}

// interface payoutStatusResponseType {
//   AdmingetPayoutStatus: {
//     success: boolean;
//     message: string;
//     payload: any;
//   };
// }

interface initiatePayoutRes {
  AdminInitiatePayout: {
    success: boolean;
    message: string;
    payload: any;
  };
}

export type initiatePayoutType = {
  paymentMethod: string;
  paymentNote?: string;
  payoutId?: string;
  transactionReference?: string;
};

const payoutQuery = () => {
  const { pageSize, currentPage, filters, setPageTotal } =
    useTableState("payouts");
  const { data, loading, error, fetchMore } = useQuery<
    payoutResponseType,
    { paginationQuery: PaginationQuery }
  >(GET_PAYOUTS, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        sortOrder: filters?.sortOrder,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    if (!data?.AdminFetchAllPayoutsWithFilter?.payload) return;
    setPageTotal(data?.AdminFetchAllPayoutsWithFilter?.payload.total);
  }, [data?.AdminFetchAllPayoutsWithFilter?.payload]);

  // const {
  //   data: payoutStatus,
  //   loading: payoutStatusLoading,
  //   error: payoutStatusError,
  // } = useQuery<payoutStatusResponseType, { payoutID: string }>(
  //   GET_ONE_PAYOUT_STATUS,
  //   {
  //     variables: { payoutID: payoutID || "" },
  //     nextFetchPolicy: "cache-first",
  //     fetchPolicy: "cache-and-network",
  //     skip: fetchStatus && !!payoutID,
  //   }
  // );

  return {
    // payouts list
    data: data?.AdminFetchAllPayoutsWithFilter?.payload?.data || [],
    message: data?.AdminFetchAllPayoutsWithFilter?.message,
    loading,
    error,
    fetchMore,
  };
};

export default payoutQuery;

export const approvePayout = (payoutID: string) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [initiatePayout, { loading: initiatePayoutLoading }] = useMutation<
    initiatePayoutRes,
    { input: initiatePayoutType }
  >(ADMIN_INITIATE_PAYOUT, {
    refetchQueries: [
      { query: GET_PAYOUTS },
      ...(payoutID
        ? [{ query: FETCH_ONE_PAYOUT, variables: { payoutID } }]
        : []),
    ],
    onCompleted: (data) => {
      const result = data?.AdminInitiatePayout;
      if (!result) {
        handleError(new Error("Invalid"), "Error Initiating Payout");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Payout initiation unsuccessful");
        return;
      }

      handleSuccess(result?.message || "Payout initiated successfully");
    },
    onError: (error) => {
      handleError(error, "Payout failed");
    },
  });
  return {
    initiatePayout,
    initiatePayoutLoading,
  };
};

export const cancelPayout = (payoutID: string) => {
  const { handleError, handleInfo, handleSuccess } = useToast();
  const [cancelPayoutMutation, { loading: cancelPayoutLoading }] = useMutation<
    { AdminCancelPayout: { success: boolean; message: string; payload: any } },
    { input: { payoutId: string; reason: string } }
  >(ADMIN_CANCEL_PAYOUT, {
    refetchQueries: [
      { query: GET_PAYOUTS },
      ...(payoutID
        ? [{ query: FETCH_ONE_PAYOUT, variables: { payoutID } }]
        : []),
    ],
    onCompleted: (data) => {
      const result = data?.AdminCancelPayout;
      if (!result) {
        handleError(new Error("Invalid"), "Error Cancelling Payout");
        return;
      }
      if (!result.success) {
        handleInfo(result.message || "Payout cancellation unsuccessful");
        return;
      }

      handleSuccess(result?.message || "Payout cancelled successfully");
    },
    onError: (error) => {
      handleError(error, "Payout Cancel failed");
    },
  });
  return {
    cancelPayoutMutation,
    cancelPayoutLoading,
  };
};

interface payoutPreviewResponseType {
  AdminFetchOnePayout: {
    sucess: boolean;
    message: string;
    payload: PayoutOutput;
  };
}

export const fetchOnePayout = (payoutID: string) => {
  const {
    data: singlePayoutDetails,
    loading: singlePayoutLoading,
    error: singlePayoutError,
  } = useQuery<payoutPreviewResponseType, { payoutID: string }>(
    FETCH_ONE_PAYOUT,
    {
      variables: { payoutID: payoutID || "" },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    }
  );
  return {
    singlePayoutDetails: singlePayoutDetails?.AdminFetchOnePayout?.payload,
    singlePayoutLoading,
    singlePayoutError,
  };
};
