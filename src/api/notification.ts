import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query AdminFetchAllNotifications($params: PaginationQueryInput!) {
    AdminFetchAllNotifications(params: $params) {
      message
      success
      payload {
        currentPage
        pageSize
        total
        data {
          id
          title
          message
          type
          createdAt
          isRead
        }
      }
    }
  }
`;
