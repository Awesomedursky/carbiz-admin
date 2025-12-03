import { gql } from "@apollo/client";

export const APP_NOTIFICATIONS = gql`
  query allNotificationsAdmin(
    $paginationQuery: PaginationParamsForNotification!
  ) {
    allNotificationsAdmin(paginationQuery: $paginationQuery) {
      errors
      success
      message
      payload {
        count
        currentPage
        totalPages
        unreadCount
        data {
          account
          date
          id
          isRead
          message
          notificationID
          readAt
          subject
        }
      }
    }
  }
`;
