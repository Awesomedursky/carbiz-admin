import { useToast } from "@/hooks/Toast";
import { useDrawerStore } from "@/store/drawer.store";
import { PaginationQuery } from "@/types/admin.type";
import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import {
  NotificationCenterOutput,
  NotificationMetricsOutput,
} from "@/types/notification-center.type";
import {
  ALL_NOTIFICATION_CENTER,
  CREATE_NOTIFICATION,
  DELETE_NOTIFICATION_CENTER,
  FETCH_ONE_NOTIFICATION_CENTER,
  GET_NOTIFICATION_METRICS,
  UPDATE_NOTIFICATION_CENTER,
} from "@/api/notification";
import { NotificationSchemaType } from "@/schema/notification.schema";
import { useTableState } from "@/hooks/useTableState";

export const useFetchAllNotificationMetrics = () => {
  interface getNotificationMetricsType {
    getNotificationMetrics: {
      message: string;
      success: boolean;
      payload: NotificationMetricsOutput;
    };
  }

  const { data, loading, error } = useQuery<getNotificationMetricsType>(
    // {
    //   filters: {
    //     audience: string;
    //     deliveryMethod: string;
    //     endDate: Date;
    //     startDate: Date;
    //   };
    // }
    GET_NOTIFICATION_METRICS,
    {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    }
  );

  return {
    data: data?.getNotificationMetrics?.payload,
    loading,
    error,
  };
};

export const useFetchAllNotifications = () => {
  interface AdminFetchAllNotificationsWithFilterType {
    AdminFetchAllNotificationsWithFilter: {
      message: string;
      success: boolean;
      payload: {
        currentPage: number;
        data: NotificationCenterOutput[];
        pageSize: number;
        total: number;
      };
    };
  }

  const { pageSize, currentPage, filters, setPageTotal, searchTerm } =
    useTableState("notifications");

  const {
    sortBy,
    sortOrder,
    method,
    recurringType,
    Audience,
    startDate,
    endDate,
  } = filters;

  const { data, loading, error, fetchMore } = useQuery<
    AdminFetchAllNotificationsWithFilterType,
    { paginationQuery: PaginationQuery }
  >(ALL_NOTIFICATION_CENTER, {
    variables: {
      paginationQuery: {
        limit: pageSize,
        page: currentPage,
        sortBy,
        sortOrder,
        searchTerm,
        ...(method && { method }),
        ...(recurringType && { recurringType }),
        ...(Audience && { sentby: Audience }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      },
    },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  React.useEffect(() => {
    if (data?.AdminFetchAllNotificationsWithFilter?.payload?.total != null) {
      const total = data?.AdminFetchAllNotificationsWithFilter.payload.total;
      setPageTotal(total);
    }
  }, [data?.AdminFetchAllNotificationsWithFilter.payload.total]);

  return {
    data: data?.AdminFetchAllNotificationsWithFilter?.payload?.data,
    message: data?.AdminFetchAllNotificationsWithFilter?.message,
    loading,
    error,
    fetchMore,
  };
};

export const useCreateNotificationCenter = () => {
  interface AdminCreateNotificationCenterType {
    AdminCreateNotificationCenter: {
      errors: string;
      message: string;
      success: boolean;
      payload: NotificationCenterOutput;
    };
  }
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage } = useTableState("notifications");
  const { closeModal } = useDrawerStore();

  const [createComplaint, { loading }] = useMutation<
    AdminCreateNotificationCenterType,
    { input: NotificationSchemaType }
  >(CREATE_NOTIFICATION, {
    refetchQueries: [
      {
        query: ALL_NOTIFICATION_CENTER,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy: "createdAt",
            sortOrder: "DESC",
          },
        },
      },
    ],
    onCompleted: (data) => {
      if (data?.AdminCreateNotificationCenter?.success) {
        handleSuccess(data?.AdminCreateNotificationCenter?.message);
        closeModal();
        return;
      }
      if (!data?.AdminCreateNotificationCenter?.success) {
        handleError("Error!", data?.AdminCreateNotificationCenter?.message);
      }
    },
    onError: (error) => {
      handleError("Error!", error.message);
    },
  });

  return {
    createComplaint,
    loading,
  };
};

export const useupdateNotificationCenter = () => {
  interface AdminUpdateNotificationCenterType {
    AdminUpdateNotificationCenter: {
      message: string;
      success: boolean;
      payload: NotificationCenterOutput;
    };
  }
  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage } = useTableState("notifications");
  const { closeModal } = useDrawerStore();

  const [updateNotification, { loading }] = useMutation<
    AdminUpdateNotificationCenterType,
    { notificationID: string; input: any }
  >(UPDATE_NOTIFICATION_CENTER, {
    refetchQueries: [
      {
        query: ALL_NOTIFICATION_CENTER,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy: "createdAt",
            sortOrder: "DESC",
          },
        },
      },
    ],
    onCompleted: (data) => {
      handleSuccess(data?.AdminUpdateNotificationCenter?.message);
      closeModal();
    },
    onError: (error) => {
      handleError("Error!", error.message);
    },
  });

  return {
    updateNotification,
    updateLoading: loading,
  };
};

export const useDeleteoneNotificationCenter = () => {
  interface deleteNotificationCenterType {
    deleteNotificationCenter: {
      message: string;
      success: boolean;
      payload: any;
    };
  }

  const { handleError, handleSuccess } = useToast();
  const { pageSize, currentPage } = useTableState("notifications");
  const { closeModal } = useDrawerStore();

  const [deleteNotification, { loading }] = useMutation<
    deleteNotificationCenterType,
    { notificationID: string }
  >(DELETE_NOTIFICATION_CENTER, {
    refetchQueries: [
      { query: GET_NOTIFICATION_METRICS },
      {
        query: ALL_NOTIFICATION_CENTER,
        variables: {
          paginationQuery: {
            limit: pageSize,
            page: currentPage,
            sortBy: "createdAt",
            sortOrder: "DESC",
          },
        },
      },
    ],
    onCompleted: (data) => {
      handleSuccess(data?.deleteNotificationCenter?.message);
      closeModal();
    },
    onError: (error) => {
      handleError("Error!", error.message);
    },
  });

  return {
    deleteNotification,
    deleteNotificationLoading: loading,
  };
};

export const useFetchOneNotification = (id: string, type: boolean) => {
  interface fetchOneNotificationType {
    fetchOneNotificationCenter: {
      message: string;
      success: boolean;
      payload: NotificationCenterOutput;
    };
  }

  const { data, loading, error } = useQuery<fetchOneNotificationType>(
    FETCH_ONE_NOTIFICATION_CENTER,
    {
      variables: { notificationID: id },
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      skip: type ?? false,
    }
  );

  return {
    data: data?.fetchOneNotificationCenter?.payload,
    loading,
    error,
  };
};
