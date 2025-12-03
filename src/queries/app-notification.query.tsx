import { APP_NOTIFICATIONS } from "@/api/app-notifications";
import { AppNotificationOutput } from "@/types/app-notification.type";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export const useAppNotificationQuery = () => {
  interface AdminResponseType {
    allNotificationsAdmin: {
      message: string;
      success: boolean;
      payload: {
        count: number;
        totalPages: number;
        unreadCount: number;
        currentPage: number;
        data: AppNotificationOutput[];
      };
    };
  }

  const [items, setItems] = useState<AppNotificationOutput[]>([]);
  const [page, setPage] = useState(1);

  const { data, loading, fetchMore } = useQuery<AdminResponseType>(
    APP_NOTIFICATIONS,
    {
      variables: { paginationQuery: { page: 1, limit: 10 } },
      notifyOnNetworkStatusChange: true,
    }
  );

  // Initial load
  if (data && page === 1 && items.length === 0) {
    setItems(data?.allNotificationsAdmin?.payload?.data);
    setPage(data?.allNotificationsAdmin?.payload?.currentPage);
  }

  const loadMore = async () => {
    if (!data) return;

    const { totalPages } = data?.allNotificationsAdmin?.payload;

    if (page >= totalPages) return;

    const nextPage = page + 1;

    await fetchMore({
      variables: { paginationQuery: { page: nextPage, limit: 10 } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        const newItems = fetchMoreResult.allNotificationsAdmin.payload.data;

        const merged = [
          ...prev.allNotificationsAdmin.payload.data,
          ...newItems,
        ];

        setItems(merged);
        setPage(nextPage);

        return {
          allNotificationsAdmin: {
            ...prev.allNotificationsAdmin,
            payload: {
              ...prev.allNotificationsAdmin.payload,
              currentPage: nextPage,
              data: merged,
            },
          },
        };
      },
    });
  };

  return {
    items,
    loading,
    loadMore,
    unreadCount: data?.allNotificationsAdmin.payload.unreadCount,
    page,
    all: data?.allNotificationsAdmin?.payload?.count,
    totalPages: data?.allNotificationsAdmin.payload.totalPages,
  };
};
