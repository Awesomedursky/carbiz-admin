import { GET_CUSTOMERS, GET_ONE_CUSTOMER } from "@/api/customers";
import { useTableState } from "@/hooks/useTableState";
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
  const { currentPage, pageSize, filters, update, searchTerm, setPageTotal } =
    useTableState("customers");
  const { sortOrder, startDate, endDate, status } = filters;
  const { data, loading, error, fetchMore, refetch } = useQuery<
    CustomerPaginatedResponseType,
    { paginationQuery: PaginationQuery }
  >(GET_CUSTOMERS, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        sortOrder,
        searchTerm,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(status && { status }),
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    if (data?.AdminFetchAllCustomersWithFilter?.payload?.total != null) {
      const total = data?.AdminFetchAllCustomersWithFilter.payload.total;
      setPageTotal(total);
    }
  }, [data?.AdminFetchAllCustomersWithFilter.payload?.total, update]);

  React.useEffect(() => {
    refetch();
  }, [currentPage, pageSize, startDate, endDate, sortOrder, status]);

  return {
    data: data?.AdminFetchAllCustomersWithFilter,
    message: data?.AdminFetchAllCustomersWithFilter?.message,
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
