import { PaginationQuery } from "@/types/admin.type";
import { GET_TRANSACTIONS } from "@/api/transactions";
import useTableStore from "@/store/table.store";
import TransactionEntity from "@/types/transaction.types";
import { useQuery } from "@apollo/client";
import React from "react";

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
  const { pageSize, currentPage } = useTableStore();
  const { data, loading, error, fetchMore } = useQuery<
    TransactionsResponseType,
    { params: PaginationQuery }
  >(GET_TRANSACTIONS, {
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
    if (!data?.AdminFetchAllTransactions.payload) return;

    useTableStore.setState({
      total: data?.AdminFetchAllTransactions.payload.total,
    });
  }, [data?.AdminFetchAllTransactions.payload]);

  return {
    data: data?.AdminFetchAllTransactions?.payload?.data || [],
    loading,
    error,
    fetchMore,
  };
};

export default fetchTransactions;
