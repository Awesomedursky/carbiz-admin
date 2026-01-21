import { FETCH_ONE_ORDER, FETCH_ORDERS } from "@/api/orders";
import { useToast } from "@/hooks/Toast";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import OrderEntity from "@/types/order.type";
import { useLazyQuery } from "@apollo/client";
import React from "react";

export const useFetchAllOrders = () => {
  const { currentPage, pageSize, filters, update, searchTerm, setPageTotal } =
    useTableState("orders");

  const { startDate, endDate, sortOrder, orderStatus, paymentStatus } = filters;


  const pagination= {
        limit: pageSize,
        page: currentPage,
        searchTerm,
        sortOrder,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(orderStatus && {deliveryStatus: orderStatus }),
        ...(paymentStatus && { paymentStatus }),
      }

   const { data, total, message,error, refetch, loading } = usePaginatedQuery({
      query: FETCH_ORDERS,
      pagination,
      extractData: (response) => {
        return {
          data: response?.AdminFetchAllOrdersWithFilter?.payload?.data || [],
          total: response?.AdminFetchAllOrdersWithFilter?.payload?.total || 0,
          message: response?.AdminFetchAllOrdersWithFilter?.message || "",
        };
      },
    });

  // Update total in the table state
  React.useEffect(() => {
    if (total != null) {
      setPageTotal(total);
    }
  }, [total, update]);

  return {
    data: data ?? [],
    loading,
    error,
    refetch,
    message
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
