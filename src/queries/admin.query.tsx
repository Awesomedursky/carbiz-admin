import {
  ADD_ADMIN,
  DELETE_ADMIN,
  FETCH_ALL_ADMINS,
  FETCH_ONE_ADMIN,
  UPDATE_ADMIN,
} from "@/api/admin.profile";
import { useToast } from "@/hooks/Toast";
import { useTableState } from "@/hooks/useTableState";
import { useAuthStore } from "@/store/auth.store";
import { useDrawerStore } from "@/store/drawer.store";
import { adminEntity, PaginationQuery } from "@/types/admin.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";

interface addAdminInput {
  name: string;
  email: string;
  phoneNumber: string;
}

interface addAdminType {
  createOtherAdmin: {
    payload: any;
    message: string;
    success: boolean;
  };
}

export const useAddAdmin = () => {
  const { handleError, handleSuccess } = useToast();
  const { setGeneratedPassword } = useAuthStore();
  const { pageSize, currentPage, filters } = useTableState("admin");

  const [addAdmin, { loading }] = useMutation<
    addAdminType,
    { input: addAdminInput }
  >(ADD_ADMIN, {
    refetchQueries: [
      {
        query: FETCH_ALL_ADMINS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy: filters.sortBy,
            sortOrder: filters.sortOrder,
          },
        },
      },
    ],

    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.createOtherAdmin;

      if (!result) {
        handleError(new Error("No response received"), "Adding Failed");
        return;
      }

      if (!result.success) {
        handleError("Error", result.message || "Admin Failed");
        return;
      }

      // If success
      handleSuccess("Admin Creation successful", result.message);
      setGeneratedPassword(result?.payload?.passwordGenerated);
    },

    onError: (error) => {
      // Handles GraphQL errors or network issues
      handleError(error, "Adding Failed");
    },
  });

  return { addAdmin, loading };
};

export const useAdminQuery = () => {
  interface adminResponseType {
    AdminFetchAllAdminsWithFilter: {
      message: string;
      success: boolean;
      payload: {
        currentPage: number;
        data: adminEntity;
        pageSize: number;
        total: number;
      };
    };
  }
  const { currentPage, pageSize, filters, update, searchTerm, setPageTotal } =
    useTableState("admin");
  const { adminAccess, startDate, endDate, sortBy, sortOrder } = filters;

  const { data, loading, error, fetchMore, refetch } = useQuery<
    adminResponseType,
    { paginationQuery: PaginationQuery }
  >(FETCH_ALL_ADMINS, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        sortBy,
        sortOrder,
        searchTerm,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(adminAccess && { adminAccess }),
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    if (data?.AdminFetchAllAdminsWithFilter?.payload?.total != null) {
      const total = data.AdminFetchAllAdminsWithFilter.payload.total;
      setPageTotal(total);
    }
  }, [data?.AdminFetchAllAdminsWithFilter?.payload.total, update]);

  React.useEffect(() => {
    refetch();
  }, [currentPage, pageSize, searchTerm, startDate, endDate, adminAccess]);

  return {
    data: data?.AdminFetchAllAdminsWithFilter?.payload.data,
    message: data?.AdminFetchAllAdminsWithFilter?.message,
    loading,
    error,
    fetchMore,
  };
};

export const useFetchOneAdmin = (adminID: string, skip?: boolean) => {
  interface adminResponseType {
    AdminFetchOneOtherAdmin: {
      message: string;
      success: boolean;
      payload: adminEntity;
    };
  }

  const { data, loading, error, fetchMore } = useQuery<
    adminResponseType,
    { adminID: string }
  >(FETCH_ONE_ADMIN, {
    variables: { adminID },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: skip ?? false,
  });

  return {
    data: data?.AdminFetchOneOtherAdmin.payload,
    loading,
    error,
    fetchMore,
  };
};

export const useUpdateAdmin = () => {
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage, filters } = useTableState("admin");
  const { sortBy, sortOrder } = filters;
  const { closeModal } = useDrawerStore();
  interface updateOtherAdmin {
    updateOtherAdmin: {
      message: string;
      success: boolean;
      payload: adminEntity;
    };
  }

  type updateAdminInput = {
    name: string;
    phoneNumber: string;
    email: string;
  };

  const [updateAdmin, { loading }] = useMutation<
    updateOtherAdmin,
    { adminID: string; input: updateAdminInput }
  >(UPDATE_ADMIN, {
    refetchQueries: [
      {
        query: FETCH_ALL_ADMINS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy,
            sortOrder,
          },
        },
      },
    ],
    onCompleted: (data) => {
      console.log(data);
      if (!data?.updateOtherAdmin?.success) {
        handleError("Error", data?.updateOtherAdmin?.message);
      }

      handleSuccess(
        "Admin updated successfully",
        data?.updateOtherAdmin?.message
      );
      closeModal();
    },
    onError: (error) => {
      handleError("Admin Update Error", error.message);
    },
  });

  return { mutate: updateAdmin, updateLoading: loading };
};

export const useDeleteAdmin = () => {
  interface AdminDeleteOtherAdmin {
    AdminDeleteOtherAdmin: {
      success: boolean;
      message: string;
      payload: boolean;
    };
  }
  const { pageSize, currentPage, filters } = useTableState("admin");
  const { sortBy, sortOrder } = filters;
  const { handleError, handleInfo, handleSuccess } = useToast();
  const { closeModal } = useDrawerStore();
  const [deleteAdmin, { loading }] = useMutation<
    AdminDeleteOtherAdmin,
    { adminID: string }
  >(DELETE_ADMIN, {
    refetchQueries: [
      {
        query: FETCH_ALL_ADMINS,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy,
            sortOrder,
          },
        },
      },
    ],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      const result = data?.AdminDeleteOtherAdmin;

      if (!result) {
        handleError(new Error("No response received"), "Delete Admin Failed");
        return;
      }

      if (!result.success) {
        handleInfo(
          "Delete Admin",
          result.message || "Delete Admin unsuccessful"
        );
        return;
      }

      handleSuccess("Admin Deleted Successfully", result.message);
      closeModal();
    },

    onError: (error) => {
      handleError(error, "Deleting Admin Failed");
    },
  });

  return { deleteAdmin, loading };
};
