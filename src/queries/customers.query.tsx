import { GET_CUSTOMERS, GET_ONE_CUSTOMER } from "@/api/customers";
import useTableStore from "@/store/table.store";
import { PaginationQuery } from "@/types/admin.type";
import Customer from "@/types/customer.type";
import { useQuery } from "@apollo/client";
import React from "react";

interface CustomerPaginatedResponseType {
  AdminFetchAllCustomersWithFilter: {
    message: string;
    success: boolean;
    payload: {
      currentPage: number;
      data: Customer[];
      pageSize: number;
      total: number;
    };
  };
}

interface CustomerPreviewResponseType {
  AdminFetchOneCustomer: {
    message: string;
    success: boolean;
    payload: Customer;
  };
}

const fetchCustomersQuery = () => {
  const { pageSize, currentPage, searchTerm } = useTableStore();
  const { data, loading, error, fetchMore } = useQuery<
    CustomerPaginatedResponseType,
    { paginationQuery: PaginationQuery }
  >(GET_CUSTOMERS, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        sortBy: "createdAt",
        sortOrder: "DESC",
        searchTerm: searchTerm,
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    useTableStore.setState({
      total: data?.AdminFetchAllCustomersWithFilter.payload?.total,
    });
  }, [data?.AdminFetchAllCustomersWithFilter.payload?.total]);

  return {
    data: data?.AdminFetchAllCustomersWithFilter,
    loading,
    error,
    fetchMore,
  };
};

export default fetchCustomersQuery;

export const fetchCustomerPreviewQuery = (customerID: string) => {
  const { data, loading, error } = useQuery<
    CustomerPreviewResponseType,
    { customerID: string }
  >(GET_ONE_CUSTOMER, {
    variables: { customerID },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  return {
    data: data?.AdminFetchOneCustomer.payload,
    loading,
    error,
  };
};
