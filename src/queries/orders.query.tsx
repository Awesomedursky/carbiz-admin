import { FETCH_ORDERS } from "@/api/orders";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types";
import OrderEntity from "@/types/order.type";
import { useQuery } from "@apollo/client";
import React from "react";

interface AdminFetchAllOrdersResponseType {
  AdminFetchAllOrders: {
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

const fetchOrdersQuery = () => {
  const { pageSize, currentPage } = useTableStore();
  const { data, loading, error, fetchMore } = useQuery<
    AdminFetchAllOrdersResponseType,
    { params: PaginationQuery }
  >(FETCH_ORDERS, {
    variables: {
      params: {
        limit: pageSize,
        page: currentPage,
        sortBy: "createdAT",
        sortOrder: "DESC",
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    useTableStore.setState({
      total: data?.AdminFetchAllOrders.payload?.total,
    });
  }, [data?.AdminFetchAllOrders.payload?.total]);

  return {
    data: data?.AdminFetchAllOrders.payload?.data,
    loading,
    error,
    fetchMore,
  };
};

export default fetchOrdersQuery;
