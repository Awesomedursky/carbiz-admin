import {
  ADD_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  FETCH_ALL_PRODUCT_CATEGORY,
  FETCH_ONE_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_CATEGORY,
} from "@/api/product-categories";
import { Type } from "@/components/organisms/form/categoryForm";
import { useToast } from "@/hooks/Toast";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";
import { useDrawerStore } from "@/store/drawer.store";
import ProductEntity from "@/types/product.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";

export interface productCategoryType {
  createdAt: string;
  commissionRate: number;
  productCategoryID: string;
  productCategoryName: string;
  products: ProductEntity[];
}

interface addAdminType {
  createProductCategory: {
    payload: productCategoryType;
    message: string;
    success: boolean;
  };
}

export const useAddProductCategory = () => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage } = useTableState("products");
  const { closeModal } = useDrawerStore();

  const [addProductCategory, { loading }] = useMutation<
    addAdminType,
    { input: Type }
  >(ADD_PRODUCT_CATEGORY, {
    refetchQueries: [
      {
        query: FETCH_ALL_PRODUCT_CATEGORY,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortOrder: "DESC",
          },
        },
      },
    ],

    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.createProductCategory;

      if (!result) {
        handleError(new Error("No response received"), "Creating Failed");
        return;
      }

      if (!result.success) {
        handleError(
          "Error",
          result.message || "Creating Product Category Failed"
        );
        return;
      }
      // If success
      handleSuccess("Product Category Creation successful", result.message);
      closeModal();
    },

    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error);
    },
  });

  return { addProductCategory, loading };
};

export const useFetchAllProductCategoryQuery = () => {

  const { pageSize, currentPage, setPageTotal, filters, searchTerm,update } =
    useTableState("products");

  const { endDate, startDate, sortOrder } = filters;

  const pagination = {
        limit: pageSize,
        page: currentPage,
        sortOrder,
        searchTerm,
        ...(endDate && { endDate }),
        ...(startDate && { startDate }),
      }

  // const { data, loading, error, fetchMore, refetch } = useQuery<
  //   categoryResType,
  //   { paginationQuery: PaginationQuery }
  // >(FETCH_ALL_PRODUCT_CATEGORY, {
  //   variables: {
  //     paginationQuery: {
  //       limit: pageSize,
  //       page: currentPage,
  //       sortOrder,
  //       searchTerm,
  //       ...(endDate && { endDate }),
  //       ...(startDate && { startDate }),
  //     },
  //   },
  //   fetchPolicy: "cache-and-network",
  //   nextFetchPolicy: "cache-first",
  // });

  const { data, loading, error, fetchMore,total,message  } = usePaginatedQuery({
    query: FETCH_ALL_PRODUCT_CATEGORY,
    pagination,
    extractData: (data) => {
      return {
        data: data?.AdminFetchAllProductCategoriesWithFilter?.payload?.data,
        total:
          data?.AdminFetchAllProductCategoriesWithFilter?.payload?.total,
        message:
          data?.AdminFetchAllProductCategoriesWithFilter?.message,
      }
    }
  })



  React.useEffect(() => {
    if (
      total != null
    ) {
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

export const useFetchOneProductCategory = ({
  productCategoryID,
  skip,
}: {
  productCategoryID: string;
  skip: boolean;
}) => {
  interface resType {
    fetchOneProductCategory: {
      message: string;
      success: boolean;
      payload: productCategoryType;
    };
  }

  const { data, loading, error, fetchMore } = useQuery<
    resType,
    { productCategoryID: string }
  >(FETCH_ONE_PRODUCT_CATEGORY, {
    variables: { productCategoryID: productCategoryID },
    fetchPolicy: "cache-first",
    nextFetchPolicy: "cache-first",
    skip: skip ?? false,
  });

  



  return {
    data: data?.fetchOneProductCategory.payload,
    loading,
    error,
    fetchMore,
  };
};

export const useUpdateProductCategory = () => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage, filters } = useTableState("products");

  const { closeModal } = useDrawerStore();
  interface updateProductCategory {
    updateProductCategory: {
      message: string;
      success: boolean;
      payload: productCategoryType;
    };
  }

  const [updateProductCategory, { loading }] = useMutation<
    updateProductCategory,
    { productCategoryID: string; input: Type }
  >(UPDATE_PRODUCT_CATEGORY, {
    refetchQueries: [
      {
        query: FETCH_ALL_PRODUCT_CATEGORY,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortOrder: filters?.sortOrder,
          },
        },
      },
    ],
    onCompleted: (data) => {
      console.log(data);
      if (!data?.updateProductCategory?.success) {
        handleError("Error", data?.updateProductCategory?.message);
      }

      handleSuccess(
        "Product Category updated successfully",
        data?.updateProductCategory?.message
      );
      closeModal();
    },
    onError: (error) => {
      handleError("Product Category Update Error", error.message);
    },
  });

  return { mutate: updateProductCategory, updateLoading: loading };
};

export const useDeleteProductCategory = () => {
  interface deleteProductCategory {
    deleteProductCategory: {
      success: boolean;
      message: string;
      payload: boolean;
    };
  }
  const { pageSize, currentPage, filters } = useTableState("products");
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { closeModal } = useDrawerStore();


  const [deleteProductCategory, { loading }] = useMutation<
    deleteProductCategory,
    { productCategoryID: string }
  >(DELETE_PRODUCT_CATEGORY, {
    refetchQueries: [
      {
        query: FETCH_ALL_PRODUCT_CATEGORY,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortOrder: filters.sortOrder,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.deleteProductCategory;

      if (!result) {
        handleError(
          new Error("No response received"),
          "Deleting Product Category Failed"
        );
        return;
      }

      if (!result.success) {
        handleInfo(
          "Delete Admin",
          result.message || "Delete Product Category unsuccessful"
        );
        return;
      }

      handleSuccess("Product Category Deleted Successfully", result.message);
      closeModal();
    },

    onError: (error) => {
      handleError(error, "Deleting Product Category Failed");
    },
  });

  return { deleteProductCategory, loadingDelProductCategory: loading };
};
