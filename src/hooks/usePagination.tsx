import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useToast } from "./Toast";
import { PaginationQuery } from "@/types/admin.type";

type UsePaginatedQueryProps<TVariables> = {
  query: any;
  variables?: TVariables;
  pagination: PaginationQuery;
  extractData: (response: any) => {
    data: any[];
    total: number;
    message?: string;
  };
};

export function usePaginatedQuery<TVariables = any>({
  query,
  variables,
  pagination,
  extractData,
}: UsePaginatedQueryProps<TVariables>) {
  const { handleError } = useToast();

  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      ...variables,
      paginationQuery: pagination,
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  useEffect(() => {
    if (!error) return;
    if (error.networkError) {
      handleError(
        "Network error. Please check your internet connection and try again."
      );
      return;
    }

    if (error.graphQLErrors?.length) {
      error.graphQLErrors.forEach((err) => {
        handleError(err.message || "Something went wrong");
      });
    }
  }, [error, handleError]);

  const {
    data: tableData = [],
    total = 0,
    message = "",
  } = extractData(data || {});

  return {
    loading,
    error, // still expose for UI conditions
    data: tableData,
    total,
    message,
    refetch,
  };
}
