import { FETCH_ONE_ORDER, FETCH_ORDERS } from "@/api/orders";
import { useToast } from "@/hooks/Toast";
import { useTableState } from "@/hooks/useTableState";
import { PaginationQuery } from "@/types/admin.type";
import OrderEntity from "@/types/order.type";
import { useLazyQuery, useQuery } from "@apollo/client";
import React from "react";

interface AdminFetchAllOrdersResponseType {
  AdminFetchAllOrdersWithFilter: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: OrderEntity[];
      pageSize: number;
      total: number;
    };
  };
}
34;
export const useFetchAllOrders = () => {
  const { currentPage, pageSize, filters, update, searchTerm, setPageTotal } =
    useTableState("orders");

  const { startDate, endDate, sortOrder, orderStatus, paymentStatus } = filters;

  const { data, loading, error, refetch } = useQuery<
    AdminFetchAllOrdersResponseType,
    { paginationQuery: PaginationQuery }
  >(FETCH_ORDERS, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        searchTerm,
        sortOrder,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  // Update total in the table state
  React.useEffect(() => {
    if (data?.AdminFetchAllOrdersWithFilter?.payload?.total != null) {
      const total = data.AdminFetchAllOrdersWithFilter.payload.total;
      setPageTotal(total);
    }
  }, [data?.AdminFetchAllOrdersWithFilter?.payload?.total, update]);

  // Refetch whenever relevant filters or pagination change
  React.useEffect(() => {
    refetch();
  }, [
    currentPage,
    pageSize,
    startDate,
    endDate,
    sortOrder,
    orderStatus,
    paymentStatus,
  ]);

  return {
    data: data?.AdminFetchAllOrdersWithFilter?.payload?.data ?? [],
    loading,
    error,
    refetch,
    message: data?.AdminFetchAllOrdersWithFilter?.message,
  };
};

export const useFetchOrder = () => {
  const { handleError } = useToast();
  type FetchOrderResult = {
    AdminfetchaOneOrder: {
      success?: boolean;
      message?: string;
      payload?: OrderEntity;
    };
  };

  const [AdminFetchoneOrder, { data, loading, error }] =
    useLazyQuery<FetchOrderResult>(FETCH_ONE_ORDER, {
      onCompleted: () => {},
      onError: (error) => {
        handleError(error, "Error fetching order");
      },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    });

  return {
    AdminFetchoneOrder,
    data: data?.AdminfetchaOneOrder?.payload,
    loading,
    error,
  };
};
