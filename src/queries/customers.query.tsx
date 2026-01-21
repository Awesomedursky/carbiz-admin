import { GET_CUSTOMERS, GET_ONE_CUSTOMER } from "@/api/customers";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import React from "react";

const fetchCustomersQuery = () => {
  const { currentPage, pageSize, filters, update, searchTerm, setPageTotal } =
    useTableState("customers");

  const { sortOrder, startDate, endDate, status } = filters;

const pagination = {
  limit: pageSize,
  page: currentPage,
  sortOrder,
  searchTerm,
  ...(startDate && { startDate }),
  ...(endDate && { endDate }),
  ...(status && { status }),
}

  const { data, loading, error, fetchMore,total,message } = usePaginatedQuery({
    query: GET_CUSTOMERS,
    pagination,
    extractData: (response) => {
      return {
        data:
          response?.AdminFetchAllCustomersWithFilter?.payload?.data || [],
          total:
          response?.AdminFetchAllCustomersWithFilter?.payload?.total || 0,
        message:
          response?.AdminFetchAllCustomersWithFilter?.message || "",
      };
    }
  })


  React.useEffect(() => {
    if (total != null) {
      setPageTotal(total);
    }
  }, [total, update]);

  return {
    data,
    message,
    loading,
    error,
    fetchMore,
  };
};

export default fetchCustomersQuery;

export const fetchCustomerPreviewQuery = (customerID: string) => {
  const { data, loading, error } = usePaginatedQuery({
    query: GET_ONE_CUSTOMER,
    variables: { customerID },
    extractData: (response) => {
      return {
        data: response?.AdminFetchOneCustomer?.payload
      };
    }
  });

  // const { data, loading, error } = useQuery<
  //   CustomerPreviewResponseType,
  //   { customerID: string }
  // >(GET_ONE_CUSTOMER, {
  //   variables: { customerID },
  //   fetchPolicy: "cache-and-network",
  //   nextFetchPolicy: "cache-first",
  // });

  return {
    data,
    loading,
    error,
  };
};
