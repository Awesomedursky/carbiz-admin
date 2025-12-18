import { PaginationQuery } from "@/types/admin.type";
import { GET_TRANSACTIONS } from "@/api/transactions";
import TransactionEntity from "@/types/transaction.types";
import { useQuery } from "@apollo/client";
import React from "react";
import { useTableState } from "@/hooks/useTableState";

interface TransactionsResponseType {
  AdminFetchAllTransactions: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: TransactionEntity[];
      pageSize: number;
      total: number;
    };
  };
}

const fetchTransactions = () => {
  const { pageSize, currentPage, filters, setPageTotal } =
    useTableState("transactions");
  const { data, loading, error, fetchMore } = useQuery<
    TransactionsResponseType,
    { params: PaginationQuery }
  >(GET_TRANSACTIONS, {
    variables: {
      params: {
        limit: pageSize,
        page: currentPage,
        sortBy: filters?.sortBy,
        sortOrder: filters?.sortOrder,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    if (!data?.AdminFetchAllTransactions.payload) return;
    setPageTotal(data?.AdminFetchAllTransactions?.payload.total);
  }, [data?.AdminFetchAllTransactions.payload]);

  return {
    data: data?.AdminFetchAllTransactions?.payload?.data || [],
    message: data?.AdminFetchAllTransactions?.message,
    loading,
    error,
    fetchMore,
  };
};

export default fetchTransactions;
