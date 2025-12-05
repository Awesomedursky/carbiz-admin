import { gql } from "@apollo/client";

export const GET_NOTIFICATION_METRICS = gql`
  query getNotificationMetrics($filters: MetricsFilterDto) {
    getNotificationMetrics(filters: $filters) {
      message
      errors
      success
      payload {
        audienceBreakdown {
          audience
          count
          percentage
        }
        methodBreakdown {
          count
          percentage
          method
        }
        totalDelivered
        totalFailed
        totalRecipients
        totalScheduled
        totalSent
        totalSentViaEmail
        totalSentViaPush
      }
    }
  }
`;

export const ALL_NOTIFICATION_CENTER = gql`
  query AdminFetchAllNotificationsWithFilter(
    $paginationQuery: PaginatedNotificationFiltersDto!
  ) {
    AdminFetchAllNotificationsWithFilter(paginationQuery: $paginationQuery) {
      message
      errors
      success
      payload {
        currentPage
        pageSize
        total
        data {
          broadcastDateTime
          createdAt
          deliveryMethod
          id
          makeBroadcastRecurringType
          notificationAudience
          notificationID
          notificationMessage
          notificationTitle
          updatedAt
        }
      }
    }
  }
`;

export const CREATE_NOTIFICATION = gql`
  mutation AdminCreateNotificationCenter($input: CreateNotificationCenterDto!) {
    AdminCreateNotificationCenter(input: $input) {
      errors
      message
      success
      payload {
        broadcastDateTime
        createdAt
        deliveryMethod
        id
        makeBroadcastRecurringType
        notificationAudience
        notificationID
        notificationMessage
        notificationTitle
        updatedAt
      }
    }
  }
`;

export const UPDATE_NOTIFICATION_CENTER = gql`
  mutation AdminUpdateNotificationCenter(
    $input: UpdateNotificationCenterDto!
    $notificationID: String!
  ) {
    AdminUpdateNotificationCenter(
      notificationID: $notificationID
      input: $input
    ) {
      errors
      message
      success
      payload {
        broadcastDateTime
        createdAt
        deliveryMethod
        id
        makeBroadcastRecurringType
        notificationAudience
        notificationID
        notificationMessage
        notificationTitle
        updatedAt
      }
    }
  }
`;

export const DELETE_NOTIFICATION_CENTER = gql`
  mutation deleteNotificationCenter($notificationID: String!) {
    deleteNotificationCenter(notificationID: $notificationID) {
      errors
      messsage
      payload
      success
    }
  }
`;

export const FETCH_ONE_NOTIFICATION_CENTER = gql`
  mutation fetchOneNotificationCenter($notificationID: String!) {
    fetchOneNotificationCenter(notificationID: $notificationID) {
      errors
      messsage
      payload {
        broadcastDateTime
        createdAt
        deliveryMethod
        id
        makeBroadcastRecurringType
        notificationAudience
        notificationID
        notificationMessage
        notificationTitle
        updatedAt
      }
    }
  }
`;
